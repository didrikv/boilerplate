import React from 'react'
 import { connect } from 'react-redux'
import TopBottomHorizontalChart from "../components/TopBottomHorizontalChart.js"
import ChartWrapper from "./ChartWrapper.js"

function mapStateToProps(state) {
	return {
		domain:state.domain, 
		inndeling: state.inndeling, 
		population:state.population,
		years: state.year
	}
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

	let name = "Top 10 " + inndeling + " "
	name += props.years.length == 1 ? props.years[0] : props.years[0] + "-" + props.years[props.years.length-1]

	var text = 
	`Nulla porttitor accumsan tincidunt. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt.`

	return (
			<ChartWrapper name={name} info={text}>	
				<TopBottomHorizontalChart 
					{...props}
					data={data} 
					n={props.n ? props.n : 5} 
					x="Navn" 
					stack={stack} 
					sortby={sortby}
					colorScale={colorScale}
				/>
			</ChartWrapper>
	)
}

export default connect(mapStateToProps)(BestWorstChart)
