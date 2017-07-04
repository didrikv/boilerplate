import React from 'react'
import {connect} from 'react-redux'
import StackAndLineChart from "../components/StackAndLineChart.js"

function mapStateToProps(state){
	return {knr: state.kommune, domain:state.domain, year:state.year}
}

function DecompChart(props) {
	let data = props.data.filter((e) => e.Nr == props.knr)

	if(props.domain == "Bosted") {
		var stack = ["Strukturelle flyttefaktorer", "Egenvekst","Nabovekst", "Bostedsattraktivitet"]
		var line = "Nettoinnflytting"
	} else {
		var stack = ["Nasjonalt Bidrag", "Strukturelle Arbeidsfaktorer", "Næringsattraktivitet"]
		var line = "Arbeidsplassvekst"
	}

	if(props.knr) {
		return(
			<StackAndLineChart
				data={data}
				line={line}
				stack={stack}
				x="År"
				label="Navn"
			/>
		)
	}
	else {return null}
}

export default connect(mapStateToProps)(DecompChart)
