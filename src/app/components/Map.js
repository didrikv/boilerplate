import React from 'react'
import {min, max, scaleQuantile, scaleLinear, scaleQuantize} from 'd3'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import Picker from "./Picker.js"
import styles from "./Map.css"
import MapLegend from "./MapLegend.js"


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
	let colors = ["#CA0020", "#F4A582", "#dedede", "#92C5DE", "#0571B0"]
	
	if(props.data) {
		var array = Object.keys( props.data ).map(function ( key ) { return props.data[key]; });
		var scale = scaleQuantile()
			.domain(array)
			.range(colors)
	}
	else {
		var scale = () => false
	}
	let threshold = [min(array), ...scale.quantiles(), max(array)]
	

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

	let borderColor="#5F6A6A"

	let htmlPaths = 
		areas.map((area) => {
			let areaPath = <path
							className={props.onClick ? styles.active : styles.static}
							vectorEffect="non-scaling-stroke"
							d={path(area)} 
							key={area.properties.Nr}
							onClick={props.handleClick ? () => props.handleClick(area.properties.Nr) : null}
							style = {{fill: getColor(area.properties.Nr), stroke:"grey", strokeWidth: 0.4}}
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
			width="100%"
			height="100%" 
			viewBox={computeViewBox(areas, path)}
			className={styles.map}
			id={props.mapId}
		>
		<g key={props.inndeling}>
			{htmlPaths}
		</g>
		<MapLegend colors={colors} threshold={threshold} x={280} y={250} borderColor={borderColor}/>
		</svg>
		</div>
	)
}
