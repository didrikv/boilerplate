import React from 'react'
import {connect} from 'react-redux'
import {OverlayTrigger, Popover, Button } from 'react-bootstrap'
import info from "../data/info2.svg"
import NorwayMap from "./NorwayMap.js"
import styles from "./chartWrapper.css"
import Download from "../components/Download.js"

function mapStateToProps(state) {
	return {
		domain:state.domain,
		inndeling:state.inndeling,
		years: state.year
	}
}

function StaticNorwayMap(props) {
	let inndeling = props.inndeling[0].toUpperCase() + props.inndeling.slice(1) 
	let data = props.data.filter( (e) => e.Inndeling == inndeling)
	let dataobj = {}



	for(let i=0; i<data.length; i++) {
		if(props.variable) {
			var value = data[i][props.variable]
			var name = props.variable
		} else if(props.domain == "Bostedsattraktivitet") {
			var value = data[i].Bostedsstruktur
			var name = "Bostedsstruktur"
		} else if(props.domain == "Næringsattraktivitet"){
			var value = data[i].Næringsstruktur
			var name = "Næringsstruktur"
		}
		else {
			var value = data[i]["Samlet struktur"]
			var name = "Samlet struktur"
		}
		dataobj[data[i].Nr] = value
	}

	name += " "
	name += props.years.length == 1 ? props.years[0] : props.years[0] + "-" + props.years[props.years.length-1]

	var text = 
	`Nulla porttitor accumsan tincidunt. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt.`

	var infotab = (<Popover title="Forklaring for kartet:" id="pop-focus" style={{fontSize:12}}>
			{text}
				</Popover>)
	

	return(
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.right}> </div>
				<p className={styles.title}> {name} </ p>
				<div className={styles.btnContainer}>
					<OverlayTrigger trigger="click" rootClose overlay={infotab} placement="right">
						<div>
						<input className={styles.svgButton} type="image"  src={info}/>
						</div>
					</OverlayTrigger>
					&emsp;
						<Download svgId="statnorwaymap" />
				</div>
			</div>

			<div className={styles.chartContainer}>	
				<NorwayMap 
					{...props} 
					data={dataobj} 
					object={props.inndeling}
					mapId="statnorwaymap"
				/>
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(StaticNorwayMap)
