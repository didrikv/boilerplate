import React from 'react'
import deepEqual from 'deep-equal'

import ChartWrapper from '../ChartWrapper/ChartWrapper.jsx'
import LineChartSvg from './LineChartSvg.jsx'

export default class LineChart extends React.Component {
	constructor(props) {
		super()
	}

	render() {
		return (
			<ChartWrapper name={this.props.name}>
				<LineChartSvg {...this.props}/>
			</ChartWrapper>
		)
	}
}

