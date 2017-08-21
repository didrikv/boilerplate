import React from 'react'
import styles from './ControlPanel.css'
import MultiSelect from '../components/MultiSelect2.js'
import RadioPicker from '../components/RadioPicker.js'
import { Fade } from 'react-bootstrap'


function ControlPanel({ selectYears, selectInndeling, selectPopulation, selectVariable, hide}) {

	if(selectPopulation) { var populationClass = selectInndeling.value == "Kommune" ? styles.show : styles.hide }
	let displayClass = hide ? styles.hide : styles.show
	
	selectPopulation = selectPopulation ? <div className={populationClass}> <RadioPicker {...selectPopulation} /> </div> : null
	selectYears = selectYears ? <MultiSelect {...selectYears}/> : null
	selectInndeling = selectInndeling ? <RadioPicker {...selectInndeling} /> : null
	selectVariable = selectVariable ? <RadioPicker {...selectVariable} /> : null


	
	return(
				<div className={displayClass}>
				<div className={styles.header}>
					{selectYears}
					<div className={styles.row}>
					{selectInndeling}
					{selectPopulation}
					{selectVariable}
					</div>
				</div>
				</div>
	)
}

export default ControlPanel
