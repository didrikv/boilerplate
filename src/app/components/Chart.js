import React from 'react'
import {VictoryBar, 
	VictoryChart, 
	VictoryAxis, 
	VictoryTheme, 
	VictoryStack, 
	VictoryLine, 
	VictoryLabel,
	VictoryContainer} from 'victory'

export default class Chart extends React.Component {
	render(){
		return(
			<svg
			width={450}
			height={300}
			style={{border: "1px solid black"}}
			>
			<VictoryAxis
			tickLabelComponent={<VictoryLabel angle={90} />}
			/>	
			<VictoryLabel text="Fuck" x={30} y={30} angle={90}/>
			<VictoryBar/>
		</svg>
		)
	}

}

