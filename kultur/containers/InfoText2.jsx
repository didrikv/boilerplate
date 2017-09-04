import React from 'react'
import {Tabs, Tab} from 'react-bootstrap'


export default function InfoText(props) {
	let buttons = ['Mål', 'Formel', 'Kilder', 'Vekting']
	if(props.merknad) {buttons.push('Merknad')}
	
	
	buttons = buttons.map( (e, i) => {
		let value = e.toLowerCase()
		return(
			<Tab eventKey={i} title={e}> 
				<p style={{color: '#555', fontStyle: 'italic'}}>
					{props[value]} 
				</p>
			</Tab>
		)
	})
	
	

	return(
		<Tabs defaultActiveKey={0}>
			{buttons}
		</Tabs>
	)
}
