import React from 'react'
import { connect } from 'react-redux'
import { selectInndeling } from "../actions/actions.js"
import RadioPicker from "../components/RadioPicker.js"

function mapStateToProps(state) {
	return {inndeling: state.inndeling}
}

function mapDispatchToProps(dispatch){
	return {handleChange: (inndeling) => dispatch(selectInndeling(inndeling))}
}

function InndelingPicker(props) {
	let inndelinger =  ["Kommuner", "Regioner", "Fylker"]
	let values = ["kommune", "region", "fylke"]

	return(
		<RadioPicker 
			names={inndelinger} 
			values={values}
			value={props.inndeling} 
			handleChange={props.handleChange} 
		/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(InndelingPicker)
