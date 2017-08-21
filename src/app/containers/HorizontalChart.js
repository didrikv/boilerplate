import React from 'react'
import deepEqual from 'deep-equal'

import ControlPanel from './ControlPanel.js'
import TopBottomHorizontalChart from "../components/TopBottomHorizontalChart.js"
import ChartWrapper from "./ChartWrapper.js"
import { data, years, createDataObject } from '../dataStore.js'


export default class HorizontalChart extends React.Component {
	constructor(props) {
		super()
		this.state = {...this.createInitialState(), ...props}
	}

	createInitialState = () => {
		let defaultState = {
			years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
			stack: ["Forventet Befolkningsvekst", "Bostedsattraktivitet", "Egenvekst Attraktivitet"],
			colorScale:["#9E9E9E", "#8BC34A", "#FFB74D"],
			sortby: "Samlet attraktivitet",
			inndeling: "Kommune",
			population: 1000,
			n: 10,
			view: "top",
			x: "Navn",
			createControl: true,
			hideControl: false

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
		let name = "Top 10 " + this.state.inndeling + " "
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
			selectPopulation: {
				names: ["All", ">1000", ">3000", ">10 000"],
				values: [0, 1000, 3000, 10000],
				value: this.state.population,
				handleChange: (population) => this.setState({population})
			},
			hide: this.state.hideControl
		}
		return <ControlPanel {...controls}/>
	}


	
	render() {
		let data = this.aggData.filter( (e) => e.Inndeling == this.state.inndeling)
		if(this.state.inndeling == "Kommune") {data = data.filter( (e) => e.Folketall >= this.state.population)}
		
		let controlPanel = this.state.createControl ? this.createControlPanel() : null

		return(
			<div>
			{controlPanel}
			<ChartWrapper name={this.generateName()}>	
				<TopBottomHorizontalChart 
					{...this.state}
					data={data} 
				/>
			</ChartWrapper>
			</div>
		)
	}
}
