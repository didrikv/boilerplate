import React from 'react'
import { connect } from 'react-redux'

import TopBottomHorizontalChart from "../components/TopBottomHorizontalChart.js"

function mapStateToProps(state) {
	return {selected: state.fylke}
}

export default connect(mapStateToProps)(BestWorstFylkeChart)

function BestWorstFylkeChart(props) {
	let data = props.data
	data = data.filter((e) => e.Nr > props.selected *100 && e.Nr < (props.selected + 1)*100 && e.Aar == 2015)
	let stack = ["Bostedsattraktivitet", "Egenvekst", "Strukturelle flyttefaktorer"]


	return (
		<TopBottomHorizontalChart data={data} n={5} x="Sted" stack={stack} sortby="Bostedsattraktivitet"/>
	)

	

	return (null)
}
