import React from 'react'

import YearPicker from "./YearPicker.js"
import InndelingPicker from "./InndelingPicker.js"
import PopulationSlider from "./PopulationSlider.js"
import VariablePicker from "./VariablePicker.js"
import {Collapse, Fade} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import styles from "./ControlPanel.css"


function ControlPanel(props) {

	let yearPicker = props.YearPicker ? <YearPicker years={props.YearPicker.years} /> : null
	let variablePicker = props.VariablePicker ? <VariablePicker names={props.VariablePicker.names} values={props.VariablePicker.values} /> : null
	let inndelingPicker = props.InndelingPicker ? <InndelingPicker /> : null
	let populationSlider = props.PopulationSlider ? <PopulationSlider /> : null

	return(
				<div className={styles.header}>
					{yearPicker}
					<div className={styles.row}>
					{variablePicker}
					{inndelingPicker}
					{populationSlider}
					</div>
				</div>
	)
}

export default ControlPanel
