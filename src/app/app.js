import React from "react"
import { connect } from "react-redux"

import dataSet from "./data/data.json"
import Layout from "./Layout.js"
import Article from "./containers/Article.js"
import { csvParse } from 'd3'

const data = createAuxVars(dataSet)
let years = Object.keys(data).filter( (e) => e != "vars" )
years = years.map( (e) => +e )

function createAuxVars(data) {
	let newvars = [
		["Egenvekst",["Egenvekst Attraktivitet", "Egenvekst Struktur", "Egenvekst Offentlig"]],
		["Arbeidsplasseffekt", ["Egenvekst Attraktivitet", "Egenvekst Struktur", "Egenvekst Offentlig", "Nabovekst"]],
		["Bostedsstruktur", ["Størrelse", "Arbeidsmarkedintegrasjon", "Intern Arbeidsmarkedintegrasjon"]],
		["Næringsstruktur", ["Befolkningseffekt", "Bransjeeffekt",]],
		["Samlet struktur", ["Størrelse", "Arbeidsmarkedintegrasjon", "Intern Arbeidsmarkedintegrasjon",
			"Egenvekst Struktur", "Egenvekst Offentlig", "Nabovekst"]],
		["Samlet attraktivitet", ["Bostedsattraktivitet", "Egenvekst Attraktivitet"]],
		["Forventet Flytting", ["Bostedsstruktur", "Innvandringsbidrag"]],
		["Samlet Forventet Flytting", ["Samlet struktur", "Innvandringsbidrag"]],
		["Forventet Befolkningsvekst", ["Samlet Forventet Flytting", "Fødselsoverskudd"]]
	]
	for(let newvar of newvars) {
		createVar(data, newvar[0], newvar[1])
	}
	return(data)
}

function createVar(data, variable, sum) {
	let years = Object.keys(data).filter( (e) => e != "vars" ) 
	data.vars.push(variable)
	for(let year of years){
		for(let obs of data[year]){
			let input = 0
			for(let summand of sum){
				input += obs[data.vars.indexOf(summand)]
			}
			obs.push(+input.toFixed(2))
		}
	}
}

function createDataObject(data, years) {
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
				if(["Inndeling", "Nr", "Navn", "Fylke", "Region", "År"].includes(data.vars[el])) {
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
	}
	let dataobj = variables.map( (e) => {
		let obs = {}
		for(let i in data.vars) {
			obs[data.vars[i]] = e[i]
		}
		obs["År"] = years
		return(obs)
	})
	return dataobj
}


function mapStateToProps(state){
	return {year: state.year}
}

function Container(props) {
	let dataobj = createDataObject(data, props.year)
	return <Article data={dataobj} origData={data} years={years}/>
}

Container = connect(mapStateToProps)(Container)

export default function App(props) {
	return(
			<Container/>
	)
}




