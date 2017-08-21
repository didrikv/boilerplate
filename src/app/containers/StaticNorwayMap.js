import React from 'react'
import deepEqual from 'deep-equal'

import ControlPanel from './ControlPanel.js'
import NorwayMap from './NorwayMap.js'
import ChartWrapper from '../containers/ChartWrapper.js'
import { data, years, createDataObject } from '../dataStore.js'

export default class StaticNorwayMap extends React.Component {
	constructor(props) {
		super()
		this.state = {...this.createInitialState(), ...props}
	}

	createInitialState = () => {
		let defaultState = {
			years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
			inndeling: "Kommune",
			createControl: true,
			hideControl: false,
			variable: "Bostedsattraktivitet",
			options: ["Fødselsoverskudd", "Forventet Flytting", "Bostedsattraktivitet"],
		}

		return {...defaultState, ...this.props}
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({...this.state, ...nextProps})
	}

	componentWillUpdate = (nextProps, nextState) => {
		if(!deepEqual(nextState.years, this.state.years)) {
			this.aggData = createDataObject(data, nextState.years)			
		}
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		let should = !deepEqual(this.state, nextState)
		return should
	}

	componentWillMount = () => {
		this.aggData = createDataObject(data, this.state.years)
	}

	generateName = () => {
		let years = this.state.years
		let name = this.state.variable + " "
		name += years.length == 1 ? years[0] : years[0] + "-" + years[years.length-1]
		return name
	}

	createControlPanel = () => {
		let controls = {
			selectYears: {
				names: years,
				chosen: this.state.years,
				handleChange: (years) => this.setState({years})
			},
			selectInndeling: {
				names: ["Kommune", "Region", "Fylke"],
				value: this.state.inndeling,
				handleChange: (inndeling) => this.setState({inndeling})
			},
			selectVariable: {
				names: this.state.options,
				value: this.state.variable,
				handleChange: (variable) => this.setState({variable})
			},
			hide: this.state.hideControl
		}
		return <ControlPanel {...controls}/>
	}

	

	render =() => {
		let data = this.aggData.filter( (e) => e.Inndeling == this.state.inndeling)
		let dataobj = {}
		data.forEach( (e) => {
			dataobj[e["Nr"]] = e[this.state.variable]
		})
		let controlPanel = this.state.createControl ? this.createControlPanel() : null
		
		return(
			<div>
			{controlPanel}
			<ChartWrapper name={this.generateName()}>
				<NorwayMap 
					{...this.state} 
					data={dataobj} 
				/>
			</ChartWrapper>
			</div>
		)
	}
}

