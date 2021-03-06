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
import RadioPicker from '../../components/RadioPicker/RadioPicker.jsx'
import RadioButtons from '../../components/RadioPicker/RadioButtons.jsx'


export default class Steder extends React.Component {
	constructor(props) {
		super()
		let {data, years, createDataObject, allDataObject, createDataObjectRank} = props.dataStore
		
		this.rawData = data
		this.createDataObjectRank = createDataObjectRank
		this.data = allDataObject
		this.allYears =	years 
		this.categories = categories.map( (e) => e.title)
		
		this.allPlaces = createDataObject(this.rawData, 2015)
			.map( (e) => ({ Nr: e.Nr, Navn: e.Navn, Inndeling: e.Inndeling}))


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

		this.loadInndeling(props.Gstate)



		this.dataObj = createDataObjectRank(data, props.Gstate.years) 
		this.lineData = this.createLineData(this.nr, props.Gstate.inndeling)
		this.polarData = this.createPolarData(this.nr, props.Gstate.years)
	}


	loadInndeling = (Gstate) => {
		let {inndeling, knr, rnr, fnr } = Gstate
		this.maxRank = inndeling == "Fylke" ? 19 :
			inndeling == "Region" ? 86 : 428
		this.places = this.allPlaces.filter( (e) => e.Inndeling == inndeling)
		this.nr = inndeling == "Fylke" ? fnr : 
			inndeling =="Region" ? rnr : knr
	}


	createLineData = (nr, inndeling) => {
		if(inndeling == 'Kommune') {
			let fnr = Math.floor(nr/100)
			var data = this.data.filter( (e) => [0, fnr, nr].includes(e.Nr) )
			if(nr == 301) {data = data.filter( (e) => !(e.Inndeling == "Fylke") )}
		} else {
			var data = this.data.filter( (e) => [0, nr].includes(e.Nr) )
		}

		data = data.map( (e) => ({...e, År: String(e.År)}) )

		return data
	}

	filterLineData = (variable) => {
		let data = this.lineData
		if(variable == "Næringsindeks" || variable == "Næringsindeks Rank") {
			data = data.filter( (e) => e.Inndeling == this.props.Gstate.inndeling)
			var domain = variable == "Næringsindeks" ? [0, 100] : [1, this.maxRank]
			var reverse = variable == "Næringsindeks Rank" ? true : false
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


	componentWillReceiveProps = (nextProps) => {
		if(this.props.Gstate.years != nextProps.Gstate.years) {
			this.dataObj = this.createDataObjectRank(this.rawData, nextProps.Gstate.years)
			this.polarData = this.createPolarData(this.nr, nextProps.Gstate.years)
		}

		else if(this.props.Gstate != nextProps.Gstate) {
			this.loadInndeling(nextProps.Gstate)
			this.lineData = this.createLineData(this.nr, nextProps.Gstate.inndeling)
			this.polarData = this.createPolarData(this.nr, nextProps.Gstate.years)
		}
	}




	getLineName = () => !['Næringsindeks','Næringsindeks Rank'].includes(this.props.Gstate.variable) ? 
		variables.find( (e) => e.id == this.props.Gstate.variable).title :
		undefined

	setNr = (nr) => {
		let inndeling = this.props.Gstate.inndeling
		let str = inndeling == "Kommune" ? 'knr' : 
			inndeling == "Region" ? 'rnr': 'fnr'
		this.props.setGstate({ [str]: nr})
	}


	render() {
		let lineData = this.filterLineData(this.props.Gstate.variable)
		return(
			<Grid>
				<Row>
					<Col>
						<div className={styles.section}>
							<h3> Resultat for enkelte steder </h3>
							<p>
								Her kan man se resultat for enkelte kommuner, regioner og fylker.
								Nede til ventre kan man se rangering i næringsindeksen totalt og for de 5
								hovedkategoriene. Nede til høyre kan man se utviklingen i alle variablene som indeksene er basert
								på gjennom tid og sammelignet med land og eventuelt fylke.
							</p>
						</div>
					

						<div style={{height: '30px'}}> </div>
						<div style={{maxWidth: '50rem', margin: 'auto'}}>
							<div style={{display: 'flex', justifyContent: 'center'}}>
							<RadioButtons
								names={['Kommune', 'Region', 'Fylke']}
								chosen={this.props.Gstate.inndeling}
								handleChange={(inndeling) => this.props.setGstate({inndeling})}
							/>
						</div>
							<Picker
								names={this.props.Gstate.inndeling == "Kommune"
									? this.places.map( (e) => e.Nr + ' ' +  e.Navn )
									: this.places.map( (e) => e.Navn)}
								values={this.places.map( (e) => e.Nr )}
								chosen={this.nr}
								handleChange={ (nr) => this.setNr(nr) }
								title={'Velg ' + this.props.Gstate.inndeling.toLowerCase() + ':'}
								justify='center'
								width='400px'
							/>
						</div>
						<div style={{maxWidth: '50rem', margin: 'auto'}}>
						</div>
					</Col>
					<div style={{height: '30px'}}> </div>
					<Col sm={6}>
						<Multiselect
							names={this.allYears}
							chosen={this.props.Gstate.years}
							handleChange={ (years) => this.props.setGstate({years}) }
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
							chosen={this.props.Gstate.variable}
							handleChange={ (variable) => this.props.setGstate({variable}) }
							title='Velg variabel:'
							justify='center'
							width='300px'
						/>
						<div style={{height: '30px'}}> </div>
						<LineChart noPoints
							data={lineData.data}
							domain={lineData.domain}
							reverse={lineData.reverse}
							variable={this.props.Gstate.variable}
							x='År'
							splitby={'Navn'}
							name={this.props.Gstate.variable}
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
