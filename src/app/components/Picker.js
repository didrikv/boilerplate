import React from 'react'
import {FormControl} from 'react-bootstrap'

export default function Picker(props){
	if(!props.values) {
		var values = props.names
	} else {
		var values = props.values
	}

	let options = props.names.map( (e, i) => <option value={values[i]} key={values[i]}> {e} </option>)

	function onChange(event) {
		var value = event.target.value
		if(!isNaN(value)) {
			value = +value
		}
		props.handleChange(value)
	}

	return (
		<FormControl 
			componentClass="select" 
			onChange={onChange} 
			value={props.value} 
			style={{display: "block"}} 
		>
			{options}
		</FormControl>
	)
}
