import React from 'react'
import categories from '../data/categories.json'
import allVariables from '../data/variables.json'
import {Row, Col, Grid} from 'react-bootstrap'
import StaticNorwayMap from '../../components/Map/StaticNorwayMap.jsx'
import Picker from '../../components/Picker/Picker.jsx'
import HorizontalChart from '../../components/HorizontalChart/HorizontalChart.jsx'
import styles from './App.css'
import MultiSelect from '../../components/MultiSelect/MultiSelectSmall.jsx'


export default class Kategori extends React.Component {
	constructor(props) {
		super()
		let {i} = props
		this.variables = categories[i].variables.slice()
		this.variables.unshift(categories[i].title + ' Indeks')

		this.state = {
			...props,
			variable: categories[i].title + ' Indeks',
			inndeling: 'Kommune',
			years: [2016]
		}
	}

	renderControls = () => {
		return(
			<Row style={{width: '50rem', margin: 'auto'}}>
				<Col sm={3}>
					<Picker
						names={['Kommune', 'Region', 'Fylke']}
						chosen={this.state.inndeling}
						handleChange={ (inndeling) => this.setState({inndeling}) }
						title='Velg inndeling:'
						topTitle
					/>
				</Col>
				<Col sm={3}>
					<MultiSelect
						names={this.state.dataStore.years}
						chosen={this.state.years}
						handleChange={ (years) => this.setState({years}) }
						title='Velg år'
						topTitle
					/>
				</Col>
				<Col sm={6}>
					<Picker
						names={this.variables}
						chosen={this.state.variable}
						handleChange={ (variable) => this.setState({variable}) }
						boldFirst={true}
						title='Velg variabel:'
						topTitle
					/>
				</Col>
			</Row>
		)
	}




	render() {
		let variable = this.state.variable
		let category = categories[this.state.i]

		let varInfo = allVariables.find( (e) => e.id == variable)

		if(variable == category.title + ' Indeks') {
			var stack = category.variables.map( (e) => e + ' Score')
		} else {
			var legendNames= [variable]
			var stack = [variable]
		}

		let getVarTitle = () => {
			if(varInfo) {
				return varInfo.title
			} else {
				return 'Samlet indeks for ' + category.title
			}
		}

		let mapProps = {
			createControl: false,
			variable,
			percentLegend: varInfo ? false : true
		}

		let chartProps = {
			stack,
			sortby: variable,
			view: 'top',
			createControl: false,
			years: this.state.years,
			dataStore: this.state.dataStore,
			n: 20,
			legendNames,
			noticks: varInfo ? false : true,
			ytitle: getVarTitle()
		}

		return(
			<Grid>
				<Row>
					<Col sm={12}>
						<div className={styles.section}>
							<h3 > { category.title } </h3>
							<p > { category.text } </p>
						</div>
					</Col>
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
						<HorizontalChart {...this.state} {...chartProps} unit={getVarTitle()}/>
					</Col>
				</Row>
			</Grid>
		)
	}
}
