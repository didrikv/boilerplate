import React from 'react'
import { VictoryChart, 
	VictoryBar, 
	VictoryLabel, 
	VictoryStack, 
	VictoryTheme, 
	VictoryContainer, 
	VictoryAxis, 
	VictoryPortal, 
	Bar, 
	VictoryLegend } from 'victory'
import theme from "../data/VictoryTheme.js"

export default function HorizontalBarChart(props) {
	let data = props.data
	data.reverse()
	let names = data.map((e) => e[props.x])
	let foo = props.stack.map( (e) => ({name:e, symbol: {type: "square"}}))
	if(props.colorScale) {var colorScale = props.colorScale}

	return (
		<div id={props.chartId}>
		<VictoryChart
			animate={{duration: 500, onLoad: {duration: 500}, onEnter: {duration: 500, before: () => ({y: 0})}}}
			containerComponent={<VictoryContainer responsive={true} />}
			width={650}
			height={400}
			domainPadding={{x:[0,0], y:[20,10]}}
			padding={{top:70, bottom:30, left:120, right:20}}
			theme={theme}
		>

		<VictoryLegend 
			y={-70}
			x={-120}
			data={foo}
			colorScale={colorScale}
			gutter={2}
		/>

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

		</VictoryChart>
		</div>
	)
}
