import React from 'react'
import categories from '../data/categories.json'
import allVariables from '../data/variables.json'
import styles from '../../components/TwoColumn/TwoColumn.css'
import Table from '../../components/Table/Table.jsx'
import {Row, Col, Grid} from 'react-bootstrap'
import StaticNorwayMap from '../../components/Map/StaticNorwayMap.jsx'
import Picker from '../../components/Picker/Picker.jsx'
import HorizontalChart from '../../components/HorizontalChart/HorizontalChart.jsx'

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
			years: [2015]
		}
	}

	renderControls = () => {
		return(
			<div style={{width: '50rem', margin: 'auto', display: 'flex', justifyContent: 'space-between'}}>
				<div style={{flex: 1}}>
					<Picker
						names={['Kommune', 'Region', 'Fylke']}
						chosen={this.state.inndeling}
						handleChange={ (inndeling) => this.setState({inndeling}) }
						title='Velg inndeling:'
						topTitle
					/>
				</div>
				<div style={{flex: 0.5}}> </div>
				<div style={{flex: 1}}>
					<Picker
						names={this.state.dataStore.years}
						chosen={this.state.years[0]}
						handleChange={ (years) => this.setState({years: [years]}) }
						title='Velg år:'
						topTitle
					/>
				</div>
				<div style={{flex: 0.5}}> </div>
				<div style={{flex: 2}}>
					<Picker
						names={this.variables}
						chosen={this.state.variable}
						handleChange={ (variable) => this.setState({variable}) }
						boldFirst={true}
						title='Velg variabel:'
						topTitle
					/>
				</div>
			</div>
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
				<div style={{height: '30px'}}> </div>
				<Row>
					<div className={styles.section}>
						<h3 className={styles.header}> { category.title } </h3>
						<p className={styles.paragraph}> { category.text } </p>
					</div>
				</Row>
				<div style={{height: '30px'}}> </div>
				<Row>
					{this.renderControls()}
				</Row>
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
				<div style={{height: '100px'}}> </div>
			</Grid>
		)
	}
}
