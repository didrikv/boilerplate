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
let inndelingI = vars.indexOf('Inndeling')
let varScoreI = variables.map( (e) => vars.indexOf(e.id + ' Score') ) 

let newdata = {}
let newvars = vars
years.forEach( (year) => {
	newdata[year] = []
	inndeling.forEach( (inndeling) => {
		let section = data[year].filter( (e) => e[inndelingI] == inndeling )
		varScoreI.forEach( (e, i) => {
			createJustRank(e, section, false) 
		})
		newdata[year] = newdata[year].concat(section)
	})
})

variables.forEach( (e) => {
	newvars.push(e.id + ' Rank')
})


let catI = categories.map( (e) => e.title).map( (cat) => newvars.indexOf(cat + ' Indeks'))

years.forEach( (year) => {
	let newYear = []
	inndeling.forEach( (inndeling) => {
		let section = newdata[year].filter( (e) => e[inndelingI] == inndeling )
		catI.forEach( (cat) => {
			createJustRank(cat, section, false)
		})
		createJustRank(newvars.indexOf('Næringsindeks'), section, false)
		newYear = newYear.concat(section)
	})
	newdata[year] = newYear
})

categories.forEach( (e) => {
	newvars.push(e.title + ' Indeks Rank')
})
newvars.push('Næringsindeks Rank')

newdata.vars = newvars
vars = newvars
data = newdata

let allDataObject = []
years.forEach( (year) => {
	allDataObject = allDataObject.concat( createDataObject(data, year))
})

let dataStore = {years, vars, data, allDataObject, createDataObject}
export default dataStore

