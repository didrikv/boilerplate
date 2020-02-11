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


	data.forEach( (e, j) => {
		e.push(rank[j])
	})

	return rank
}


let inndelinger = ['Land', 'Fylke', 'Kommune', 'Region']
let inndelingI = vars.indexOf('Inndeling')
let varsI = variables.map( (e) => vars.indexOf(e.id) ) 

let newdata = {}
let newvars = vars
let maxValues = {}
years.forEach( (year) => {
	newdata[year] = []
	inndelinger.forEach( (inndeling) => {
		let section = data[year].filter( (e) => e[inndelingI] == inndeling )
		let Carr = []
		categories.forEach( (category) => {
			let Varr = []
			let Cmin = 0
			category.variables.forEach( (variable) => {

				//Creating rank for variable and saving in Varr (and insertion to section)
				let varInfo = variables.find( (e) => e.id == variable)
				let varI = vars.indexOf(variable)
				let rankArr = createRank(varI, section, varInfo.reverse)
				Varr.push( rankArr.map( (e) => e*varInfo.weight) )
				Cmin += varInfo.weight
			})

			//Finding category max and creating score arrays for variable
			let Cmax = Varr.reduce( (sum, array) => sum + Math.max( ...array) , 0)
			let Crange = Cmax - Cmin
			let Vscore = Varr.map( (array) => {
				let Amax = Math.max( ...array)
				return array.map( (e) => (Amax - e)/Crange ) 
			})

			//Inserting score arrays into section
			section.forEach( (e, i) => {
				Vscore.forEach( (array) => e.push(array[i]))
			})

			//Inserting ranking of category sum into section
			let Csum = Varr[0].map( (e, i) => {
				let sum = 0
				Varr.forEach( (array) => sum += array[i] )
				return sum
			})
			let Csort = Csum.slice().sort(sortInt) 
			let Crank = Csum.map( (e) => Csort.indexOf(e) + 1) 
			section.forEach( (e, i) => e.push(Crank[i]) )

			//Creating Score flex functions for categories and inserting it to section
			let fmax = Math.max( ...Crank)	
			let Cflex = Crank.map( (e) => (fmax-e)/(fmax-1)*100)
			section.forEach( (e, i) => e.push(Cflex[i]) )

			//Saving Crank for creating indeks
			if(category.title == "DKS") {
				Carr.push(Crank.map( (e) => e*0.25))
			} else if(category.title == "Kulturskole") {
				Carr.push(Crank.map( (e) => e*0.75))
			} else {
				Carr.push(Crank)
			}
		})
		//Finding index max and creating score for categories
		let Kmax = Carr.reduce( (sum, array) => sum + Math.max( ...array), 0)
		let Krange = Kmax - 10
		let Cscore = Carr.map( (array) => {
			let Cmax = Math.max( ...array)
			return array.map( (e) =>(Cmax - e)/Krange )
		})
		section.forEach( (e, i) => {
			Cscore.forEach( (array) => e.push(array[i]))
		})

		//Creating sum of category ranks and making indeks
		let Ksum = Carr[0].map( (e, i) => {
			let sum = 0
			Carr.forEach( (array) => sum +=array[i] )
			return sum
		})
		let Ksort = Ksum.slice().sort(sortInt)
		let Krank = Ksum.map( (e) => Ksort.indexOf(e) + 1) 
		section.forEach( (e, i) => e.push(Krank[i]))
		//Creating indeks score
		let Kscore = Ksum.map( (e) => (Kmax-e)/(Krange) )
		section.forEach( (e, i) => e.push(Kscore[i]))

		//Inputing section to newdata
		newdata[year] = newdata[year].concat(section)
	})
})

//Inputting new variables names
categories.forEach( (category) => {
	category.variables.forEach( (variable) => {
		newvars.push(variable + ' Rank')
	})
	category.variables.forEach( (variable) => {
		newvars.push(variable + ' Score')
	})
	newvars.push(category.title + ' Rank')
	newvars.push(category.title + ' Score flex')
})
categories.forEach( (category) => {
	newvars.push(category.title)
})
newvars.push('Kulturindeks')
newvars.push('Kulturindeks Score')


//Finalizing
newdata.vars = newvars
vars = newvars
data = newdata

let allDataObject = []
years.forEach( (year) => {
	allDataObject = allDataObject.concat( createDataObject(data, year))
})

let dataStore = {years, vars, data, allDataObject, createDataObject}
export default dataStore

