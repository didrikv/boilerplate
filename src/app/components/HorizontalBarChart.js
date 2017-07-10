import React from 'react'
import styles from "./GeneralChart.css"
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
		<div className={styles} >
		<VictoryChart
			animate={{duration: 500, onLoad: {duration: 500}, onEnter: {duration: 500, before: () => ({y: 0})}}}
			containerComponent={<VictoryContainer responsive={true}/>}
			width={650}
			height={400}
			domainPadding={{x:[0,0], y:[20,10]}}
			padding={{top:40, bottom:10, left:120, right:0}}
			theme={theme}
		>

		<VictoryLegend 
			y={-40}
			x={-50}
			data={foo}
			colorScale={colorScale}
			orientation="horizontal"
			gutter={5}
			symbolSpacer={5}
		/>

		<VictoryAxis dependentAxis 
			tickFormat={(tick) => ""}
			style={{ticks:{size:0}, grid:{stroke: "transparent"}}}
		/>
		
	
		<VictoryAxis 
			crossAxis={false}
			orientation="bottom"
			style={{grid:{stroke: "transparent"}}}
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
