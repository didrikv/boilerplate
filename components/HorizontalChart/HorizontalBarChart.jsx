import React from 'react'
import VictoryChart from '../IEFriendlyVictoryChart.jsx'
import { 
	VictoryBar, 
	VictoryLabel, 
	VictoryStack, 
	VictoryTheme, 
	VictoryContainer, 
	VictoryAxis, 
	VictoryLegend } from 'victory'

import theme from './VictoryTheme.js'

export default function HorizontalBarChart(props) {
	let { data, x, stack, colorScale, svgId, reverse ,ytitle, legendNames, noticks, name, itemsPerRow} = props
	legendNames = legendNames ? legendNames : stack
	colorScale = colorScale ? colorScale : 
		['#9CCC65','#5DADE2','#FFA726','#A569BD','#EF5350','#AAB7B8','#8D6E63','#F48FB1','#78909C','#00ACC1','#FFEB3B']
	if(reverse) {
		data = data.slice()
	} else {
		data = data.slice().reverse()
	}
	data.forEach( (e) => {
		e[x] = String(e[x])
	})
	let names = data.map((e) => e[name])
	let legendData = legendNames.map( (e) => ({name:e, symbol: {type: 'square'}}))

	let varCount = stack.length
	let nameLen = 0
	names.forEach( (e) => {
		nameLen = e.length > nameLen ? e.length : nameLen
	})
	
	itemsPerRow = itemsPerRow ? itemsPerRow : 2
	let topPadding =  varCount == 1 ? 0 : 10 + 20*Math.ceil(varCount/itemsPerRow)	
	let leftPadding = 15 + 8*nameLen
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
			orientation='bottom'
			axisLabelComponent={
				<VictoryLabel dy={25} />
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

		{varCount == 1 ? null :
			<VictoryLegend 
				y={8}
				x={5}
				data={legendData}
				colorScale={colorScale}
				symbolSpacer={0.1}
				gutter={10}
				labelComponent={<VictoryLabel dx={10} />}
				itemsPerRow={itemsPerRow}
				orientation='horizontal'

			/>
		}

		<VictoryAxis dependentAxis
			style={{ticks:{size:0}, grid:{stroke: 'transparent'}}}
			tickValues={data.map( (e,i) => i+1 )}
			tickFormat={data.map( (e) => e[name])}
			tickLabelComponent={
				<VictoryLabel x={0} textAnchor='start'/>
			}
		/>

		</VictoryChart>
		</div>
	)
}
