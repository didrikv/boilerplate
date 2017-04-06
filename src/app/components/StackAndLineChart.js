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
		//<VictoryChart 
		//	theme={VictoryTheme.material}
		//	animate={{onLoad:{duration:500, delay:100}}}
		//	containerComponent={<VictoryContainer responsive={false}/>}
		//	width={700}
		//	height={600}
		//	//padding={{top:0, bottom:0, left:60, right:40}}
		//	domainPadding={{x:[220,10], y:[0,0]}}
		//>
		<svg 
			height={300}
			width={450}
			style={{border:"1px solid black"}}
		>
		<VictoryAxis 
			tickValues={data.map((e) => e.Aar)}
			tickLabelComponent={<VictoryLabel angle={90} verticalAnchor="middle" dx={9}/>}
			domainPadding={20}
		/>
		<VictoryAxis dependentAxis 
			domain={domain}
		/>
		<VictoryLine 
			data={data}
			x={props.x}
			y={props.line}
			domainPadding={20}
		/>
		
		<VictoryStack
			animate={{onLoad:{duration:500, delay:100}}}
			domainPadding={20}
		>
		{props.stack.map((e, i) => 
			<VictoryBar data={data} x={props.x} y={e} key={e}
				dataComponent={<Bar style={{ width: "20", fill:colorScale[i] }} />}	
			/>
		)}
		</VictoryStack>
		</svg>
	//</VictoryChart>	
		
	)
}
		
