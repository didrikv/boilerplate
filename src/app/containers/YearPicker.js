import React from 'react'
import { connect } from 'react-redux'
import { selectYear } from "../actions/actions.js"
import MultiSelect from "../components/MultiSelect.js"
import MultiSelect2 from "../components/MultiSelect2.js"
import { years } from "../dataStore.js"

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
		<div>
		<MultiSelect2
			names={years} 
			chosen={props.year} 
			handleChange={props.handleChange} 
		/>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(YearPicker)
