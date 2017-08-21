import React from 'react'
import norge_simp from '../data/norway_simple.json'
import { feature } from 'topojson'
import {min, max, scaleQuantile, scaleLinear, scaleQuantize, geoTransverseMercator, geoPath} from 'd3'
import Map from '../components/Map.js'
import MapLegend from '../components/MapLegend.js'
import styles from '../components/Map.css'
import {TransitionGroup} from 'react-transition-group'
import FadeTransition from '../components/CrossFade.js'



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
      key={area.properties.Nr}
      style={{stroke: 'grey', strokeWidth: 0.4}}
	  className={styles.static}
    />
  )
})

export default function NorwayMap(props) {
  let {inndeling} = props
  var areas = inndeling ? maps[inndeling] : maps.Kommune
  let colors = ['#CA0020', '#F4A582', '#dedede', '#92C5DE', '#0571B0']
  
  if(props.data) {
    var array = Object.keys( props.data ).map(function ( key ) { return props.data[key]; });
    var scale = scaleQuantile()
      .domain(array)
      .range(colors)
    areas.forEach( (e) => {
      e.props.style.fill = scale(props.data[e.key])
    })
  }

  let threshold = [min(array), ...scale.quantiles(), max(array)]

  return (
	  	<div style={{position: "relative"}}>
	  	<TransitionGroup>
		<FadeTransition key={inndeling}>
		<svg
		  width='100%'
		  height='100%'
		  viewBox='44 -3 373 467'
		  className={styles.map}
		  id={props.svgId}
		>
			{areas}
		<MapLegend colors={colors} threshold={threshold} x={280} y={250} borderColor="gray"/>
		</svg>
		</FadeTransition>
		</TransitionGroup>
		</div>
  )
}
