import React from 'react'
import {connect} from 'react-redux'

import YearPicker from "./YearPicker.js"
import InndelingPicker from "./InndelingPicker.js"
import PopulationSlider from "./PopulationSlider.js"
import VariablePicker from "./VariablePicker.js"
import { selectbestControl } from "../actions/actions.js"
import {Collapse, Fade} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import styles from "./ControlPanel.css"

function mapStateToProps(state) {
	return {control: state.bestControl}
}

function ControlPanel(props) {

	
	let yearPicker = props.control.YearPicker ? <YearPicker years={props.control.YearPicker.years} /> : null
	let variablePicker = props.control.VariablePicker ? <VariablePicker names={props.control.VariablePicker.names} values={props.control.VariablePicker.values} /> : null
	let inndelingsPicker = props.control.InndelingsPicker ? <InndelingPicker /> : null
	let populationSlider = props.control.PopulationSlider ? <PopulationSlider /> : null

	return(
		<div className={styles.wrapper} >
		<div className="container">
		<Fade in={props.control} >
				<div className={styles.header}>
					<div className={styles.row}>
					{yearPicker}
					</div >
					<div className={styles.row}>
					{variablePicker}
					<div style={{width: "20px"}}> </div>
					{inndelingsPicker}
					<div style={{width: "20px"}}> </div>
					{populationSlider}
					</div>
				</div>
		</Fade>
		</div>
		</div>
	)
}

export default connect(mapStateToProps)(ControlPanel)
