import React from 'react'
import { 
	Grid,
	Row,
	Col,
} from 'react-bootstrap'
import { connect } from 'react-redux'
import {
	selectInndeling,
	selectbestControl,
	selectPopulation,
	selectYear,
	selectVariable,
	selectDomain
} from "../actions/actions.js"
import { renderSection } from "./Article.js"

import article from "../data/Naring.json"
import styles from "./Article.css"
import pstyles from "../components/TwoColumn.css"
import BestWorstChart from "../containers/BestWorstChart.js"
import StaticNorwayMap from "../containers/StaticNorwayMap.js"
import TwoColumn from "../components/TwoColumn.js"
import BestControl from "../containers/BestControl.js"
import ControlPanel from "../containers/ControlPanel.js"

function mapDispatchToProps(dispatch) {
	return {
		selectInndeling: (inndeling) => dispatch(selectInndeling(inndeling)),
		selectbestControl:(bool) =>  dispatch(selectbestControl(bool)),
		selectPopulation:(pop) => dispatch(selectPopulation(pop)),
		selectYear: (year) => dispatch(selectYear(year)),
		selectVariable: (variable) => dispatch(selectVariable(variable)),
		selectDomain: (domain) => dispatch(selectDomain(domain))
	}
}

function mapStateToProps(state) {
	return {
		variable: state.variable
	}
}

function Naringsattraktivitet(props) {
	let selectInndeling = props.selectInndeling
	let selectVariable = props.selectVariable
	let	selectYear = props.selectYear 
	let selectPopulation = props.selectPopulation
	let selectDomain = props.selectDomain

	function renderMapSection() {
		let select = (variable) => {
			selectVariable(variable)
			selectInndeling("kommune")
			selectYear([2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016])
		}
		let selectLast = () => {
			selectVariable("Bransjeeffekt")
			selectInndeling("kommune")
			selectYear([2015, 2016])
		}

		let sections = [
			{...article.k1, trigger: () => select("Bransjeeffekt") },
			{...article.k2, trigger: () => select("Befolkningseffekt") },
			{...article.k3, trigger: () => select("Næringsattraktivitet") },
			{...article.k4, trigger: () => selectLast()},
		]

		let graph = <StaticNorwayMap onClick={null} {...props} variable={props.variable} />
		let control = <ControlPanel 
							YearPicker={{years: props.years}} 
							VariablePicker={{names: ["Bransjeeffekt", "Befolkningseffekt", "Næringsattraktivitet"]}}
							InndelingPicker={true}
						/>

		return <TwoColumn 
					height="2000px" 
					graphWidth={8} 
					sections={sections} 
					graph={graph} 
					paddingBottom={200} 
					paddingTop={120}
					control={control}
				/>
	}

	function renderGraphSection() {
		let select = (inndeling) => {
			selectInndeling(inndeling)
			selectYear([2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016])
			selectPopulation(1000)
			selectDomain("Næringsattraktivitet")
		}
		let control = <ControlPanel 
							YearPicker={{years: props.years}} 
							InndelingPicker={true}
							PopulationSlider={true}
						/>

		let sections = [
			{ ...article.g1, trigger: () => select("kommune")},
			{ ...article.g2, trigger: () => select("region")},
			{ ...article.g3, trigger: () => select("fylke")},
			{ ...article.g4, trigger: () => null}
		]

		let graph = <BestWorstChart {...props} view="top" n={10}/>
		return <TwoColumn 
					height="2500px" 
					graphWidth={8} 
					sections={sections} 
					graph={graph} 
					paddingBottom={200} 
					control={control}
					paddingTop={120}
				/>
	}



	return(
		<Grid>
		<Row>
			{renderSection(article.p1)}
		</Row>
		<Row>
			{renderMapSection()}
		</Row>
		<Row>
			{renderGraphSection()}
		</Row>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Naringsattraktivitet)

