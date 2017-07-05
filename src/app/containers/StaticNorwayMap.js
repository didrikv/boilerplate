import React from 'react'
import {connect} from 'react-redux'
import NorwayMap from "./NorwayMap.js"

function mapStateToProps(state) {
	return {domain:state.domain, inndeling:state.inndeling}
}

function NorgeKommuneMap(props) {
	let inndeling = props.inndeling[0].toUpperCase() + props.inndeling.slice(1) 
	let data = props.data.filter( (e) => e.Inndeling == inndeling)
	let dataobj = {}

	for(let i=0; i<data.length; i++) {
		if(props.domain == "Bostedsattraktivitet") {
			var value = data[i].Bostedsattraktivitet
		} else if(props.domain == "Næringsattraktivitet"){
			var value = data[i].Næringsattraktivitet
		}
		else {
			var value = data[i].Bostedsattraktivitet + data[i]["Egenvekst Attraktivitet"]
		}
		dataobj[data[i].Nr] = value
	}

	return(
		<NorwayMap 
			{...props} 
			data={dataobj} 
			object={props.inndeling}
		/>
	)
}

export default connect(mapStateToProps)(NorgeKommuneMap)
