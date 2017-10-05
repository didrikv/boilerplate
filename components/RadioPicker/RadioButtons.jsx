import React from 'react'
import {RadioGroup, Radio} from 'react-radio-group'
import styles from './RadioButtons.css'

export default function RadioPicker({values, names, chosen, handleChange}){
	values = values ? values : names

	return (
		<RadioGroup name="sdf" selectedValue={chosen} onChange={handleChange}>
			{names.map( (e, i) => 
				<label key={i} className={styles.label}>
				<Radio value={values[i]} className={styles.radio}/> {e}
				</label>
			)}
		</RadioGroup>
	)
}
