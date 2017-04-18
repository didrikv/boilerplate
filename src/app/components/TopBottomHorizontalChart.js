import React from 'react'
import HorizontalBarChart from "./HorizontalBarChart.js"

export default function TopBottomHorizontalChart(props) {
	let data = props.data
	let sortby = props.sortby
	let n = props.n

	data.sort((b, a) => a[sortby] - b[sortby])

	let top = data.slice(0,n)
	let bottom = data.slice(-n)
	console.log(data)
	
	return(
		<div>
			<HorizontalBarChart {...props} data={top} />
			<HorizontalBarChart {...props} data={bottom}/>
		</div>
	)
		

	return(null)
}

