import React from 'react'
import {
	VictoryChart,
	VictoryLabel,
	VictoryPolarAxis,
	VictoryLine,
	VictoryTheme,
	VictoryPortal,
	VictoryBar,
	Line
} from 'victory'
import theme from '../LineChart/VictoryTheme.js'

export default function PolarChartSvg(props) {
	let {data, x, variable, svgId, center} = props
	let width=520
	let height=400
	console.log(VictoryTheme.material)

	return(
		<div id={svgId}>
			<VictoryChart
				polar
				theme={VictoryTheme.material}
				startAngle={90}
				padding={{ top: 20, bottom: 20, left: 0, right: 0}}
				endAngle={450}
				animate={{
							duration: 500, 
							onLoad: {duration: 500}, 
						}}
				width={width}
				height={height}
			>

				<VictoryPolarAxis
					dependentAxis
					labelPlacement='vertical'
					domain={[0,100]}
					axisAngle={270}
					style={{
						axis:{
							strokeWidth: 0},
						grid: {
							strokeDasharray: null},
							ticks: {
								size:0},
							tickLabels: {
								fontSize: 10,
								fill: '#90A4AE'}
					}}
					tickLabelComponent={
						<VictoryLabel dy={-5}/>
					}
					tickFormat={ (t) => ""}
				/>
				<VictoryPolarAxis
					labelPlacement='vertical'

					style={{
						tickLabels:{
							fontSize: 12},
						grid:{
							strokeDasharray: null,
						},
							ticks:{
								size:0}
					}}
				/>
				<VictoryBar
					data={data}
					x={x}
					y={variable}
					style={{
						data:{
							opacity: 0.7,
							fill: "DCE77F",
							stroke: 'DCE77F',
							strokeWidth: 1
						}
					}}
					/>
				<VictoryLabel
					text={center}
					x={width/2}
					y={height/2}
					textAnchor='middle'
					style={{
						fontSize: 30,
						fill: '90A4Ae'
					}}
						
				/>

			</VictoryChart>
		</div>
	)
}
