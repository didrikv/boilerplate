import React from 'react'
import {
	VictoryChart,
	VictoryLabel,
	VictoryPolarAxis,
	VictoryLine,
	VictoryTheme,
	VictoryPortal,
	Line
} from 'victory'
import theme from '../LineChart/VictoryTheme.js'

export default function PolarChartSvg(props) {
	let {data, x, variable, svgId} = props

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
				width={500}
				height={400}
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
				/>
				<VictoryPolarAxis
					labelPlacement='vertical'

					style={{
						tickLabels:{
							fontSize: 10},
						grid:{
							strokeDasharray: null,
						},
							ticks:{
								size:0}
					}}
				/>
				<VictoryLine 
					data={data}
					x={x}
					y={variable}
					style={{
						data:{
							stroke:"90A4AE",
							fill: "DCE77f",
							opacity: 0.5
						}}}
					/>

			</VictoryChart>
		</div>
	)
}
