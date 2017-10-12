import React from 'react'
import categories from '../data/categories.json'
import allVariables from '../data/variables.json'
import styles from './App.css'
import {Row, Col, Grid} from 'react-bootstrap'
import StaticNorwayMap from '../../components/Map/StaticNorwayMap.jsx'
import Picker from '../../components/Picker/Picker.jsx'
import HorizontalChart from '../../components/HorizontalChart/HorizontalChart.jsx'
import InfoText from './InfoText.jsx'
import InfoText2 from './InfoText2.jsx'

export default class Kategori extends React.Component {
	constructor(props) {
		super()
		let {i} = props
		this.variables = categories[i].variables.slice()
		this.variables.unshift(categories[i].title)

		this.state = {
			...props,
			variable: categories[i].title,
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
					<Picker
						names={this.state.dataStore.years}
						chosen={this.state.years[0]}
						handleChange={ (years) => this.setState({years: [years]}) }
						title='Velg år:'
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
		let reverse = varInfo ? varInfo.reverse : undefined

		if(variable == category.title) {
			var stack = category.variables.map( (e) => e + ' Score')
		} else {
			var legendNames= [variable]
			variable = reverse ? variable+' Score' : variable
			var stack = [variable]
		}

		let mapProps = {
			name: reverse ? this.state.variable : variable, 
			createControl: false,
			variable,
			percentLegend: varInfo ? reverse : true
		}

		let chartProps = {
			stack,
			sortby: variable,
			view: 'top',
			createControl: false,
			years: this.state.years,
			dataStore: this.state.dataStore,
			n: 20,
			ytitle: varInfo ? varInfo.benevning : undefined,
			legendNames,
			noticks: varInfo ? reverse : true
		}

		let infoText = this.state.variable == this.variables[0] ? null :
			<InfoText {...varInfo} />

			return(
				<Grid>
					<Row>
						<div className={styles.section}>
							<h3> { category.title } </h3>
							<p> { category.text } </p>
						</div>
					</Row>
					<div style={{height: '30px'}}> </div>
					{this.renderControls()}
					<div style={{height: '30px'}}> </div>
					<Row>
						<div style={{maxWidth: "50rem", margin: 'auto'}}>
							{infoText}
						</div>
					</Row>
					<div style={{height: '30px'}}> </div>
					<Row>
						<Col sm={6} >
							<StaticNorwayMap {...this.state} {...mapProps} />
						</Col>
						<Col sm={6} >
							<HorizontalChart {...this.state} {...chartProps}/>
						</Col>
					</Row>
				</Grid>
			)
	}
}
