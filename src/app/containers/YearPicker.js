import React from 'react'
import { connect } from 'react-redux'
import { selectYear } from "../actions/actions.js"
import MultiSelect from "../components/MultiSelect.js"

function mapStateToProps(state) {
	return {year: state.year}
}

function mapDispatchToProps(dispatch){
	return {handleChange: (year) => {
		return dispatch(selectYear(year))}
	}
}

function YearPicker(props) {

	return(
		<MultiSelect 
			names={props.years} 
			value={props.year} 
			onChange={props.handleChange} 
		/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(YearPicker)
