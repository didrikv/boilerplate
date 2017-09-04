import React from 'react'
import {OverlayTrigger, Popover, Button, ButtonToolbar} from 'react-bootstrap'
import styles from './App.css'


export default function InfoText(props) {

	let buttons = ['Mål', 'Formel', 'Kilder', 'Vekting']
	if(props.merknad) {buttons.push('Merknad')}

	let popOver = buttons.map( (e) => {
		let value = e.toLowerCase()
		return(
			<Popover id={value} title={e}>
				{props[value]}
			</Popover>
		)
	})

	buttons = buttons.map( (e, i) => 
		<OverlayTrigger 
			overlay={popOver[i]} 
			key={e}
			trigger='click'
			rootClose
			placement='bottom'
		>
			<div
				className={styles.info}
			> {e} </div>
		</OverlayTrigger>
	)



	return(
		<div style={{display: 'flex'}}>
			<div style={{
				padding: ' 4px 0px',
				fontWeight: 'bold'
			}}
		>
			Teknisk Info:
		</div>
		{buttons}
	</div>
	)
}
