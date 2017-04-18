import React from 'react'
import {connect} from 'react-redux'

import NorwayMap from "./NorwayMap.js"
import {selectKommune} from "../actions/actions.js"

function mapStateToProps(state) {
	return {fylke: state.fylke, selectedID:state.kommune}
}
function mapDispatchToProps(dispatch) {
	return {onClick:(Nr) => dispatch(selectKommune(Nr))}
}

function NorgeKommuneMap(props) {
	if(props.fylke) {
		return <NorwayMap {...props} fylke={props.fylke} />
	}
	else {return null}
}

export default connect(mapStateToProps, mapDispatchToProps)(NorgeKommuneMap)
