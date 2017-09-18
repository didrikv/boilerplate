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
	let rank = orig.map( (e) => sort.indexOf(e) )
	let weight = variables.find( (e) => e.id == vars[i]).weight
	let category = variables.find( (e) => e.id == vars[i]).category
	let totalWeight = 0
	categories.find( (e) => e.title == category).variables.forEach( (e) => {
		totalWeight += variables.find( (k) => k.id == e).weight
	})
	let max = Math.max( ...rank, 1)	
	let score = rank.map( (e) => (max - e)*100*weight/max/totalWeight)
	rank = rank.map( (e) => e + 1 )

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

	data.forEach( (e, j) => {
		e.push(rank[j])
	})
}

let inndeling = ['Land', 'Fylke', 'Kommune', 'Region']

let newdata = {}
let newvars = vars
years.forEach( (year) => {
	newdata[year] = []
	inndeling.forEach( (inndeling) => {
		let section = data[year].filter( (e) => e[vars.indexOf('Inndeling')] == inndeling )
		let varsI = variables.map( (e) => vars.indexOf(e.id) ) 
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
			array.push(catScore)
			if(cat.title == 'DKS') {
				indeks += 0.25*catScore
			} else if(cat.title == 'Kulturskole') {
				indeks += 0.75*catScore
			} else {
				indeks += catScore
			}
		})
		array.push(indeks)
	})
})

categories.forEach( (e) => {
	newvars.push(e.title)
})
newvars.push('Kulturindeks Score')

years.forEach( (year) => {
	let newYear = []
	inndeling.forEach( (inndeling) => {
		let section = newdata[year].filter( (e) => e[vars.indexOf('Inndeling')] == inndeling )
		let catI = categories.map( (e) => e.title).map( (cat) => newvars.indexOf(cat))
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
})

newvars.push('Kulturindeks')

newdata.vars = newvars

vars = newvars
data = newdata

let dataStore = {years, vars, data, createDataObject}




export default dataStore

