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

function rankArray(arr) {
	let sort = arr.slice().sort(sortInt).reverse()
	return arr.map( (e) => sort.indexOf(e) + 1 )
}

function createDataObjectRank(data, years) {
	years = Array.isArray(years) ? years : [years]
	if(years.length == 1) {
		var variables = data[years[0]]
	} else {
		let count = years.length
		let n = data[years[0]].length
		var variables = Array(n)
		for(let i=0; i<n; i++) {
			let nvar = data.vars.length
			variables[i] = []
			for(let el=0; el<nvar; el++) {
				if(['Inndeling', 'Nr', 'Navn', 'Fylke', 'Region', 'År'].includes(data.vars[el])) {
					variables[i][el] = data[years[0]][i][el]
				} else {
					let input = 0
					for(let year of years) {
						input += data[year][i][el]
					}
					variables[i][el] = +(input/count).toFixed(2)
				}
			}
		}
		
		let rankVars = data.vars.filter( (e) => e.substr(e.length - 4) == 'Rank')
		let rankIs = rankVars.map( (e) => data.vars.indexOf(e) )
		let origName = rankVars.map( (e) => e.substr(0, e.length - 5) )
		let origIs = origName.map( (e) => data.vars.indexOf(e) )
		let inndelingI = data.vars.indexOf('Inndeling')
		let inndeling = ['Land', 'Fylke', 'Kommune', 'Region']

		let newvars = []
		inndeling.forEach( (inn) => {
			let tmp = variables.filter( (e) => e[inndelingI] == inn)
			origIs.forEach( (e, i) => {
				let arr = tmp.map( (row) => row[e] )
				let rank = rankArray(arr)
				tmp = tmp.map( (e, j) => {
					e[rankIs[i]] = rank[j]
					return e
				})
			})
			newvars = newvars.concat(tmp)
		})

		variables = newvars
	}

	let dataobj = variables.map( (e) => {
		let obs = {}
		for(let i in data.vars) {
			obs[data.vars[i]] = e[i]
		}
		obs['År'] = years
		return(obs)
	})
	return dataobj
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

let dataStore = {years, vars, data, allDataObject, createDataObject, createDataObjectRank}
export default dataStore

