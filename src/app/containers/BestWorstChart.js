import React from 'react'
import { connect } from 'react-redux'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import TopBottomHorizontalChart from "../components/TopBottomHorizontalChart.js"
import info from "../data/info2.svg"
import styles from "./Button.css"
import Download from "../components/Download.js"

function mapStateToProps(state) {
	return {domain:state.domain, inndeling: state.inndeling, population:state.population}
}

function BestWorstChart(props) {
	let inndeling = props.inndeling[0].toUpperCase() + props.inndeling.slice(1) 
	let data = props.data.filter( (e) => e.Inndeling == inndeling)
	if(inndeling == "Kommune") {data = data.filter( (e) => e.Folketall >= props.population)}

	
	if(props.domain == "Bostedsattraktivitet") {
		var stack = ["Fødselsoverskudd", "Forventet Flytting", "Bostedsattraktivitet"]
		var sortby = "Bostedsattraktivitet"
		var colorScale = ["#f0b0d7", "#6BB7F0", "#6DD977"]
	} else if(props.domain == "Næringsattraktivitet"){
		var stack = ["Nasjonalt Bidrag", "Næringsstruktur", "Næringsattraktivitet"]
		var sortby = "Næringsattraktivitet"
		var colorScale = ["#e57e69", "#95d6d6", "#EDEB5D"]
	} else {
		var stack = ["Forventet Befolkningsvekst", "Bostedsattraktivitet", "Egenvekst Attraktivitet"]
		var sortby = "Samlet attraktivitet"
		var colorScale = ["#9E9E9E", "#8BC34A", "#FFB74D"]
	}

	var text = 
	`Nulla porttitor accumsan tincidunt. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt.`

	var infotab = (<Popover title="Forklaring for grafen:" id="pop-focus" style={{fontSize:12}}>
			{text}
				</Popover>)
	return (
		<div>

		<div style={{display:"flex", alignItems:"center", justifyContent:"center", borderBottom: "1px solid lightgray", marginBottom: "10px"}}>
		<OverlayTrigger trigger="click" rootClose overlay={infotab} placement="left">
		<div> <input className={styles.button} type="image"  src={info} height="30px"/> </div>
		</OverlayTrigger>
		&ensp; <Download svgId={props.chartId} />
		<p style={{display: "inline", margin:"0px", fontSize:"20px"}}> &emsp; 10 Beste i landet</p>
		</div>

		<TopBottomHorizontalChart 
			{...props}
			data={data} 
			n={props.n ? props.n : 5} 
			x="Navn" 
			stack={stack} 
			sortby={sortby}
			colorScale={colorScale}
		/>

		</div>
	)
}

export default connect(mapStateToProps)(BestWorstChart)
