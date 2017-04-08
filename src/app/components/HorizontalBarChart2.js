import React from 'react'
import { VictoryChart, VictoryBar, VictoryLabel, VictoryStack, VictoryTheme, VictoryContainer, VictoryAxis, VictoryPortal, Bar} from 'victory'

export default function HorizontalBarChart(props) {
	let data = props.data
	data.reverse()
	console.log(props.data)
	var colorScale=["red", "green", "blue", "orange"]
	return (
		<VictoryChart padding={[50,0,0,0]} style={{border: "1px solid black"}}>

		<VictoryAxis dependentAxis 
			tickFormat={(tick) => data[tick-1][props.x]}
			offsetX={50}
		/>
		
	
		<VictoryAxis 
			crossAxis={false}
			
		/>
		
	<VictoryStack horizontal={true}
		standalone={false}
	>
		{props.stack.map((e, i) => 
			<VictoryBar data={data} x={props.x} y={e} key={e}
				dataComponent={<Bar style={{ width: "20", fill:colorScale[i] }} />}	
			/>
		)}
		</VictoryStack>
		</VictoryChart>

	)
}
