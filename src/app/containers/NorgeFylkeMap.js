import React from 'react'
import { connect } from 'react-redux'
import { selectFylke , selectKommune} from "../actions/actions.js"

import NorwayMap from "./NorwayMap.js"

function mapDispatchToProps(dispatch) {
	return {onClick: (Nr) => {dispatch(selectFylke(Nr)); dispatch(selectKommune(0))}}
}

function mapStateToProps(state) {
	return {selectedID: state.fylke}
}

function NorgeFylkeMap(props) {
	return <NorwayMap {...props} />
}

export default connect(mapStateToProps,mapDispatchToProps)(NorgeFylkeMap)
	

