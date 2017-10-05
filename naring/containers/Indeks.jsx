import React from 'react'
import categories from '../data/categories.json'
import allVariables from '../data/variables.json'
import {Row, Col, Grid} from 'react-bootstrap'
import StaticNorwayMap from '../../components/Map/StaticNorwayMap.jsx'
import Picker from '../../components/Picker/Picker.jsx'
import MultiSelect from '../../components/MultiSelect/MultiSelectSmall.jsx'
import HorizontalChart from '../../components/HorizontalChart/HorizontalChart.jsx'
import styles from './App.css'


export default class Indeks extends React.Component {
	constructor(props) {
		super()

		this.state = {
			...props,
		}
	}

	renderControls = () => {
		return(
			<Row style={{width: '50rem', margin: 'auto'}}>
				<Col sm={6}>
					<Picker
						names={['Kommune', 'Region', 'Fylke']}
						chosen={this.props.Gstate.inndeling}
						handleChange={ (inndeling) => this.props.setGstate({inndeling}) }
						title='Velg inndeling:'
						justify='center'
					/>
				</Col>
				<Col sm={6}>
					<MultiSelect
						names={this.state.dataStore.years}
						chosen={this.props.Gstate.years}
						handleChange={ (years) => this.props.setGstate({years}) }
						title='Velg år:'
						justify='center'
					/>
				</Col>
			</Row>
		)
	}




	render() {
		let stack = categories.map( (e) => e.title + ' Indeks')
		let legendNames = categories.map( (e) => e.title)

		let mapProps = {
			createControl: false,
			variable: 'Næringsindeks',
			percentLegend: true,
			inndeling: this.props.Gstate.inndeling,
			years: this.props.Gstate.years
		}

		let chartProps = {
			stack,
			sortby: 'Næringsindeks',
			view: 'top',
			createControl: false,
			years: this.props.Gstate.years,
			dataStore: this.state.dataStore,
			n: 20,
			legendNames,
			noticks: true,
			inndeling: this.props.Gstate.inndeling
		}

		return(
			<Grid>
				<Row>
					<div className={styles.section}>
						<h3 > Næringsindeks </h3>
						<p >{text}</p>
					</div>
				</Row>
				<div style={{height: '30px'}}> </div>
				{this.renderControls()}
				<Row>
				</Row>
				<div style={{height: '30px'}}> </div>
				<Row>
					<Col sm={6} >
						<StaticNorwayMap {...this.state} {...mapProps} />
					</Col>
					<Col sm={6} >
						<HorizontalChart {...this.state} {...chartProps} />
					</Col>
				</Row>
			</Grid>
		)
	}
}

let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
