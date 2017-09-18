import React from 'react'
import {FormControl} from 'react-bootstrap'
import Select from 'react-select'
import '../../node_modules/react-select/dist/react-select.css'
import styles from './Picker.css'


export default function Picker({sections, handleChange, chosen, title, justify, width}){

	let options = []
	sections.forEach( (e) => {
		options.push({
			label: String(e.name + ':'),
			value: e.name,
			disabled: true,
			className: styles.section
		})
		e.subnames.forEach( (v) => {
			options.push({
				label: String(v),
				value: v,
				className: styles.variable
			})
		})
	})


	function onChange(option) {
		handleChange(option.value)
	}

	if(width) {
		var style={width: width}
	} else {
		var style={flex: 1}
	}

	return (
		<div style={{justifyContent: justify}} className={styles.container} >
			<div className={styles.title}>
				{title}&emsp;
			</div>

			<div style={style}>
			<Select 
				value={chosen}
				options={options}
				onChange={onChange}
				clearable={false}
				className={styles.outer}
			/>
			</div>
		</div>
	)
}
