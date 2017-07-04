import React from 'react'
import { connect } from 'react-redux'
import { selectDomain } from "../actions/actions.js"
import RadioPicker from "../components/RadioPicker.js"

function mapStateToProps(state){
	return {domain: state.domain}
}

function mapDispatchToProps(dispatch){
	return {handleChange: (domain) => dispatch(selectDomain(domain)) }
}

function DomainPicker(props) {
	let names = ["Samlet attraktivitet", "Bostedsattraktivitet", "Næringsattraktivitet"]
	let value = props.domain

	return(
		<RadioPicker 
			names={names} 
			value={value} 
			handleChange={props.handleChange}
		/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainPicker)
