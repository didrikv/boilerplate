import React from 'react'
import deepEqual from 'deep-equal'
import PolarLineChart from './PolarLineChart.jsx'
import ChartWrapper from '../ChartWrapper/ChartWrapper.jsx'
import PolarBarChart from './PolarBarChart.jsx'

export default class PolarChart extends React.Component {
	constructor(props) {
		super()
	}

	render() {
		return(
			<ChartWrapper name={this.props.name}>
				{this.props.bar ? <PolarBarChart {...this.props}/> 
												: <PolarLineChart {...this.props}/> }
			</ChartWrapper>
		)
	}
}
