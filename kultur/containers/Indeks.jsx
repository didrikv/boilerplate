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
					<Picker
						names={this.state.dataStore.years}
						chosen={this.props.Gstate.years[0]}
						handleChange={ (years) => this.props.setGstate({years: [years]}) }
						title='Velg år:'
						justify='center'
					/>
				</Col>
			</Row>
		)
	}


	render() {
		let stack = categories.map( (e) => e.title)

		let mapProps = {
			name: 'Norsk Kulturindeks',
			createControl: false,
			variable: 'Kulturindeks Score',
			percentLegend: true,
			inndeling: this.props.Gstate.inndeling,
			years: this.props.Gstate.years
		}

		let chartProps = {
			stack,
			sortby: 'Kulturindeks Score',
			view: 'top',
			createControl: false,
			years: this.props.Gstate.years,
			dataStore: this.state.dataStore,
			n: 20,
			noticks: true,
			inndeling: this.props.Gstate.inndeling
		}

		return(
			<Grid>
				<Row>
					<div className={styles.section}>
						<h3>
							<img src={require('../data/logo/indeks.svg')} width='50px' />
							<span style={{width: '20px', display: 'inline-block'}}></span>
							Norsk Kulturindeks
							<span style={{width: '70px', display: 'inline-block'}}></span>
						</h3>
						<p>{text}</p>
					</div>
				</Row>
				<div style={{height: '30px'}}> </div>
				{this.renderControls()}
				<div style={{height: '30px'}}> </div>
				<Row>
					<Col sm={6} >
						<StaticNorwayMap {...this.state} {...mapProps} />
					</Col>
					<Col sm={6} >
						<HorizontalChart {...this.state} {...chartProps}/>
						<p style={{fontSize: '0.8rem'}}>Score tilsvarer omvendt rangering. Høyeste rangering vises med lengst strek.</p>
					</Col>
				</Row>
				<div style={{height: '100px'}}> </div>
			</Grid>
		)
	}
}

let text = "Norsk kulturindeks er en årlig oversikt over kulturtilbud og kulturaktivitet i norske kommuner, regioner og fylker. Indeksen er basert på registerdata fra en rekke offentlige etater, interesseorganisasjoner og foreninger. Målsetningen med Norsk kulturindeks er å beskrive det faktiske kulturtilbudet og den faktiske kulturbruken innenfor kommunen som geografisk område. Norsk kulturindeks 2019 er basert på data fra 2018. Under kan du velge rangering fra ulike år."
