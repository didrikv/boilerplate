import React from 'react'
import { VictoryChart, VictoryBar, VictoryLabel, VictoryStack, VictoryTheme, VictoryContainer, VictoryAxis, VictoryPortal, Bar} from 'victory'
import theme from "../data/VictoryTheme.js"

export default function HorizontalBarChart(props) {
	let data = props.data
	data.reverse()
	var colorScale=["red", "green", "blue", "orange"]
	console.log(VictoryTheme.material)
	let names = data.map((e) => e[props.x])
	return (
		<VictoryChart
		animate={{onLoad:{duration:500, delay:100}}}
		containerComponent={<VictoryContainer responsive={false}/>}
		width={450}
		height={300}
		domainPadding={{x:[0,0], y:[20,20]}}
		padding={{top:0, bottom:50, left:100}}
		theme={theme}
		>

		<VictoryAxis dependentAxis 
			tickFormat={(tick) => ""}
		/>
		
	
		<VictoryAxis 
			crossAxis={false}
		/>
		
	<VictoryStack horizontal={true} labels={names}
		labelComponent={<VictoryLabel x={90}/>}	
	>
		{props.stack.map((e, i) => 
			<VictoryBar data={data} x={props.x} y={e} key={e}
			/>
		)}
		</VictoryStack>

		</VictoryChart>
	)
}
