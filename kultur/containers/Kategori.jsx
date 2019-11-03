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
		}
	}

	renderControls = () => {
		return(
			<Row style={{width: '50rem', margin: 'auto'}}>
				<Col sm={3}>
					<Picker
						names={['Kommune', 'Region', 'Fylke']}
						chosen={this.props.Gstate.inndeling}
						handleChange={ (inndeling) => this.props.setGstate({inndeling}) }
						title='Velg inndeling:'
						topTitle
					/>
				</Col>
				<Col sm={3}>
					<Picker
						names={this.state.dataStore.years}
						chosen={this.props.Gstate.years[0]}
						handleChange={ (years) => this.props.setGstate({years: [years]}) }
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
			percentLegend: varInfo ? reverse : true,
			years: this.props.Gstate.years,
			inndeling: this.props.Gstate.inndeling
		}

		let chartProps = {
			stack,
			sortby: variable,
			view: 'top',
			createControl: false,
			years: this.props.Gstate.years,
			dataStore: this.state.dataStore,
			n: 20,
			ytitle: varInfo ? varInfo.benevning : undefined,
			legendNames,
			noticks: varInfo ? reverse : true,
			inndeling: this.props.Gstate.inndeling
		}

		let infoText = this.state.variable == this.variables[0] ? null :
			<InfoText {...varInfo} />

			return(
				<Grid>
					<Row>
						<div className={styles.section}>
							<h3> 
								<img src={require('../data/logo/' + category.title.toLowerCase() + '.svg')} width='50px' style={{display: 'text'}} /> 
								<span style={{width: '20px', display: 'inline-block'}}></span>
								{ category.title } 
								<span style={{width: '70px', display: 'inline-block'}}></span>
								</h3>
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
							{this.state.variable == this.variables[0] 
								? <p style={{fontSize: '1rem'}}>Score tilsvarer omvendt rangering. Høyeste rangering vises med lengst strek, laveste rangering vises ikke.</p> 
								: null
							}
						</Col>
					</Row>
				</Grid>
			)
	}
}
