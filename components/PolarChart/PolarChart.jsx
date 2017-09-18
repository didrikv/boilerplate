import React from 'react'
import deepEqual from 'deep-equal'
import PolarChartSvg from './PolarChartSvg.jsx'
import ChartWrapper from '../ChartWrapper/ChartWrapper.jsx'
import PolarBarChart from './PolarBarChart.jsx'


export default class PolarChart extends React.Component {
	constructor(props) {
		super()
	}

	renderChart = () => {
		if(this.props.bar) {
			return <PolarBarChart {...this.props} />
		} else {
			return <PolarChartSvg {...this.props} />
		}
	}

	render() {
		return(
			<ChartWrapper name={this.props.name}>
				{this.renderChart()}
			</ChartWrapper>
		)
	}
}
