import React from 'react'
import {Radio} from 'react-bootstrap'
import styles from "./MultiSelect2.css"

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
			className={styles.input}
			type="radio" 
			value={values[i]} 
			key={values[i]} 
			id={values[i]}
			checked={props.value == values[i]}
			onChange={onChange}
		/> 
		<label 
			className={styles.label}
			htmlFor={values[i]} 
		> {e} </label>
		</div>
	)
	let options2 = props.names.map( (e, i) => 
		<button 
			name={e} 
			value={values[i]} 
			key={values[i]} 
			onClick={onChange}
			className={props.value == values[i] ? styles.buttonChecked: styles.button}
		>
			{e} 
		</button>

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
			{options2}
		</div>
	)
}
