import React from 'react'
import HorizontalBarChart from "./HorizontalBarChart.js"

export default function TopBottomHorizontalChart(props) {
	let data = props.data.slice()
	let sortby = props.sortby
	let n = props.n
	data.sort((a, b) => b[sortby] - a[sortby])

	if(props.view == 'top') {
		data = data.slice(0,n)
	} else if(props.view == 'bottom') {
		data = data.slice(-n)
	} else {
		data = data.slice(0,n).concat(generateDummy(data[0])).concat(data.slice(-n))
	}
	
	return(
			<HorizontalBarChart 
				{...props} 
				data={data}
			/>
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
