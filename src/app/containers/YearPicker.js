import React from 'react'
import { connect } from 'react-redux'
import { selectYear } from "../actions/actions.js"
import RadioPicker from "../components/RadioPicker.js"

function mapStateToProps(state) {
	return {year: state.year}
}

function mapDispatchToProps(dispatch){
	return {handleChange: (year) => dispatch(selectYear(year))}
}

function YearPicker(props) {
	let years =  Array.from(new Set(props.data.map((e) => e.År))).sort()

	return(
		<RadioPicker 
			names={years} 
			value={props.year} 
			handleChange={props.handleChange} 
		/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(YearPicker)
