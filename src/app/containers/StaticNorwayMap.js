import React from 'react'
import {connect} from 'react-redux'
import {OverlayTrigger, Popover } from 'react-bootstrap'
import info from "../data/info.svg"
import NorwayMap from "./NorwayMap.js"

function mapStateToProps(state) {
	return {domain:state.domain, inndeling:state.inndeling}
}

function NorgeKommuneMap(props) {
	let inndeling = props.inndeling[0].toUpperCase() + props.inndeling.slice(1) 
	let data = props.data.filter( (e) => e.Inndeling == inndeling)
	let dataobj = {}

	for(let i=0; i<data.length; i++) {
		if(props.domain == "Bostedsattraktivitet") {
			var value = data[i].Bostedsattraktivitet
		} else if(props.domain == "Næringsattraktivitet"){
			var value = data[i].Næringsattraktivitet
		}
		else {
			var value = data[i].Bostedsattraktivitet + data[i]["Egenvekst Attraktivitet"]
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
		<input type="image"  src={info} height="20px"/>
		</OverlayTrigger>
		<h5 style={{display: "inline"}}> &emsp; Norgeskart</h5>
		</div>
		
		<NorwayMap 
			{...props} 
			data={dataobj} 
			object={props.inndeling}
		/>
		</div>
	)
}

export default connect(mapStateToProps)(NorgeKommuneMap)
