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
	console.log(props.stack)

	return (
		<VictoryChart
			//animate={{onLoad:{duration:500, delay:100}}}
			containerComponent={<VictoryContainer responsive={false}/>}
			width={650}
			height={300}
			domainPadding={{x:[0,0], y:[20,10]}}
			padding={{top:0, bottom:50, left:100, right:200}}
			theme={theme}
		>

		<VictoryLegend 
			x={360}
			y={0}
			data={foo}
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
			labelComponent={<VictoryLabel x={90} textAnchor="end"/>}	
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
	)
}
