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
		let {data, years, createDataObject} = props.dataStore

		let tempData = []
		years.forEach( (year) => {
			tempData = tempData.concat( createDataObject(data, year))
		})
		this.data = tempData
		this.years = [... new Set(tempData.map( (e)  => e.År[0]))]


		this.state = {
			knr: 821,
			variable: 'Kunstnertetthet',
			year: 2015
		}

		this.categories = categories.map( (e) => e.title)
		this.lineData = this.createLineData(this.state.knr)
		this.polarData = this.createPolarData(this.state.knr, this.state.year, this.categories)
		
		this.state.sections = categories.map( (e) => ({
			name: e.title,
			subnames: e.variables.filter( (v) => 
				!variables.find( (s) => s.id == v).reverse)
		}))

		this.state.list = createDataObject(data, 2015)
			.filter( (e) => e.Inndeling == 'Kommune')
			.map( (e) => ({ Nr: e.Nr, Navn: e.Navn}))
	}


	createLineData = (knr) => {
		let fnr = Math.floor(knr/100)
		let dataobj = this.data.filter( (e) => [0, fnr, knr].includes(e.Nr) )
		if(knr == 301) {
			dataobj = dataobj.filter( (e) => !(e.Inndeling == "Fylke"))
		}
		dataobj = dataobj.map( (e) => ({...e, År: String(e.År)}) )
		return dataobj
	}

	createPolarData = (knr, year, variables) => {
		let obs = this.data.filter( (e) => e.Nr == knr && e.År == year)[0]
		let newData = []
		variables.forEach( (variable) => {	
			newData.push({
				x: variable + ' ' + obs[variable +  ' Rank'],
				value: obs[variable]
			})
		})
		let rank = obs['Kulturindeks']
		return [newData, rank]
	}

	componentWillUpdate = (nextProps, nextState) => {
		if(this.state.knr != nextState.knr) {
			this.lineData = this.createLineData(nextState.knr)
			this.polarData = this.createPolarData(nextState.knr, nextState.year, this.categories)
		}
		if(this.state.year != nextState.year) {
			this.polarData = this.createPolarData(nextState.knr, nextState.year, this.categories)
		}
	}

	getlineChartName = () => {
		let tmp = variables.find( (e) => e.id == this.state.variable )
		return tmp.category + ': ' + tmp.id
	}

	getLineBenevning = () => {
		let tmp = variables.find( (e) => e.id == this.state.variable )
		return tmp.benevning
	}

	getPolarChartName = () => {
		let name = this.data.find( (e) => e.Nr == this.state.knr).Navn
		return 'Kulturindeks ' + name + ' ' + this.state.year
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
							names={this.state.list.map( (e) => e.Nr + ' ' +  e.Navn )}
							values={this.state.list.map( (e) => e.Nr )}
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
						<PolarChart
							bar
							data={this.polarData[0]}
							center={this.polarData[1]}
							x='x'
							variable='value'
							name={this.getPolarChartName()}
						/>
					</Col>
					<Col sm={6}>
						<SectionsPicker
							sections={this.state.sections}
							chosen={this.state.variable}
							handleChange={ (variable) => this.setState({variable}) }
							title='Velg variabel:'
							justify='center'
							width='300px'
						/>
						<div style={{height: '30px'}}> </div>
						<LineChart
							variable={this.state.variable}
							x='År'
							ytitle={this.getLineBenevning()}
							data={this.lineData}
							splitby={'Navn'}
							name={this.getlineChartName()}
						/>
					</Col>
				</Row>
			</Grid>
		)
	}
}
