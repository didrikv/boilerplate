import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"
import { connect } from 'react-redux'
import { csvParse } from 'd3'

import store from "./store.js"
import selectArea from "./actions/actions.js"
import csvString from "./data/webinput.js"

import NorwayMap from "./containers/NorwayMap.js"
import NorgeFylkeMap from "./containers/NorgeFylkeMap.js"
import NorgeKommuneMap from "./containers/NorgeKommuneMap.js"
import Chart from "./components/Chart.js"
import DecompChart from "./containers/DecompChart.js"
import BestWorstFylkeChart from "./containers/BestWorstFylkeChart.js"
import ScatterContainer from "./containers/ScatterContainer.js"
import YearPicker from "./containers/YearPicker.js"
import DomainPicker from "./containers/DomainPicker.js"
import Test from "./components/test.js"

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

const app = document.getElementById("app")

function Container(props){
	return(
	<div>
		<YearPicker data={data} />	
		<DomainPicker />
		<NorgeFylkeMap type="simple" object="fylke" data={data}/>
		<BestWorstFylkeChart data={data} />
		<NorgeKommuneMap type="simple" data={data}/>
		<DecompChart data={data}/>

	</div>
	)
}


ReactDom.render(
	<Provider store={store}>
	<Container/>
	</Provider>
,app)



