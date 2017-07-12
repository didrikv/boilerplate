import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"
import { connect } from 'react-redux'
import { csvParse } from 'd3'
import { Grid, Row, Col, Jumbotron, PageHeader} from 'react-bootstrap'
import {CSSTransitionGroup} from 'react-transition-group'

import store from "./store.js"
import selectArea from "./actions/actions.js"
import dataSet from "./data/createData.js"
import transitions from "./transitions.css"

import StaticNorwayMap from "./containers/StaticNorwayMap.js"
import BestWorstChart from "./containers/BestWorstChart.js"
import YearPicker from "./containers/YearPicker.js"
import DomainPicker from "./containers/DomainPicker.js"
import InndelingPicker from "./containers/InndelingPicker.js"
import HorizontalBarChart from "./components/HorizontalBarChart.js"
import MultiSelect from "./components/MultiSelect.js"
import PopulationSlider from "./containers/PopulationSlider.js"
import populationTransition from "./populationTrasition.css"
import styles from "./theme.css"


//function createParseObject(csvString, d) {
//	let lines = csvString.split("\n")
//	let names = lines[0].split(",")
//	let values = lines[1].split(",") 
//	let obj = {}
//
//	for(let i=0; i<names.length; i++) {
//		if(isNaN(values[i])) {
//			obj[names[i]] = d[names[i]] 
//		} else {
//			obj[names[i]] = +d[names[i]]
//		}
//	}
//	return obj
//}

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
		["Samlet Attraktivitet", ["Bostedsattraktivitet", "Egenvekst Attraktivitet"]],
		["Forventet Flytting", ["Bostedsstruktur", "Innvandringsbidrag"]],
		["Samlet Forventet Flytting", ["Samlet struktur", "Innvandringsbidrag"]]
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
			obs.push(input)
		}
	}
}

const app = document.getElementById("app")

function mapStateToProps(state) {
	return {year: state.year, inndeling: state.inndeling}
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
				if(el < 4) {
					variables[i][el] = data[years[0]][i][el]
				} else {
					let input = 0
					for(let year of years) {
						input += data[year][i][el]
					}
					variables[i][el] = input/count
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
		



function Container(props){
	let tempdata = createDataObject(data, props.year)
	return(
	<div className={styles.default}>
	<Grid>

		<Row>
		<PageHeader style={{textAlign: "center", padding:"0px"}}>
			 Attraktivitetsanalyser  
			<small style={{textAlign: "right", fontSize:"12px"}}> Telemarksforskning </small>
		</PageHeader>
		</Row>
			<Col sm={12} style={{display:"flex", justifyContent:"center"}}> <YearPicker years={years}/> </Col>

		<Row style={{borderBottom:"1px solid #eee", marginBottom:"30px"}}>
			<Col sm={6} style={{display:"flex", justifyContent:"flex-end"}}> 
				<CSSTransitionGroup
					transitionName={populationTransition}
					transitionAppear={true}
					transitionAppearTimeout={700}
					transitionEnterTimeout={700}
					transitionLeaveTimeout={700}
					component="div"
				>
				{props.inndeling == "kommune" ? <PopulationSlider /> : null}
				</ CSSTransitionGroup>
				<InndelingPicker /> 
			</Col>
			<Col sm={6} style={{display:"flex", justifyContent:"center"}}> <DomainPicker/> </Col>
		</Row>

		<Row>
			<Col sm={6} > <StaticNorwayMap onClick={null} data={tempdata}/> </Col>
			<Col sm={6} style={{display:"flex", alignItems:"flex-start"}}> <BestWorstChart view="top" n={10} data={tempdata}/> </Col>
		</Row>


	</Grid>
	</div>
	)
}

Container = connect(mapStateToProps)(Container)

ReactDom.render(
	<Provider store={store}>
	<Container />
	</Provider>
,app)



