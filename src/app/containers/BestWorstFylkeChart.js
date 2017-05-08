import React from 'react'
import { connect } from 'react-redux'

import TopBottomHorizontalChart from "../components/TopBottomHorizontalChart.js"

function mapStateToProps(state) {
	return {selected: state.fylke, year:state.year ,domain:state.domain}
}

export default connect(mapStateToProps)(BestWorstFylkeChart)

function BestWorstFylkeChart(props) {
	let data = props.data
	if(props.selected){
		data = data.filter((e) => e.Fnr == props.selected && e.År == props.year)
	}
	else{
		data = data.filter((e) => e.Inndeling == "Kommune" && e.År == props.year)
	}
	
	if(props.domain == "Bosted") {
		var stack = ["Bostedsattraktivitet", "Egenvekst", "Strukturelle flyttefaktorer"]
		var sortby = "Bostedsattraktivitet"
	} else {
		var stack = ["Næringsattraktivitet", "Nasjonalt Bidrag", "Strukturelle Arbeidsfaktorer"]
		var sortby = "Næringsattraktivitet"
	}


	return (
		<TopBottomHorizontalChart data={data} n={5} x="Navn" stack={stack} sortby={sortby}/>
	)
	

}
