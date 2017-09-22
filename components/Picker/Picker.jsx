import React from 'react'
import {FormControl} from 'react-bootstrap'
import Select from 'react-select'
import '../../node_modules/react-select/dist/react-select.css'
import styles from './Picker.css'


export default function Picker(props){
	let {names, values, handleChange, chosen, 
		boldFirst, title, justify, width, topTitle, sections} = props

	if(sections) {
		var options = []
		sections.forEach( (e) => {
			options.push({
				label: String(e.name + ':'),
				value: e.name + "noChoose",
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
	} else {
		values = values ? values : names
		var options = names.map( (e, i) => ({
			label: String(names[i]),
			value: values[i],
			className: (boldFirst && i == 0) ? styles.bold : undefined
		}))
	}

	let style = width ? {width: width} : {flex: 1}	
	let displayType = topTitle ? undefined : 'flex'

	return (
		<div style={{justifyContent: justify, display: displayType}}>
			<div className={styles.title}>
				{title}&ensp;
			</div>
			<div style={style}>
				<Select 
					value={chosen}
					options={options}
					onChange={ (option) => handleChange(option.value) }
					clearable={false}
					className={styles.outer}
				/>
			</div>
		</div>
	)
}
