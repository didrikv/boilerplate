import React from 'react'
import categories from '../data/categories.json'
import allVariables from '../data/variables.json'
import styles from '../../components/TwoColumn/TwoColumn.css'
import Table from '../../components/Table/Table.jsx'
import {Row, Col, Grid} from 'react-bootstrap'
import StaticNorwayMap from '../../components/Map/StaticNorwayMap.jsx'
import TopRang from './TopRang.jsx'
import RadioPicker from '../../components/RadioPicker/RadioPicker.jsx'
import Picker from '../../components/Picker/Picker.jsx'
import HorizontalChart from '../../components/HorizontalChart/HorizontalChart.jsx'
import InfoText from './InfoText.jsx'
import InfoText2 from './InfoText2.jsx'





export default class Kategori extends React.Component {

	constructor(props) {
		let {i} = props
		let variables = categories[i].variables.slice()
		variables.unshift(categories[i].title)
		super()
		this.state = {...props}
		this.state.variables = variables
		this.state.variable = categories[i].title
		this.state.inndeling='Kommune'
		this.state.years=[2015]

	}

	renderControls = () => {
		return(
			<div>
				<div style={{width: '50rem', margin: 'auto', display: 'flex', justifyContent: 'space-between'}}>
					<div style={{flex: 1, fontWeight: 'bold'}}>
						Velg Inndeling:
					</div>
					<div style={{flex: 0.5}}> </div>
					<div style={{flex: 1, fontWeight: 'bold'}}>
						Velg år:
					</div>
					<div style={{flex: 0.5}}> </div>
					<div style={{flex: 2, fontWeight: 'bold'}}>
						Velg variabel:
					</div>
				</div>
				<div style={{width: '50rem', margin: 'auto', display: 'flex', justifyContent: 'space-between'}}>
					<div style={{flex: 1}}>
						<Picker
							names={['Kommune', 'Region', 'Fylke']}
							chosen={this.state.inndeling}
							handleChange={ (inndeling) => this.setState({inndeling}) }
						/>
					</div>
					<div style={{flex: 0.5}}> </div>
					<div style={{flex: 1}}>
						<Picker
							names={this.state.dataStore.years}
							chosen={this.state.years[0]}
							handleChange={ (years) => this.setState({years: [years]}) }
						/>
					</div>
					<div style={{flex: 0.5}}> </div>
					<div style={{flex: 2}}>
						<Picker
							names={this.state.variables}
							chosen={this.state.variable}
							handleChange={ (variable) => this.setState({variable}) }
							boldFirst={true}
						/>
					</div>
				</div>
			</div>
		)
	}


	renderKategori = (i) => {

		let tableProps = {
			variables: categories[i].variables
		}


		let varInfo = allVariables.find( (e) => e.id == this.state.variable)
		let reverse = varInfo ? varInfo.reverse : undefined
		let variable = reverse ? this.state.variable + ' Score' : this.state.variable
		if(this.state.variable == categories[i].title) {
			var stack = categories[i].variables.map( (e) => e + ' Score')
		} else {
			var stack = [variable]
		}



		let mapProps = {
			variable: variable,
			createControl: false,
		}


		let chartProps = {
			stack: stack,
			sortby: variable,
			view: 'top',
			createControl: false,
			years: this.state.years,
			dataStore: this.state.dataStore,
			n: 20
		}

		let infoText = this.state.variable == this.state.variables[0] ? null :
			<InfoText {...varInfo} />

		return(
			<Grid>
			<div style={{height: '30px'}}> </div>

				<Row>
					<div className={styles.section}>
						<h3 className={styles.header}> { categories[i].title } </h3>
						<p className={styles.paragraph}> { categories[i].text } </p>
					</div>
				</Row>
				<div style={{height: '30px'}}> </div>
				<Row>
					{this.renderControls()}
				</Row>
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
				<div style={{height: '100px'}}> </div>
			</Grid>
		)
	}




	render() {
		return(
			this.renderKategori(this.state.i)
		)
	}
}
