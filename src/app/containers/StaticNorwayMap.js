import React from 'react'
import {connect} from 'react-redux'
import {OverlayTrigger, Popover, Button } from 'react-bootstrap'
import info from "../data/info2.svg"
import NorwayMap from "./NorwayMap.js"
import styles from "./Button.css"
import Download from "../components/Download.js"

function mapStateToProps(state) {
	return {domain:state.domain, inndeling:state.inndeling}
}

function NorgeKommuneMap(props) {
	let inndeling = props.inndeling[0].toUpperCase() + props.inndeling.slice(1) 
	let data = props.data.filter( (e) => e.Inndeling == inndeling)
	let dataobj = {}
	console.log(data)

	for(let i=0; i<data.length; i++) {
		if(props.domain == "Bostedsattraktivitet") {
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

	var text = 
	`Nulla porttitor accumsan tincidunt. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt.`

	var infotab = (<Popover title="Forklaring for kartet:" id="pop-focus" style={{fontSize:12}}>
			{text}
				</Popover>)
	


	return(
		<div>

		<div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
		<OverlayTrigger trigger="click" rootClose overlay={infotab} placement="right">
		<div>
		<input className={styles.button} type="image"  src={info} height="20px" />
		</div>
		</OverlayTrigger>
		&emsp;
		<Download svgId="statnorwaymap" />
		<h5 style={{display: "inline"}}> &emsp; {name} &emsp; </h5>
		</div>
		
		<NorwayMap 
			{...props} 
			data={dataobj} 
			object={props.inndeling}
			mapId="statnorwaymap"
		/>
		</div>
	)
}

export default connect(mapStateToProps)(NorgeKommuneMap)
