import React from 'react'
import { connect } from 'react-redux'
import ScatterPlot from "../components/ScatterPlot.js"

function mapStateToProps(state) {
	return {selected: state.fylke}
}

function ScatterContainer(props) {
	return <ScatterPlot {...props} />
}

export default connect(mapStateToProps)(ScatterContainer)
