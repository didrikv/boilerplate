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

export default function StackAndLineChart(props){
	let data = props.data
	console.log(data.length)
	var colorScale=["red", "green", "blue", "orange"]
	var min = Math.min.apply(Math, data.map((e) => e.Nettoinnflytting))
	var max = Math.max.apply(Math, data.map((e) => e.Nettoinnflytting))
	var domain = [min, max]
	console.log(domain)
	console.log(data)
	
	
	return (
		<VictoryChart 
		theme={VictoryTheme.material}
		animate={{onLoad:{duration:500, delay:100}}}
		containerComponent={<VictoryContainer responsive={false}/>}
		width={450}
		height={300}
		//padding={{top:0, bottom:0, left:60, right:40}}
		domainPadding={{x:[20,10], y:[10,10]}}
		>
		<VictoryLabel text={data[0].Sted} x={450/2} y={30} textAnchor="middle"/>
		<VictoryAxis 
			tickValues={data.map((e) => e.Aar)}
			tickLabelComponent={<VictoryLabel angle={90} verticalAnchor="middle" dx={10}/>}
			offsetY={50}
		/>
		<VictoryAxis dependentAxis 
			crossAxis={false}
		/>
		
		<VictoryStack
		>
		{props.stack.map((e, i) => 
			<VictoryBar data={data} x={props.x} y={e} key={e}
				dataComponent={<Bar style={{ width: "20", fill:colorScale[i] }} />}	
			/>
		)}
		</VictoryStack>
		<VictoryLine 
			data={data}
			x={props.x}
			y={props.line}
		/>
	</VictoryChart>	
		
	)
}
		
