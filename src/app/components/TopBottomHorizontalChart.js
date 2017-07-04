import React from 'react'
import HorizontalBarChart from "./HorizontalBarChart.js"

export default function TopBottomHorizontalChart(props) {
	let data = props.data
	let sortby = props.sortby
	let n = props.n

	data.sort((b, a) => a[sortby] - b[sortby])

	let top = data.slice(0,n)
	let bottom = data.slice(-n)
	let dummy = generateDummy(top[0])
	let both = top.concat(dummy).concat(bottom)
	
	return(
		<div>
			<h3>Best and worst </h3>
			<HorizontalBarChart 
				{...props} 
				data={both}
			/>
		</div>
	)
}

function generateDummy(element) {
	let dummy = {}
	Object.keys(element).forEach( 
		(key) => {
			dummy[key] = isNaN(element[key]) ? "" : 0
		}
	)
	return dummy
}


