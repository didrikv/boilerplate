import React from 'react'
import {VictoryBar, 
	VictoryChart, 
	VictoryAxis, 
	VictoryTheme, 
	VictoryStack, 
	VictoryLine, 
	VictoryContainer,
	Bar,
	VictoryLabel
	} from 'victory'
import theme from "../data/VictoryTheme.js"

export default function StackAndLineChart(props){
	let data = props.data
	console.log(data)
	console.log(props.line)
	console.log(props.stack)
	
	return (
		<VictoryChart 
		theme={VictoryTheme.material}
		animate={{onLoad:{duration:500, delay:100}}}
		containerComponent={<VictoryContainer responsive={false}/>}
		width={450}
		height={300}
		//padding={{top:0, bottom:0, left:60, right:40}}
		domainPadding={{x:[20,10], y:[10,10]}}
		theme={theme}
		>
		<VictoryLabel text={data[0][props.label]} x={450/2} y={30} textAnchor="middle"/>
		<VictoryAxis 
			tickValues={data.map((e) => e[props.x])}
			tickLabelComponent={<VictoryLabel angle={90} verticalAnchor="middle" dx={10}/>}
			offsetY={50}
			style={{grid:{stroke: "transparent"}}}
		/>
		<VictoryAxis dependentAxis 
			crossAxis={false}
			style={{grid:{stroke: "transparent"}}}
		/>
		
		<VictoryStack
		>
		{props.stack.map((e, i) => 
			<VictoryBar data={data} x={props.x} y={e} key={e}
			/>
		)}
		</VictoryStack>
		<VictoryLine 
			data={data}
			x={props.x}
			y={props.line}
			interpolation="natural"
		/>
	</VictoryChart>	
		
	)
}
		
