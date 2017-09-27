import React from 'react'
import variables from '../data/variables.json'
import Picker from '../../components/Picker/Picker.jsx'
import LineChart from '../../components/LineChart/LineChart.jsx'
import {Grid, Row, Col} from 'react-bootstrap'
import categories from '../data/categories.json'
import PolarChart from '../../components/PolarChart/PolarChart.jsx'
import styles from '../../components/TwoColumn/TwoColumn.css'


export default class Steder extends React.Component {
	constructor(props) {
		super()
		let {data, years, createDataObject, allDataObject} = props.dataStore

		this.data = allDataObject
		this.years =	years 
		this.categories = categories.map( (e) => e.title)
		this.inndeling = props.inndeling

		this.variables = categories.map( (e) => ({
			name: e.title,
			subnames: e.variables.filter( (v) => 
				!variables.find( (s) => s.id == v).reverse)
		}))

		this.places = createDataObject(data, 2015)
			.filter( (e) => e.Inndeling == this.inndeling)
			.map( (e) => ({ Nr: e.Nr, Navn: e.Navn}))

		this.state = {
			nr: this.places[0].Nr,
			variable: 'Kunstnertetthet',
			year: 2015
		}

		this.lineData = this.createLineData(this.state.nr)
		this.polarData = this.createPolarData(this.state.nr, this.state.year)
	}

	createLineData = (nr) => {
		if(this.inndeling == 'Kommune') {
			let fnr = Math.floor(nr/100)
			var data = this.data.filter( (e) => [0, fnr, nr].includes(e.Nr) )
			if(nr == 301) {data = data.filter( (e) => !(e.Inndeling == "Fylke") )}
		} else {
			var data = this.data.filter( (e) => [0, nr].includes(e.Nr) )
		}

		data = data.map( (e) => ({...e, År: String(e.År)}) )
		let variable = variables.find( (e) => e.id == this.state.variable )

		return {
			data,
			name: variable.category + ': ' + variable.id,
			unit: variable.benevning
		}
	}

	createPolarData = (nr, year) => {
		let obs = this.data.filter( (e) => e.Nr == nr && e.År == year)[0]

		let data = this.categories.map( (variable) => ({
			x: variable + ' (' + obs[variable +  ' Rank'] + ')',
			value: obs[variable]
		}))

		return {
			data,
			center: obs['Kulturindeks'],
			name: 'Kulturindeks ' + obs.Navn + ' ' + year
		}
	}

	componentWillUpdate = (nextProps, nextState) => {
		if(this.state.nr != nextState.nr) {
			this.lineData = this.createLineData(nextState.nr)
			this.polarData = this.createPolarData(nextState.nr, nextState.year)
		}
		if(this.state.year != nextState.year) {
			this.polarData = this.createPolarData(nextState.nr, nextState.year)
		}
	}

	getLineName = () => {
		let variable = variables.find( (e) => e.id == this.state.variable )
		return ({
			name: variable.category + ': ' + variable.id,
			unit: variable.benevning
		})
	}


	render() {
		let lineNames = this.getLineName()
		return(
			<Grid>
				<div style={{height: '30px'}}> </div>
				<Row>
					<Col>
						<div className={styles.section}>
							<h3 className={styles.header}> {sted[this.inndeling].plural} </h3>
							<p className={styles.paragraph}> 
								{sted[this.inndeling].text}
							</p>
						</div>
						<div style={{maxWidth: '50rem', margin: 'auto'}}>
							<Picker
								names={this.inndeling == "Kommune"
									? this.places.map( (e) => e.Nr + ' ' +  e.Navn )
									: this.places.map( (e) => e.Navn)}
								values={this.places.map( (e) => e.Nr )}
								chosen={this.state.nr}
								handleChange={ (nr) => this.setState({nr}) }
								title={'Velg ' + this.inndeling.toLowerCase() + ':'}
								justify='center'
								width='200px'
							/>
						</div>
						<div style={{maxWidth: '50rem', margin: 'auto'}}>
						</div>
					</Col>
					<div style={{height: '30px'}}> </div>
					<Col sm={6}>
						<Picker
							names={this.years}
							chosen={this.state.year}
							handleChange={ (year) => this.setState({year}) }
							title='Velg år:'
							justify='center'
							width='100px'
						/>
						<div style={{height: '30px'}}> </div>
						<PolarChart bar
							width={550}
							data={this.polarData.data}
							variable='value'
							x='x'
							center={this.polarData.center}
							name={this.polarData.name}
						/>
					</Col>
					<Col sm={6}>
						<Picker
							sections={this.variables}
							chosen={this.state.variable}
							handleChange={ (variable) => this.setState({variable}) }
							title='Velg variabel:'
							justify='center'
							width='300px'
						/>
						<div style={{height: '30px'}}> </div>
						<LineChart showZero
							data={this.lineData.data}
							variable={this.state.variable}
							x='År'
							splitby={'Navn'}
							name={lineNames.name}
							ytitle={lineNames.unit}
						/>
					</Col>
				</Row>
			</Grid>
		)
	}
}

const sted = {
	Kommune:{
		plural: 'Kommuner',
		text: 'Lorem ipsum dolor sit amet, veniam epicuri dissentiunt id nam, aperiri deleniti per at. Duis elitr alienum sed an, habeo dolores suavitate his ex, sumo delenit epicurei no pro. Maluisset consectetuer ius eu, natum debitis ei ius, viderer comprehensam definitionem vix id. Sit sonet utamur ut. Iudico mollis accusata vim ea, eu duo veri primis detracto. Stet populo tincidunt et mel, quo ignota placerat te, et vel vidit epicurei assueverit. Mentitum hendrerit vel ex, his labore quaestio id.'
	},
	Region: {
		plural: 'Regioner',
		text: 'Lorem ipsum dolor sit amet, veniam epicuri dissentiunt id nam, aperiri deleniti per at. Duis elitr alienum sed an, habeo dolores suavitate his ex, sumo delenit epicurei no pro. Maluisset consectetuer ius eu, natum debitis ei ius, viderer comprehensam definitionem vix id. Sit sonet utamur ut. Iudico mollis accusata vim ea, eu duo veri primis detracto. Stet populo tincidunt et mel, quo ignota placerat te, et vel vidit epicurei assueverit. Mentitum hendrerit vel ex, his labore quaestio id.'
	},
	Fylke: {
		plural: 'Fylker',
		text: 'Lorem ipsum dolor sit amet, veniam epicuri dissentiunt id nam, aperiri deleniti per at. Duis elitr alienum sed an, habeo dolores suavitate his ex, sumo delenit epicurei no pro. Maluisset consectetuer ius eu, natum debitis ei ius, viderer comprehensam definitionem vix id. Sit sonet utamur ut. Iudico mollis accusata vim ea, eu duo veri primis detracto. Stet populo tincidunt et mel, quo ignota placerat te, et vel vidit epicurei assueverit. Mentitum hendrerit vel ex, his labore quaestio id.'
	}
}


