import React from 'react'
import variables from '../data/variables.json'
import Picker from '../../components/Picker/Picker.jsx'
import SectionsPicker from '../../components/Picker/SectionsPicker.jsx'
import LineChart from '../../components/LineChart/LineChart.jsx'
import {Grid, Row, Col} from 'react-bootstrap'
import categories from '../data/categories.json'
import PolarChart from '../../components/PolarChart/PolarChart.jsx'
import styles from '../../components/TwoColumn/TwoColumn.css'


export default class Kommuner extends React.Component {
	constructor(props) {
		super()
		let {data, years, createDataObject, allDataObject} = props.dataStore

		this.data = allDataObject
		this.years =	years 
		this.categories = categories.map( (e) => e.title)

		this.variables = categories.map( (e) => ({
			name: e.title,
			subnames: e.variables.filter( (v) => 
				!variables.find( (s) => s.id == v).reverse)
		}))

		this.knrs = createDataObject(data, 2015)
			.filter( (e) => e.Inndeling == 'Kommune')
			.map( (e) => ({ Nr: e.Nr, Navn: e.Navn}))

		this.state = {
			knr: 821,
			variable: 'Kunstnertetthet',
			year: 2015
		}

		this.lineData = this.createLineData(this.state.knr)
		this.polarData = this.createPolarData(this.state.knr, this.state.year)
	}

	createLineData = (knr) => {
		let fnr = Math.floor(knr/100)
		let data = this.data.filter( (e) => [0, fnr, knr].includes(e.Nr) )

		if(knr == 301) {
			data = data.filter( (e) => !(e.Inndeling == "Fylke"))
		}

		data = data.map( (e) => ({...e, År: String(e.År)}) )
		let variable = variables.find( (e) => e.id == this.state.variable )

		return {
			data,
			name: variable.category + ': ' + variable.id,
			unit: variable.benevning
		}
	}

	createPolarData = (knr, year) => {
		let obs = this.data.filter( (e) => e.Nr == knr && e.År == year)[0]

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
		if(this.state.knr != nextState.knr) {
			this.lineData = this.createLineData(nextState.knr)
			this.polarData = this.createPolarData(nextState.knr, nextState.year)
		}
		if(this.state.year != nextState.year) {
			this.polarData = this.createPolarData(nextState.knr, nextState.year)
		}
	}

	render() {
		return(
			<Grid>
				<div style={{height: '30px'}}> </div>
				<Row>
					<Col>
						<div className={styles.section}>
							<h3 className={styles.header}> Kommuner</h3>
							<p className={styles.paragraph}> 
								Lorem ipsum dolor sit amet, veniam epicuri dissentiunt id nam, aperiri deleniti per at. Duis elitr alienum sed an, habeo dolores suavitate his ex, sumo delenit epicurei no pro. Maluisset consectetuer ius eu, natum debitis ei ius, viderer comprehensam definitionem vix id. Sit sonet utamur ut. Iudico mollis accusata vim ea, eu duo veri primis detracto. Stet populo tincidunt et mel, quo ignota placerat te, et vel vidit epicurei assueverit. Mentitum hendrerit vel ex, his labore quaestio id.	
							</p>
						</div>
						<div style={{maxWidth: '50rem', margin: 'auto'}}>
							<Picker
								names={this.knrs.map( (e) => e.Nr + ' ' +  e.Navn )}
								values={this.knrs.map( (e) => e.Nr )}
								chosen={this.state.knr}
								handleChange={ (knr) => this.setState({knr}) }
								title='Velg kommune:'
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
							data={this.polarData.data}
							variable='value'
							x='x'
							center={this.polarData.center}
							name={this.polarData.name}
						/>
					</Col>
					<Col sm={6}>
						<SectionsPicker
							sections={this.variables}
							chosen={this.state.variable}
							handleChange={ (variable) => this.setState({variable}) }
							title='Velg variabel:'
							justify='center'
							width='300px'
						/>
						<div style={{height: '30px'}}> </div>
						<LineChart
							data={this.lineData.data}
							variable={this.state.variable}
							x='År'
							splitby={'Navn'}
							name={this.lineData.name}
							ytitle={this.lineData.unit}
						/>
					</Col>
				</Row>
			</Grid>
		)
	}
}
