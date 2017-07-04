import React from 'react'
import {min, max, scaleQuantile, scaleLinear, scaleQuantize} from 'd3'
import {StyleSheet, css} from 'aphrodite/no-important'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import Picker from "./Picker.js"
import styles from "./Map.css"

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


	let names = areas.map( (area) => area.properties.Sted )
	let values = areas.map( (area) => area.properties.Nr)
	values.splice(0,0,0)
	names.splice(0,0,"")

	let htmlPaths = 
		areas.map((area) => {
			let areaPath = <path
							className={props.onClick ? styles.active : styles.static}
							vectorEffect="non-scaling-stroke"
							d={path(area)} 
							key={area.properties.Nr}
							onClick={() => props.onClick(area.properties.Nr)}
							style = {{fill: getColor(area.properties.Nr)}}
						/>
			if(props.tooltip) {	
				return(
				<OverlayTrigger
					placement="top"
					animation={false}
					overlay={ <Tooltip id={area.properties.Nr}> {area.properties.Sted} </Tooltip> }
				>
				{areaPath}
				</OverlayTrigger>
			)
			}
			else {
				return(areaPath)
			}
			}
		)
	
	return(
		<div>
		{props.dropdown ? <Picker names={names} values={values} value={props.selectedID} handleChange={props.onClick} /> : null }
		<svg 
			height={height} 
			width={width} 
			viewBox={computeViewBox(areas, path)}
		>
		{htmlPaths}
		</svg>
		</div>
	)
}
