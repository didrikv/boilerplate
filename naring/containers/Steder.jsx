import React from 'react'
import variables from '../data/variables.json'
import Picker from '../../components/Picker/Picker.jsx'
import Multiselect from '../../components/MultiSelect/MultiSelectSmall.jsx'
import LineChart from '../../components/LineChart/LineChart.jsx'
import {Grid, Row, Col} from 'react-bootstrap'
import categories from '../data/categories.json'
import PolarChart from '../../components/PolarChart/PolarChart.jsx'
import styles from './App.css'
import deepEqual from 'deep-equal'


export default class Steder extends React.Component {
	constructor(props) {
		super()
		let {data, years, createDataObject, allDataObject, createDataObjectRank} = props.dataStore
		
		this.rawData = data
		this.createDataObjectRank = createDataObjectRank
		this.data = allDataObject
		this.years =	years 
		this.categories = categories.map( (e) => e.title)
		this.inndeling = props.inndeling

		this.maxRank = this.inndeling == "Fylke" ? 19 :
			this.inndeling == "Region" ? 86 : 428

		this.variables = categories.map( (e) => ({
			name: e.title,
			subnames: e.variables
		}))

		this.variables.unshift({
			name: 'Næringsindeks',
			subnames: [
				'Næringsindeks',
				'Næringsindeks Rank'
			]
		})

		this.places = createDataObject(data, 2015)
			.filter( (e) => e.Inndeling == this.inndeling)
			.map( (e) => ({ Nr: e.Nr, Navn: e.Navn}))

		this.state = {
			nr: this.places[0].Nr,
			variable: 'Produktivitet',
			year: [2015]
		}

		this.dataObj = createDataObjectRank(data, this.state.year) 

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

		return data
	}

	filterLineData = () => {
		let data = this.lineData
		if(this.state.variable == "Næringsindeks" || this.state.variable == "Næringsindeks Rank") {
			data = data.filter( (e) => e.Inndeling == this.props.inndeling)
			var domain = this.state.variable == "Næringsindeks" ? [0, 100] : [1, this.maxRank]
			var reverse = this.state.variable == "Næringsindeks Rank" ? true : false
		}
		return{
			data,
			domain,
			reverse
		}
	}


	createPolarData = (nr, years) => {

		let obs = this.dataObj.filter((e) => e.Nr == nr)[0]
		let data = this.categories.map( (variable) => ({
			x: variable + ' (' + obs[variable +  ' Indeks Rank'] + ')',
			value: obs[variable + ' Indeks']
		}))

		let name ='Næringsindeks ' + obs.Navn + ' ' 
		name += years.length == 1 ? years[0] : years[0] + '-' + years[years.length-1]

		return {
			data,
			center: obs['Næringsindeks Rank'],
			name,
		}
	}

	componentWillUpdate = (nextProps, nextState) => {
		if(this.state.nr != nextState.nr) {
			this.lineData = this.createLineData(nextState.nr)
			this.polarData = this.createPolarData(nextState.nr, nextState.year)
		}
		if(!deepEqual(this.state.year, nextState.year)) {
			this.dataObj = this.createDataObjectRank(this.rawData, nextState.year)
			this.polarData = this.createPolarData(nextState.nr, nextState.year)
		}
	}

	getLineName = () => !['Næringsindeks','Næringsindeks Rank'].includes(this.state.variable) ? 
		variables.find( (e) => e.id == this.state.variable).title :
		undefined


	render() {
		let lineData = this.filterLineData()
		return(
			<Grid>
				<Row>
					<Col>
						<div className={styles.section}>
							<h3> {sted[this.inndeling].plural} </h3>
							<p> {sted[this.inndeling].text} </p>
						</div>
						<div style={{height: '30px'}}> </div>
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
						<Multiselect
							names={this.years}
							chosen={this.state.year}
							handleChange={ (year) => this.setState({year}) }
							title='Velg år:'
							justify='center'
							width='200px'
						/>
						<div style={{height: '30px'}}> </div>
						<PolarChart bar
							data={this.polarData.data}
							variable='value'
							x='x'
							center={this.polarData.center}
							name={this.polarData.name}
							width={550}
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
						<LineChart noPoints
							data={lineData.data}
							domain={lineData.domain}
							reverse={lineData.reverse}
							variable={this.state.variable}
							x='År'
							splitby={'Navn'}
							name={this.state.variable}
						/>
						<div style={{display: 'flex', justifyContent: 'center', color: '#555'}} >
							<p> {this.getLineName()} </p>
						</div>
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


