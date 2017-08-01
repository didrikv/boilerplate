import React from 'react'
import { connect } from 'react-redux'
import ScatterPlot from "../components/ScatterPlot.js"

function mapStateToProps(state) {
	return {
		inndeling: state.inndeling,
		domain: state.domain,			
		year: state.year,
		population: state.population,
		search: state.search,
		Nr: state.Nr
	}
}

function ScatterContainer(props) {
	let inndeling = props.inndeling[0].toUpperCase() + props.inndeling.slice(1) 
	let data = props.data.filter( (e) => e.Inndeling == inndeling )
	
	if(true) {
		data = data.map( (e) => {
			if(e.Nr == props.Nr){
				let zIndex = props.search.includes(e.Nr) ? 1 : 0 
				return {...e, fill: "green", opacity:0.8, zIndex:zIndex, bubbleProperty:1}
			}
			else if(props.search.includes(e.Nr)){
				return {...e, fill: "red", opacity:0.8, zIndex:1, label:e.Navn, bubbleProperty:1}
			}
			return({...e, zIndex:0, bubbleProperty:1})
		})
	}
	data.sort( (a, b) => a.zIndex - b.zIndex )

	if(inndeling == "Kommune") {data = data.filter( (e) => e.Folketall >= props.population)}
	
	if(props.domain == "Bostedsattraktivitet") {
		var x = "Bostedsattraktivitet"
		var y = "Bostedsstruktur"
	} else if(props.domain == "Samlet attraktivitet") {
		var x = "Bostedsattraktivitet"
		var y = "Egenvekst Attraktivitet"
	} else {
		var x = "Næringsattraktivitet"
		var y = "Næringsstruktur"
	}

	return(<ScatterPlot {...props} data={data} x={x} y={y} />)
}

export default connect(mapStateToProps)(ScatterContainer)
