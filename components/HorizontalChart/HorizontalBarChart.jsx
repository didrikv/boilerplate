import React from 'react'
import { VictoryChart, 
	VictoryBar, 
	VictoryLabel, 
	VictoryStack, 
	VictoryTheme, 
	VictoryContainer, 
	VictoryAxis, 
	VictoryLegend } from 'victory'

import theme from './VictoryTheme.js'

export default function HorizontalBarChart(props) {
	let { data, x, stack, colorScale, svgId, reverse ,ytitle, legendNames, noticks} = props
	legendNames = legendNames ? legendNames : stack
	if(reverse) {
		data = data.slice()
	} else {
		data = data.slice().reverse()
	}
	let names = data.map((e) => e[x])
	let legendData = legendNames.map( (e) => ({name:e, symbol: {type: 'square'}}))

	let varCount = stack.length
	let nameLen = 0
	names.forEach( (e) => {
		nameLen = e.length > nameLen ? e.length : nameLen
	})
	
	let topPadding = 10 + 20*varCount	
	let leftPadding = 8 + 8*nameLen
	let height = 30 + topPadding + names.length * 30
	

	return (
		<div id={svgId}>
		<VictoryChart
			width={650}
			height={height}
			domainPadding={{x:[0,0], y:[20,10]}}
			padding={{top:topPadding, bottom:50, left:leftPadding, right: 20}}
			theme={theme}
			animate={{
						duration: 300, 
						onLoad: {duration: 200}, 
					}}
		>


		
	
		<VictoryAxis 
			crossAxis={false}
			style={{grid:{stroke: 'transparent'}}}
			label={noticks ? null : ytitle}
			axisLabelComponent={
				<VictoryLabel dy={20} />
			}
			tickFormat={ (tick) => noticks ? "" : tick}
			style={{
				ticks:{
					size: noticks ? 0 : 5
				},
				grid:{
					stroke: null
				}
			}}
		/>
		
		<VictoryStack 
			colorScale={colorScale}
			horizontal={true}
		>
			{stack.map((e, i) => {

				return(
					<VictoryBar 
						data={data} 
						x={x} 
						y={e} 
						key={e}
					/>
				)}
			)}
		</VictoryStack>

		<VictoryLegend 
			y={8}
			x={5}
			data={legendData}
			colorScale={colorScale}
			symbolSpacer={0.1}
			labelComponent={<VictoryLabel dx={10} />}
		/>

		<VictoryAxis dependentAxis
			style={{ticks:{size:0}, grid:{stroke: 'transparent'}}}
			tickValues={data.map( (e,i) => i+1 )}
			tickFormat={data.map( (e) => e[x])}
		/>

		</VictoryChart>
		</div>
	)
}
