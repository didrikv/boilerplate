import React from 'react'
import { connect } from 'react-redux'

import { selectDomain } from "../actions/actions.js"
import Picker from "../components/Picker.js"

function mapStateToProps(state){
	return {domain: state.domain}
}

function mapDispatchToProps(dispatch){
	return {handleChange: (domain) => dispatch(selectDomain(domain)) }
}

function DomainPicker(props) {
	let names = ["Bosted", "Arbeidsplasser"]
	let value = props.domain

	return(
		<Picker names={names} value={value} handleChange={props.handleChange} />
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainPicker)
	
