import React from 'react'
import { 
	VictoryChart, 
	VictoryAxis, 
	VictoryLabel,
	VictoryScatter,
	VictoryContainer,
	VictoryTooltip,
	VictoryVoronoiContainer,
	VictoryZoomContainer
	} from 'victory'
import theme from "../data/VictoryTheme.js"

export default function ScatterPlot(props) {
	let data = props.data
	let vanligData = data.filter( (e) => e.zIndex == 0)
	let selectData = data.filter( (e) => e.zIndex == 1)
	
	let style={fontSize:"12px", fontFamily:"Arial", fill: "grey"} 
	let labelstyle={fontSize:"16px", fontFamily:"Arial", fill: "grey"} 

	function label(data) {
		if(data.zIndex > 0) {return data.Navn}
		else {return ""}
	}

	return (
		<VictoryChart 
			width={450}
			height={300}
			domainPadding={{x:[10,10], y:[10,10]}}
			theme={theme}
			containerComponent={ <VictoryVoronoiContainer /> }
		>


		<VictoryAxis
			style={{ticks:{size:0}, grid:{stroke: "transparent"}}}
			tickLabelComponent={ <VictoryLabel y={255} style={style} /> }
			crossAxis={false}
			label="Attraktivitet"
			axisLabelComponent={ <VictoryLabel y={280} style={labelstyle}/> }
		/>

		<VictoryAxis dependentAxis
			style={{ticks:{size:0}, grid:{stroke: "transparent"}}}
			tickLabelComponent={ <VictoryLabel x={45} theme={theme} style={style} /> }
			axisLabelComponent={ <VictoryLabel x={20} style={labelstyle}/> }
			crossAxis={false}
			label="Struktur"
		/>

		<VictoryScatter 
			data={vanligData}
			x={props.x}
			y={props.y}

		/>
		<VictoryScatter 
			data={selectData}
			x={props.x}
			y={props.y}
			bubbleProperty="Folketall"
			maxBubbleSize={15}
			minBubbleSize={3}
			labelComponent={ <VictoryTooltip /> }

		/>

		</VictoryChart>
	)
}
