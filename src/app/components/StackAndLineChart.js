import React from 'react'
import {VictoryBar, 
	VictoryChart, 
	VictoryAxis, 
	VictoryTheme, 
	VictoryStack, 
	VictoryLine, 
	VictoryContainer,
	Bar,
	VictoryLabel,
	VictoryLegend,
	Line,
	VictoryTooltip,
	VictoryVoronoiContainer
	} from 'victory'
import theme from "../data/VictoryTheme.js"

class CustomTooltip extends React.Component {
  static defaultEvents = VictoryTooltip.defaultEvents
  render() {
    const {x, y} = this.props;
    return (
		<g>
        <VictoryTooltip {...this.props} renderInPortal={false}/>
		</g>
    );
  }
}

export default function StackAndLineChart(props){
	let data = props.data
	let legendData = props.stack.map( (e) => ({name:e, symbol: {type: "square"}}))
	legendData.push({name:props.line, symbol:{type:"diamond"}})
	let labels = data.map( (e) => `Rang Bostedsattraktivitet: ${e["Rang Bostedattraktivitet"]}`)
		
	return (
		<VictoryChart 
			theme={VictoryTheme.material}
			animate={{onLoad:{duration:100, delay:0}}}
			//containerComponent={<VictoryContainer responsive={false}/>}
			width={650}
			height={300}
			padding={{top:50, bottom:50, left:50, right:200}}
			domainPadding={{x:[20,10], y:[10,10]}}
			theme={theme}
		>

		<VictoryLegend 
			data={legendData}
			colorScale={props.colorScale}
			x={410}
			y={0}
		
		/>

		<VictoryLabel 
			text={data[0][props.label]} 
			x={450/2} 
			y={30} 
			textAnchor="middle"
		/>

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
			colorScale={props.colorScale}
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

		<VictoryLine 
			data={data}
			x={props.x}
			y={props.line}
			interpolation="natural"
		/>

	</VictoryChart>	
	)
}
