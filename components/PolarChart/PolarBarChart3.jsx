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
				padding={{ top: 20, bottom: 20, left: 0, right: 0}}
				width={width}
				height={height}
			>

				<VictoryBar
					style={{
						data:{
							fill: 'green',
							opacity: 0.7
						}
					}}
					/>

			</VictoryChart>
		</div>
	)
}
