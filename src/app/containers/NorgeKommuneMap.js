import React from 'react'
import {connect} from 'react-redux'

import NorwayMap from "./NorwayMap.js"
import {selectKommune} from "../actions/actions.js"

function mapStateToProps(state) {
	return {fylke: state.fylke, selectedID:state.kommune, year:state.year, domain:state.domain}
}
function mapDispatchToProps(dispatch) {
	return {onClick:(Nr) => dispatch(selectKommune(Nr))}
}

function NorgeKommuneMap(props) {
	let data = props.data.filter( (e) => e.Inndeling == "Kommune" && e.År == props.year)
	let dataobj = {}
	for(let i=0; i<data.length; i++) {
		if(props.domain == "Bosted") {
			var value = data[i].Bostedsattraktivitet
		} else {
			var value = data[i].Næringsattraktivitet
		}
		dataobj[data[i].Nr] = value
	}
	if(props.fylke) {
		return <NorwayMap {...props} fylke={props.fylke} data={dataobj} />
	}
	else {return null}
}

export default connect(mapStateToProps, mapDispatchToProps)(NorgeKommuneMap)
