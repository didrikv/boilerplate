import React from 'react'
import {FormControl} from 'react-bootstrap'
import Select from 'react-select'
import '../../node_modules/react-select/dist/react-select.css'
import styles from './Picker.css'


export default function Picker(props){
	let {names, values, handleChange, chosen, 
		boldFirst, title, justify, width, topTitle, sections, shields} = props

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
			label: names[i],
			value: values[i],
			className: (boldFirst && i == 0) ? styles.bold : undefined
		}))
	}

	let style = width ? {width: width} : {flex: 1}	
	let displayType = topTitle ? undefined : 'flex'

	//	if(shields) {
	//		var optionRenderer = (option) => {
	//			if(option.value < 3000) {
	//				return <span><img src={require('../../skjold/' + option.value + '.svg')} width='40px' /> {option.label} </span>
	//			} else {
	//				return <span><span style={{display: 'inline-block', width: '42px'}}> </span> {option.label} </span>
	//			}
	//		}
	//	} else {var optionRenderer = undefined}
	//
	return (
		<div style={{justifyContent: justify, display: displayType}}>
			<div className={styles.title}>
				{title}&ensp;
			</div>
			<div style={style} className={shields ? styles.shield : undefined}>
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
