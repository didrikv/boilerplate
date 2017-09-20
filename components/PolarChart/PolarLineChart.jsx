import React from 'react'
import {
	VictoryChart,
	VictoryLabel,
	VictoryPolarAxis,
	VictoryLine,
	VictoryPortal,
	Line
} from 'victory'
import theme from './theme.js'

export default function PolarLineChart(props) {
	let {data, x, variable, svgId} = props

	return(
		<div id={svgId}>
			<VictoryChart
				polar
				theme={theme}
				startAngle={90}
				padding={{ top: 20, bottom: 20, left: 0, right: 0}}
				endAngle={450}
				animate={{duration: 500, onLoad: {duration: 500} }}
				width={540}
				height={400}
			>
				<VictoryPolarAxis
					dependentAxis
					labelPlacement='vertical'
					domain={[0,100]}
					axisAngle={270}
					style={{axis:{strokeWidth: 0} }}
					tickLabelComponent={<VictoryLabel dy={-5}/>}
				/>

				<VictoryPolarAxis
					labelPlacement='vertical'
				/>

				<VictoryLine 
					data={data}
					x={x}
					y={variable}
				/>
			</VictoryChart>
		</div>
	)
}
