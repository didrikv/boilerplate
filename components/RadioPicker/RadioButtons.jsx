import React from 'react'
import {RadioGroup, Radio} from 'react-radio-group'
import styles from './RadioButtons.css'

export default function RadioPicker({values, names, chosen, handleChange}){
	values = values ? values : names

	let options = names.map( (name, i) => {
		let buttonClass = values[i] == chosen ? styles.checked : styles.unChecked

		return(
			<div className={buttonClass} onClick={() => handleChange(values[i])} key={i}>
				<div className={styles.outer}>
					<div className={styles.inner}>
					</div>
				</div>
				<div className={styles.label}>
					{name}
				</div>
			</div>
		)
	})

	return <div className={styles.container}>
		{options}
		</div>
}
