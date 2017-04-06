import React from 'react'
import {min, max, scaleQuantile, scaleLinear, scaleQuantize} from 'd3'
import {StyleSheet, css} from 'aphrodite/no-important'


function computeViewBox(areas, path){
	let bounds = areas.map((area) => path.bounds(area))

	let xmin = [], xmax = [], ymin = [], ymax = []
	for(let i=0; i<bounds.length; i++){
		xmin[i] = bounds[i][0][0]
		ymin[i] = bounds[i][0][1]
		xmax[i] = bounds[i][1][0]
		ymax[i] = bounds[i][1][1]
	}
	xmin = min(xmin)
	xmax = max(xmax)
	ymin = min(ymin)
	ymax = max(ymax)

	return xmin + " " + ymin + " " + (xmax-xmin) + " " + (ymax-ymin)
}

	

export default function Map(props){
	let height = props.height, width = props.width
	let areas = props.areas, path = props.path
	
	if(props.data) {
		var array = Object.keys( props.data ).map(function ( key ) { return props.data[key]; });
		var scale = scaleQuantile()
			.domain(array)
			.range(["#CA0020", "#F4A582", "#dedede", "#92C5DE", "#0571B0"])
	}
	else {
		var scale = () => false
	}
	let getColor = (Nr) => {
		if(props.data) {
			return scale(props.data[Nr]) 
		} else {
			return false
		}
	}
	
	return(
		<svg 
			height={height} 
			width={width} 
			style={{border: "1px solid black"}}
			viewBox={computeViewBox(areas, path)}
		>
		{areas.map((area) => 
			<path
				d={path(area)} 
				className={css(styles.path)} 
				key={area.properties.Nr}
				onClick={() => props.onClick(area.properties.Sted)}
				style = {{fill: getColor(area.properties.Nr)}}
			>
			<title className={css(styles.tooltip)}>{area.properties.Sted}</title>
			</path>
		)}
		</svg>
	)
}
	

let styles = StyleSheet.create({
	path: {
		fill: "grey",
		stroke: "black",
		strokeWidth: "0.5px",
		vectorEffect: "non-scaling-stroke",
		':hover': {
			strokeWidth: "1px",
			fillOpacity: 0.5
		},
	},
	tooltip: {
		fill: "white",
		strokeWidth: "2px"
	}

})





