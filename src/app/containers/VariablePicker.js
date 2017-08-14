import React from 'react'
import { connect } from 'react-redux'
import { selectVariable } from "../actions/actions.js"
import RadioPicker from "../components/RadioPicker.js"

function mapStateToProps(state){
	return {variable: state.variable}
}

function mapDispatchToProps(dispatch){
	return {handleChange: (domain) => dispatch(selectVariable(domain)) }
}

function VariablePicker(props) {
	let names = props.names
	let value = props.variable
	let values = props.values ? props.values : props.names

	return(
		<RadioPicker 
			names={names} 
			value={value} 
			values={values}
			handleChange={props.handleChange}
		/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(VariablePicker)
