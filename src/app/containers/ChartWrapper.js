import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { v4 } from 'uuid'

import info from '../data/info2.svg'
import styles from './chartWrapper.css'
import Download from '../components/Download.js'
console.log("sdf")

function ChartWrapper(props) {
	const svgId = v4()

	if(props.info) {
		
		const infotab = <Popover title="Forklaring for grafen:" id="pop-focus">
							{props.info}
						</Popover>

		var infoButton = 
			<OverlayTrigger trigger="click" rootClose overlay={infotab} placement="right">
				<div>
					<input className={styles.svgButton} type="image"  src={info}/>
				</div>
			</OverlayTrigger>
	} else { var infoButton = null} 

	return(
		<div className={ styles.container}>
			<div className={styles.header}>
				<div className={styles.right}> </div>
				<p className={styles.title}> {props.name} </ p>
				<div className={styles.btnContainer}>
					{infoButton}
					&emsp;
					<Download svgId={svgId} />
				</div>
			</div>
			
			<div className={styles.chartContainer}>
				{React.cloneElement(props.children, {svgId})}
			</div>
		</div>
	)
}

export default ChartWrapper
