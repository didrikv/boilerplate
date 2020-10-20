import dataSet from './data/data.json'
import {createAuxVars, createDataObject} from '../components/DataUtils/dataUtils.js'
import variables from './data/variables.json'
import categories from './data/categories.json'

let data = dataSet
let years = Object.keys(data).filter( (e) => e != 'vars' ).map((e) => +e )
let vars = data.vars

function sortInt(a, b) {
	if(a === '') {return -1}
	if(b === '') {return 1}
	return a-b
}

function createRank(i, data, reverse) {
	let orig = data.map( (e) => e[i] )
	let sort = orig.slice().sort(sortInt).reverse()
	if(reverse) {sort.reverse()}
	let rank = orig.map( (e) => sort.indexOf(e) + 1)

	let variable = variables.find( (e) => e.id == vars[i])
	let category = categories.find( (e) => e.title == variable.category)

	let totalWeight = 0
	category.variables.forEach( (catVar) => {
		totalWeight += variables.find( (e) => e.id == catVar).weight
	})

	let maxRank = Math.max( ...rank, 1)	
	let score = rank.map( (e) => (maxRank - e)*100*variable.weight/maxRank/totalWeight)

	data.forEach( (e, j) => {
		e.push(rank[j])
		e.push(score[j])
	})
}

function createJustRank(i, data, reverse) {
	let orig = data.map( (e) => e[i] )
	let sort = orig.slice().sort(sortInt).reverse()
	if(reverse) {sort.reverse()}
	let rank = orig.map( (e) => sort.indexOf(e) + 1 )

	let max = Math.max(...orig)
	let newOrig = orig.map( (e) => e*100/max )

	data.forEach( (e, j) => {
		e.push(rank[j])
		e.push(newOrig[j])
	})
}

let inndeling = ['Land', 'Fylke', 'Kommune', 'Region']
let inndelingI = vars.indexOf('Inndeling')
let varsI = variables.map( (e) => vars.indexOf(e.id) ) 

let newdata = {}
let newvars = vars
years.forEach( (year) => {
	newdata[year] = []
	inndeling.forEach( (inndeling) => {
		let section = data[year].filter( (e) => e[inndelingI] == inndeling )
		varsI.forEach( (e, i) => {
			createRank(e, section, variables[i].reverse) 
		})
		newdata[year] = newdata[year].concat(section)
	})
})

variables.forEach( (e) => {
	newvars.push(e.id + ' Rank')
	newvars.push(e.id + ' Score')
})


years.forEach( (year) => {
	newdata[year].forEach( (array) => {
		let indeks = 0
		categories.forEach( (cat) => {
			let vars = cat.variables
			let catScore = 0
			vars.forEach( (variable) => {
				catScore += array[newvars.indexOf(variable + ' Score')]
			})
			if(cat.title == 'DKS') {var tmp = 0.25*catScore}
			else if(cat.title == 'Kulturskole') {var tmp = 0.75*catScore}
			else {var tmp = catScore}
			array.push(tmp)
			indeks += tmp
		})
		array.push(indeks)
	})
})


categories.forEach( (e) => {
	newvars.push(e.title)
})
newvars.push('Kulturindeks Score')



let catI = categories.map( (e) => e.title).map( (cat) => newvars.indexOf(cat))
years.forEach( (year) => {
	let newYear = []
	inndeling.forEach( (inndeling) => {
		let section = newdata[year].filter( (e) => e[inndelingI] == inndeling )
		catI.forEach( (cat) => {
			createJustRank(cat, section, false)
		})
		createJustRank(newvars.indexOf('Kulturindeks Score'), section, false)
		newYear = newYear.concat(section)
	})
	newdata[year] = newYear
})

categories.forEach( (e) => {
	newvars.push(e.title + ' Rank')
	newvars.push(e.title + ' Score flex')
})
newvars.push('Kulturindeks')

newdata.vars = newvars
vars = newvars
data = newdata

let allDataObject = []
years.forEach( (year) => {
	allDataObject = allDataObject.concat( createDataObject(data, year))
})

let dataStore = {years, vars, data, allDataObject, createDataObject}

let temp = allDataObject.filter( (e) => e.Inndeling == "Kommune" && e.År == 2016 )

export default dataStore

