import React from 'react'
import {Radio} from 'react-bootstrap'
import styles from "./RadioPicker.css"

export default function RadioPicker(props){
	if(!props.values) {
		var values = props.names
	} else {
		var values = props.values
	}

	let options = props.names.map( (e, i) => 
		<div 
			className={styles.element}
			key={values[i]}
		>
		<input 
			type="radio" 
			value={values[i]} 
			key={values[i]} 
			id={values[i]}
			checked={props.value == values[i]}
			onChange={onChange}
		/> 
		<label 
			htmlFor={values[i]} 
		> {e} </label>
		</div>
	)
	let options2 = props.names.map( (e, i) => 
		<Radio 
			name={e} 
			value={values[i]} 
			key={values[i]} 
			checked={props.value == values[i]}
			onChange={onChange}
			inline={true}
			style={{transform:"rotate(90deg)", margin:"0px 0px 0px 0px", padding:"35px 0px 0px 0px"}}
		> {e} </Radio>

	)

	function onChange(event) {
		var value = event.target.value
		if(!isNaN(value)) {
			value = +value
		}
		props.handleChange(value)
	}

	return (
		<div className={styles.container}>
			{options}
		</div>
	)
}
