import React from 'react'
import { feature } from 'topojson'
import {geoTransverseMercator, geoPath} from 'd3-geo'
import {min, max} from 'd3-array'
import {scaleQuantile} from 'd3-scale'

import {TransitionGroup} from 'react-transition-group'

import norge_simp from './norge.json'
import MapLegend from './MapLegend.jsx'
import styles from './Map.css'
import FadeTransition from '../CrossFade/CrossFade.jsx'

let projection = geoTransverseMercator()
	.rotate([-15, -65, 0])
	.translate([450/2, 450/2])
	.scale(2000)

let path = geoPath()
	.projection(projection)

let norge = norge_simp
let maps = {}

maps.Kommune = feature(norge, norge.objects.kommune).features
maps.Region = feature(norge, norge.objects.region).features
maps.Fylke = feature(norge, norge.objects.fylke).features

let inndelinger = ['Kommune', 'Region', 'Fylke']
inndelinger.forEach( (inndeling) => {
	maps[inndeling] = maps[inndeling].map( (area) => 
		<path
			vectorEffect='non-scaling-stroke'
			d={path(area)}
			key={area.properties.nr}
			style={{stroke: 'grey', strokeWidth: 0.4}}
			className={styles.static}
		/>
	)
})

export default function NorwayMap({ inndeling, data, svgId, noLegend, reverse, percentLegend}) {
	let areas = inndeling ? maps[inndeling] : maps.Kommune

	let origData = {...data}

	let all = Object.keys(data)
	let zeros = all.filter( (key) => data[key] === 0 )
	let whiteZeros = zeros.length / all.length
	if(whiteZeros < 0.2) { whiteZeros = 0}
	let colors = whiteZeros ? ['#c6dbef','#9ecae1','#6baed6','#3182bd','#08519c'] : 
		['#CA0020', '#F4A582', '#b29fa9', '#92C5DE', '#0571B0']
	reverse ? colors.reverse() : null

	Object.keys(data).forEach( (key) => {
		if(data[key] === ""){
			delete data[key]
		} else if(data[key] === 0 && whiteZeros) {
			delete data[key]
		}
	})

	if(data) {
		var array = Object.keys(data).map(
			function ( key ) { return data[key]; }
		)
		var scale = scaleQuantile()
			.domain(array)
			.range(colors)
		areas.forEach( (e) => {
			if(! (data[e.key] === undefined)) {
				e.props.style.fill = scale(data[e.key])
			} else {
				e.props.style.fill = "#e9e9e9"
			}

		})
	}

	let threshold = [min(array), ...scale.quantiles(), max(array)]
	let mapLegend = noLegend ? null : 
		<MapLegend colors={colors} threshold={threshold} x={280} y={250} borderColor='gray' whiteZeros={whiteZeros} percentLegend={percentLegend}/>

		return (
			<div style={{position: 'relative', zIndex: '-1'}} id="sdff">
					<div style={{ position: 'relative', height: 0, width: '100%', padding: 0, paddingBottom: `${100 * (700 / 576.66)}%` }} >
							<svg
								style={{position: 'absolute', height: '100%', width: '100%', left: 0, top: 0 } }
								width='100%'
								height='100%'
								viewBox='44 -3 373 467'
								className={styles.map}
								id={svgId}
							>
								{areas}
								{mapLegend}
							</svg>
					</div>
			</div>
		)
}
