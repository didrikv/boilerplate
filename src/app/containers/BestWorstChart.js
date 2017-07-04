import React from 'react'
import { connect } from 'react-redux'
import TopBottomHorizontalChart from "../components/TopBottomHorizontalChart.js"

function mapStateToProps(state) {
	return {year:state.year ,domain:state.domain, inndeling: state.inndeling}
}

function BestWorstChart(props) {
	let inndeling = props.inndeling[0].toUpperCase() + props.inndeling.slice(1) 
	let data = props.data.filter( (e) => e.Inndeling == inndeling && e.År == props.year)

	
	if(props.domain == "Bostedsattraktivitet") {
		var stack = ["Innvandringsbidrag", "Fødselsoverskudd", "Bostedsstruktur", "Bostedsattraktivitet"]
		var sortby = "Bostedsattraktivitet"
	} else if(props.domain == "Næringsattraktivitet"){
		var stack = ["Næringsattraktivitet", "Nasjonalt Bidrag", "Næringsstruktur"]
		var sortby = "Næringsattraktivitet"
	} else {
		var stack = ["Innvandringsbidrag", "Fødselsoverskudd", "Samlet struktur", "Samlet Attraktivitet"]
		var sortby = "Samlet Attraktivitet"
	}

	return (
		<TopBottomHorizontalChart 
			data={data} 
			n={5} 
			x="Navn" 
			stack={stack} 
			sortby={sortby}
		/>
	)
}

export default connect(mapStateToProps)(BestWorstChart)
