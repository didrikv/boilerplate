import React from 'react'
import { 
	VictoryChart, 
	VictoryAxis, 
	VictoryLabel,
	VictoryScatter,
	VictoryContainer
	} from 'victory'
import theme from "../data/VictoryTheme.js"

export default function ScatterPlot(props) {
	let data = props.data

	return (
		<VictoryChart 
			animate={{onLoad:{duration:500, delay:100}}}
			containerComponent={<VictoryContainer responsive={false}/>}
			width={450}
			height={300}
			//padding={{top:0, bottom:0, left:60, right:40}}
			domainPadding={{x:[20,10], y:[10,10]}}
			theme={theme}
		>

		<VictoryScatter 
			data={data}
			x="Egenvekst"
			y="Nettoinnflytting"
		/>

		</VictoryChart>
	)
}
