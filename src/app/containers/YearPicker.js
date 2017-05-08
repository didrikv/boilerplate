import React from 'react'
import { connect } from 'react-redux'

import { selectYear } from "../actions/actions.js"
import Picker from "../components/Picker.js"

function mapStateToProps(state) {
	return {year: state.year}
}

function mapDispatchToProps(dispatch){
	return {handleChange: (year) => dispatch(selectYear(year))}
}

function YearPicker(props) {
	let years =  Array.from(new Set(props.data.map((e) => e.År))).sort()
	console.log(years)
	return(
		<Picker names={years} value={props.year} handleChange={props.handleChange} />
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(YearPicker)
