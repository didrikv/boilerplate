import React from 'react'
import {
	VictoryChart,
	VictoryLine,
	VictoryLegend,
	VictoryGroup,
	VictoryAxis,
	VictoryLabel,
	VictoryScatter,
} from 'victory'
import theme from './theme.js'

export default function LineChartSvg(props) {
	let {data, x, variable, splitby, svgId, ytitle} = props
	let stack = [ ... new Set(data.map( (e) => e[splitby])) ]

	data = data.filter( (e) => !(e[variable] === "") )
	let  xarray = [ ... new Set(data.map( (e) => e[x]) ) ]

	let min = Math.min( ...data.map((e) => e[variable]))
	let max = Math.max( ...data.map((e) => e[variable]))

	let renderLines = () => {
		if(splitby) {
			let vlines = stack.map( (cat) =>
				<VictoryLine
					data={data.filter( (e) => e[splitby] == cat)}
					y={variable}
					x={x}
				/>
			)
			let vpoints = stack.map( (cat,i) => 
				<VictoryScatter
					data={data.filter( (e) => e[splitby] == cat)}
					y={variable}
					x={x}
					style={{data: {fill:theme.stack.colorScale[i]}}}
					size={5}
				/>
			)
			return(
				<VictoryGroup>
					{vlines}
					{vpoints}
				</VictoryGroup>
			)
		} else {
			return (
				<VictoryGroup>
					<VictoryLine
						data={data}
						y={variable}
						x={x}
					/>
					<VictoryScatter
						data={data}
						y={variable}
						x={x}
						style={{data: {fill:theme.stack.colorScale[0]}}}
						size={5}
					/>
				</VictoryGroup>
			)
		}
	}

	let legend =  splitby ? 
		<VictoryLegend 
			data={stack.map( (e) => ({name: e})) }
			orientation='horizontal'
			x={80}
			y={5}
			gutter={10}
			symbolSpacer={5}
		/> 
		: null

	return (
		<div id={svgId} key={stack.length + ' ' + xarray.length}>
			<VictoryChart
				theme={theme}
				domain={{y: [Math.min(0, min), max]}}
				domainPadding={{x:[0,20], y:[0,20]}}
				padding={{top: 30, bottom: 30, left:70, right: 50}}
				height={350}
				width={600}
				animate={{duration: 300, onLoad: {duration: 200} }}
			>
				{legend}
				<VictoryAxis
					tickValues={xarray.map( (e,i) => i+1 )}
					tickFormat={xarray.map( (e) => e)}
					style={{grid: {stroke: 'none'}}}
				/>
				<VictoryAxis dependentAxis 
					label={ytitle}
					axisLabelComponent={
						<VictoryLabel x={18}/>
					}
					tickFormat={ (tick) => tick >= 1000 ? Math.round(tick/100)/10 + 'k' : tick}
				/>
				{renderLines()}
			</VictoryChart>
		</div>
	)
}
