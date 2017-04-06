import React from 'react'
import { connect } from 'react-redux'
import { selectFylke } from "../actions/actions.js"

import NorwayMap from "./NorwayMap.js"

function mapDispatchToProps(dispatch) {
	return {onClick: (Navn) => dispatch(selectFylke(Navn))}
}

function NorgeFylkeMap(props) {
	return <NorwayMap {...props} />
}

export default connect(null,mapDispatchToProps)(NorgeFylkeMap)
	

