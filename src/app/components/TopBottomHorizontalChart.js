import React from 'react'
import HorizontalBarChart from "./HorizontalBarChart.js"

export default function TopBottomHorizontalChart(props) {
	let data = props.data
	let sortby = props.sortby
	let n = props.n

	data.sort((b, a) => a[sortby] - b[sortby])

	let top = data.slice(0,n)
	let bottom = data.slice(-n)
	
	return(
		<div>
			<div>
			<h3>Top 5 </h3>
			<HorizontalBarChart {...props} data={top} />
			</div>
			<div>
			<h3>Bånn 5 </h3>
			<HorizontalBarChart {...props} data={bottom} />
			</div>
		</div>
	)
		

	return(null)
}

