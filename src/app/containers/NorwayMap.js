import React from 'react'
import norge_simp from "../data/norway_simple.json"
import { feature } from 'topojson'
import {geoTransverseMercator, geoPath} from 'd3'
import Map from "../components/Map.js"

export default function NorwayMap(props) {
	let width = props.width ? props.width : 450
	let height = props.height ? props.height : 450

	let projection = geoTransverseMercator()
		.rotate([-15, -65, 0])
		.translate([width/2, height/2])
		.scale(2000)

	let path = geoPath()
		.projection(projection)

	var norge = norge_simp

	if (props.object) {
		var areas = feature(norge, norge.objects[props.object]).features
	} else {
		var areas = feature(norge, norge.objects.kommune).features
	}

	if(props.fylke) {
		if (!props.object || props.object == 'kommune') {
			areas = areas.filter((area) => area.properties.Fnr == props.fylke)
		}
		else if (props.object == 'fylke') {
			areas = areas.filter((area) => area.properties.Nr == props.fylke)
		}
	}
	else if (props.region) {
		if (!props.object || props.object == 'kommune') {
			areas = areas.filter((area) => area.properties.Rnr == props.region)
		}
		else if (props.object == 'region') {
			areas = areas.filter((area) => area.properties.Nr == props.fylke)
		}
	}
	else if(props.kommune && (!props.object || props.object =='kommune')) {
		areas = areas.filter((area) => area.properties.Nr == props.kommune)
	}

	return (
		<Map 
			{...props}
			areas={areas} 
			path={path} 
			height={height} 
			width={width}
		/>
	)
}

