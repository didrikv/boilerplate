import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"
import { connect } from 'react-redux'
import { csvParse } from 'd3'
import { Grid, Row, Col, Jumbotron, PageHeader} from 'react-bootstrap'

import store from "./store.js"
import selectArea from "./actions/actions.js"
import csvString from "./data/WebInput v2.1 6dec.js"

import StaticNorwayMap from "./containers/StaticNorwayMap.js"
import BestWorstChart from "./containers/BestWorstChart.js"
import YearPicker from "./containers/YearPicker.js"
import DomainPicker from "./containers/DomainPicker.js"
import InndelingPicker from "./containers/InndelingPicker.js"
import HorizontalBarChart from "./components/HorizontalBarChart.js"

var data = csvParse(csvString, (d) => (
	createParseObject(csvString, d)
))

function createParseObject(csvString, d) {
	let lines = csvString.split("\n")
	let names = lines[0].split(",")
	let values = lines[1].split(",") 
	let obj = {}

	for(let i=0; i<names.length; i++) {
		if(isNaN(values[i])) {
			obj[names[i]] = d[names[i]] 
		} else {
			obj[names[i]] = +d[names[i]]
		}
	}
	return obj
}

data = createAuxVars(data)

function createAuxVars(data) {
	let result = data.map( (e) => ({
		...e,
		"Egenvekst": e["Egenvekst Attraktivitet"] + e["Egenvekst Struktur"] + e["Egenvekst Offentlig"],
		"Arbeidsplasseffekt": e["Egenvekst Attraktivitet"] + e["Egenvekst Struktur"] + e["Egenvekst Offentlig"] + e["Nabovekst"],
		"Bostedsstruktur": e["Størrelse"] + e["Arbeidsmarkedintegrasjon"] + e["Intern Arbeidsmarkedintegrasjon"],
		"Næringsstruktur": e["Befolkningseffekt"] + e["Bransjeeffekt"],
		"Samlet struktur": e["Størrelse"] + e["Arbeidsmarkedintegrasjon"] + e["Intern Arbeidsmarkedintegrasjon"] +
			e["Egenvekst Struktur"] + e["Egenvekst Offentlig"] + e["Nabovekst"],
		"Samlet Attraktivitet": e["Bostedsattraktivitet"] + e["Egenvekst Attraktivitet"]
	}))
	return(result)
}
	

const app = document.getElementById("app")

function Container(props){
	return(
	<Grid>

		<Row>
		<PageHeader style={{textAlign: "center", padding:"0px"}}>
			 Attraktivitetsanalyser  
			<small style={{textAlign: "right", fontSize:"12px"}}> Telemarksforskning </small>
		</PageHeader>
		</Row>

		<Row>
			<Col sm={12} > <YearPicker data={data}/> </Col>
		</Row>

		<Row>
			<Col sm={6} > <InndelingPicker/> </Col>
			<Col sm={6} > <DomainPicker/> </Col>
		</Row>

		<Row>
			<Col sm={6} > <StaticNorwayMap onClick={null} data={data}/> </Col>
			<Col sm={6} > <BestWorstChart view="top" n={10} data={data}/> </Col>
		</Row>


	</Grid>
	)
}

ReactDom.render(
	<Provider store={store}>
	<Container/>
	</Provider>
,app)



