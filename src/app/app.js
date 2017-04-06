import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"
import { connect } from 'react-redux'
import { csvParse } from 'd3'

import store from "./store.js"
import selectArea from "./actions/actions.js"
import csvString from "./data/Bostedsattraktivitet.js"

import NorwayMap from "./containers/NorwayMap.js"
import NorgeFylkeMap from "./containers/NorgeFylkeMap.js"
import NorgeKommuneMap from "./containers/NorgeKommuneMap.js"
import Chart from "./components/Chart.js"
import BoAtrakkChart from "./containers/BoAttrakkChart.js"

var data = csvParse(csvString, (d) => ({
	Nr: d.Nr,
	Sted: d.Sted,
	Inndeling: d.Inndeling,
	Aar: d.Aar,
	Nettoinnflytting: +d.Nettoinnflytting,
	"Strukturelle flyttefaktorer": +d["Strukturelle flyttefaktorer"],
	Egenvekst: +d.Egenvekst,
	Bostedsattraktivitet: +d.Bostedsattraktivitet
}))
var fylkeArray = data.filter((e) => e.Aar == 2015 && e.Inndeling == "Fylke")
var fylkeObject = {}
fylkeArray.forEach((e) => {fylkeObject[e.Nr] = e.Bostedsattraktivitet})
console.log(fylkeObject)
var kommuneArray = data.filter((e) => e.Aar == 2015 && e.Inndeling == "Kommune")
var kommuneObject = {}
kommuneArray.forEach((e) => {kommuneObject[e.Nr] = e.Bostedsattraktivitet})




const app = document.getElementById("app")

function Container(props){
	return(
	<div>
		<NorgeFylkeMap type="simple" object="fylke" data={fylkeObject}/>
		<NorgeKommuneMap type="original" data={kommuneObject}/>
		<BoAtrakkChart data={data}/>
	</div>
	)
}


ReactDom.render(
	<Provider store={store}>
	<Container/>
	</Provider>
,app)



