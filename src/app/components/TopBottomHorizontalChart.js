import React from 'react'
import HorizontalBarChart from "./HorizontalBarChart.js"
import HorizontalBarChart2 from "./HorizontalBarChart2.js"

export default function TopBottomHorizontalChart(props) {
	let data = props.data
	let sortby = props.sortby
	let n = props.n

	data.sort((b, a) => a[sortby] - b[sortby])

	let top = data.slice(0,n)
	let bottom = data.slice(-n)
	
	console.log({...props})
	return(
		<div>
			<HorizontalBarChart {...props} data={top} />
			<HorizontalBarChart {...props} data={bottom}/>
		</div>
	)
		

	return(null)
}

