import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"
import NorwayMap from "./containers/NorwayMap.js"
import data from "./data/nodata.json"
import selectArea from "./actions/actions.js"
import { connect } from 'react-redux'
//import Chart from "./components/Chart.js"

import store from "./store.js"




const app = document.getElementById("app")
function mapStateToProps(state){
	return {selected: state.selected}
}

function Container(props){
	function renderSub(selected) {
		console.log(selected)
		if(selected) {
			return <NorwayMap type="original" object="kommune" data={data} fylke={selected} />
		}
	} 
	return(
	<div>
		<NorwayMap type="simple" object="fylke" data={data} />
		{renderSub(props.selected)}
	</div>
	)
}

const Container2 = connect(mapStateToProps)(Container)

ReactDom.render(
	<Provider store = {store}>
	<Container2 />
	</Provider>
,app)



