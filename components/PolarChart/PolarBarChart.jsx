import React from 'react'
import {
	VictoryChart,
	VictoryLabel,
	VictoryPolarAxis,
	VictoryLine,
	VictoryPortal,
	VictoryBar,
	Line
} from 'victory'
import theme from './theme.js'

export default function PolarChartSvg(props) {
	let {data, x, variable, svgId, center} = props
	let width=540
	let height=400

	return(
		<div id={svgId}>
			<VictoryChart
				polar
				theme={theme}
				startAngle={90}
				padding={{ top: 20, bottom: 20, left: 0, right: 0}}
				endAngle={450}
				animate={{duration: 500, onLoad: {duration: 500} }}
				width={width}
				height={height}
			>

				<VictoryPolarAxis
					domain={[0,100]}
					dependentAxis
					style={{axis:{strokeWidth: 0} }}
					tickFormat={ (t) => ""}
				/>

				<VictoryPolarAxis
					labelPlacement='vertical'
				/>

				<VictoryBar
					data={data}
					x={x}
					y={variable}
					width={50}
				/>

				<VictoryLabel
					text={center}
					x={width/2}
					y={height/2}
					textAnchor='middle'
					style={{fontSize: 30, fill: '#90A4Ae'}}
				/>
			</VictoryChart>
		</div>
	)
}
