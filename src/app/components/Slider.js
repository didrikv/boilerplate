import React from 'react'
import styles from "./Slider.css"


export default function Slider(props) {
	if(!props.values) {
		var values = props.names
	} else {
		var values = props.values
	}
	console.log(styles)
	let options = props.names.map( (e, i) => 
		<div>
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

	function onChange(event) {
		var value = event.target.value
		if(!isNaN(value)) {
			value = +value
		}
		props.onChange(value)
	}

	return (
		<div className={styles.container}>
			{options}
		</div>
	)
}
