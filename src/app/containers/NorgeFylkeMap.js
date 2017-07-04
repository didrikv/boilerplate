import React from 'react'
import { connect } from 'react-redux'
import { selectFylke , selectKommune} from "../actions/actions.js"
import NorwayMap from "./NorwayMap.js"

function mapDispatchToProps(dispatch) {
	return {onClick: (Nr) => {dispatch(selectFylke(Nr)); dispatch(selectKommune(0))}}
}

function mapStateToProps(state) {
	return {selectedID: state.fylke, year:state.year, domain:state.domain}
}

function NorgeFylkeMap(props) {
	let data = props.data.filter( (e) => e.Inndeling == "Fylke" && e.År == props.year)
	let dataobj = {}

	for(let i=0; i<data.length; i++) {
		if(props.domain == "Bosted") {
			var value = data[i].Bostedsattraktivitet
		} else {
			var value = data[i].Næringsattraktivitet
		}
		dataobj[data[i].Nr] = value
	}

	return( 
		<NorwayMap 
			{...props} 
			data={dataobj}
		/>	
	)
}

export default connect(mapStateToProps,mapDispatchToProps)(NorgeFylkeMap)
