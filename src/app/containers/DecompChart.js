import React from 'react'
import {connect} from 'react-redux'
import StackAndLineChart from "../components/StackAndLineChart.js"

function mapStateToProps(state){
	return {Nr: state.Nr, domain: state.domain}
}

function DecompChart(props) {
	let data = props.data

	
	
	function createDataObject(data) {
		let years = Object.keys(data).filter( (e) => e != "vars" )
		let result = new Array(years.length)
		let nrIndex = data.vars.indexOf("Nr")

		for(let i in years){
			for(let q in data[years[i]]) {

				if( data[years[i]][q][nrIndex] == props.Nr ) {
					result[i] = data[years[i]][q]
					break
				}
			}
		}
		
		
		let dataobj = result.map( (e) => {
			let obs = {}
			for(let i in data.vars) {
				obs[data.vars[i]] = e[i]
			}
			return(obs)
		})
		return dataobj
	}

	if(props.domain == "Bostedsattraktivitet") {
		var stack = ["Fødselsoverskudd", "Forventet Flytting", "Bostedsattraktivitet"]
		var line = "Befolkningsvekst"
		var colorScale = ["#f0b0d7", "#6BB7F0", "#6DD977"]
	} else if(props.domain == "Samlet attraktivitet") {
		var stack = ["Fødselsoverskudd", "Samlet Forventet Flytting", "Samlet attraktivitet"]
		var line = "Befolkningsvekst"
		var colorScale = ["#f0b0d7", "#6BB7F0", "#FBBB57"]
	} else {
		var stack = ["Nasjonalt Bidrag", "Næringsstruktur", "Næringsattraktivitet"]
		var line = "Arbeidsplassvekst"
		var colorScale = ["#e57e69", "#95d6d6", "#EDEB5D"]
	}
	
	return(
		<StackAndLineChart
			data={createDataObject(data)}
			colorScale={colorScale}
			line={line}
			stack={stack}
			x="År"
			label="Navn"
		/>
	)
}

export default connect(mapStateToProps)(DecompChart)
