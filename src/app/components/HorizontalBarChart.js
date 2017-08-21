import React from 'react'
import { VictoryChart, 
	VictoryBar, 
	VictoryLabel, 
	VictoryStack, 
	VictoryTheme, 
	VictoryContainer, 
	VictoryAxis, 
	VictoryLegend } from 'victory'
import theme from "../data/VictoryTheme.js"

export default function HorizontalBarChart(props) {
	let data = props.data.slice().reverse()
	let names = data.map((e) => e[props.x])
	let legendData = props.stack.map( (e) => ({name:e, symbol: {type: "square"}}))
	let colorScale = props.colorScale

	return (
		<div id={props.svgId}>
		<VictoryChart
			animate={{duration: 300, onLoad: {duration: 300}, onEnter: {duration: 300, before: () => ({y: 0})}}}
			width={650}
			height={400}
			domainPadding={{x:[0,0], y:[20,10]}}
			padding={{top:70, bottom:30, left:120, right:20}}
			theme={theme}
		>


		<VictoryAxis dependentAxis 
			tickFormat={(tick) => ""}
			style={{ticks:{size:0}, grid:{stroke: "transparent"}}}
		/>
		
	
		<VictoryAxis 
			crossAxis={false}
			orientation="bottom"
			style={{grid:{stroke: "transparent"}}}
			tickFormat={(tick) => tick}
		/>
		
		<VictoryStack 
			horizontal={true} 
			labels={names}
			labelComponent={<VictoryLabel x={0} textAnchor="beginning"/>}	
			colorScale={colorScale}
		>
			{props.stack.map((e, i) => 
				<VictoryBar 
					data={data} 
					x={props.x} 
					y={e} 
					key={e}
				/>
			)}
		</VictoryStack>

		<VictoryLegend 
			y={-70}
			x={-120}
			data={legendData}
			colorScale={colorScale}
			gutter={2}
		/>

		</VictoryChart>
		</div>
	)
}
