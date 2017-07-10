import React from 'react'
import styles from "./MultiSelect.css"

export default function MultiSelect(props){
	if(!props.values) {
		var values = props.names
	} else {
		var values = props.values
	}

	function onChange(e) {
		var options = e.target.options;
		var value = [];
		for (var i = 0, l = options.length; i < l; i++) {
			if (options[i].selected) {
				value.push(+options[i].value);
			}
		}
		props.onChange(value)
	}
	console.log("Hei")
	console.log(styles)
	let options = props.names.map( (e, i) =>
		<option value={values[i]} key={values[i]} className={styles.option}> {e} </option>
	)

	return (
		<div className={styles.container}>
		<select className={styles.select} multiple size={1} onChange={onChange} value={props.value}>
			{options}
		</select>
		</div>
	)
}
