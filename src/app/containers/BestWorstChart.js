import React from 'react'
import { connect } from 'react-redux'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import TopBottomHorizontalChart from "../components/TopBottomHorizontalChart.js"
import info from "../data/info2.svg"

function mapStateToProps(state) {
	return {domain:state.domain, inndeling: state.inndeling}
}

function BestWorstChart(props) {
	let inndeling = props.inndeling[0].toUpperCase() + props.inndeling.slice(1) 
	let data = props.data.filter( (e) => e.Inndeling == inndeling)

	
	if(props.domain == "Bostedsattraktivitet") {
		var stack = ["Innvandringsbidrag", "Fødselsoverskudd", "Bostedsstruktur", "Bostedsattraktivitet"]
		var sortby = "Bostedsattraktivitet"
	} else if(props.domain == "Næringsattraktivitet"){
		var stack = ["Nasjonalt Bidrag", "Næringsstruktur", "Næringsattraktivitet"]
		var sortby = "Næringsattraktivitet"
	} else {
		var stack = ["Innvandringsbidrag", "Fødselsoverskudd", "Samlet struktur", "Samlet Attraktivitet"]
		var sortby = "Samlet Attraktivitet"
	}

	var text = 
	`Nulla porttitor accumsan tincidunt. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt.`

	var infotab = (<Popover title="Forklaring for grafen:" id="pop-focus" style={{fontSize:12}}>
			{text}
				</Popover>)

	return (
		<div>

		<div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
		<OverlayTrigger trigger="click" rootClose overlay={infotab} placement="left">
		<input type="image"  src={info} height="20px"/>
		</OverlayTrigger>
		<h5 style={{display: "inline"}}> &emsp; 10 Beste i landet</h5>
		</div>

		<TopBottomHorizontalChart 
			{...props}
			data={data} 
			n={props.n ? props.n : 5} 
			x="Navn" 
			stack={stack} 
			sortby={sortby}
		/>
		</div>
	)
}

export default connect(mapStateToProps)(BestWorstChart)
