import React from 'react'
import {FormControl} from 'react-bootstrap'
import Select from 'react-select'
import '../../node_modules/react-select/dist/react-select.css'
import styles from './Picker.css'


export default function Picker({names, values, handleChange, chosen, boldFirst, title, justify, width}){
	values = values ? values : names

	let options = names.map( (e, i) => {
		if( boldFirst && i == 0 ) {
			var cName = styles.bold
		} else {
			var cName = undefined
		}
		return(
		{
			label: String(names[i]),
			value: values[i],
			className: cName
		}
		)
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
				{title}&ensp;
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
