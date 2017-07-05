import React from 'react'
import { connect } from 'react-redux'
import { selectYear } from "../actions/actions.js"
import MultiSelect from "../components/MultiSelect.js"

function mapStateToProps(state) {
	return {year: state.year}
}

function mapDispatchToProps(dispatch){
	return {handleChange: (year) => dispatch(selectYear(year))}
}

function YearPicker(props) {
	let years =  Array.from(new Set(props.data.map((e) => e.År))).sort()

	return(
		<MultiSelect 
			names={years} 
			value={props.year} 
			onChange={props.handleChange} 
		/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(YearPicker)
