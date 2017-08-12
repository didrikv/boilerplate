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
	selectVariable
} from "../actions/actions.js"

import article from "../data/article.json"
import styles from "./Article.css"
import pstyles from "../components/TwoColumn.css"
import BestWorstChart from "../containers/BestWorstChart.js"
import StaticNorwayMap from "../containers/StaticNorwayMap.js"
import TwoColumn from "../components/TwoColumn.js"
import BestControl from "../containers/BestControl.js"

function mapDispatchToProps(dispatch) {
	return {
		selectInndeling: (inndeling) => dispatch(selectInndeling(inndeling)),
		selectbestControl:(bool) =>  dispatch(selectbestControl(bool)),
		selectPopulation:(pop) => dispatch(selectPopulation(pop)),
		selectYear: (year) => dispatch(selectYear(year)),
		selectVariable: (variable) => dispatch(selectVariable(variable))
	}
}

function mapStateToProps(state) {
	return {
		variable: state.variable
	}
}

function renderSection(section) {
	return(
		<div>	
			<div className={pstyles.section}>
				<h3 className={pstyles.header}> {article[section].title} </h3>
				<p className={pstyles.paragraph}> {article[section].text} </p>
			</div>
			<div style={{height: "100px"}} > </div>
		</div>
		
	)
}

function SamletAtrakk(props) {
	let selectInndeling = props.selectInndeling
	let selectVariable = props.selectVariable
	let	selectYear = props.selectYear 
	let selectPopulation = props.selectPopulation

	function renderStructureSection() {
		let select = (variable) => {
			selectVariable(variable)
			selectInndeling("kommune")
			selectYear([2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016])
		}

		let sections = [
			{ ...article.s2, trigger: () => select("Forventet Befolkningsvekst") },
			{ ...article.s3, trigger: () => select("Befolkningsvekst") },
			{ ...article.s4, trigger: () => select("Samlet attraktivitet") },
		]

		let graph = <StaticNorwayMap onClick={null} {...props} variable={props.variable}/> 

		return <TwoColumn height="2000px" graphWidth={7} sections={sections} graph={graph} paddingBottom={200}/>
	}
	
	function renderFirstSection() {
		let select = (inndeling) => {
			selectInndeling(inndeling)
			selectYear([2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016])
			selectPopulation(1000)
		}

		let sections = [
			{ ...article.p3, trigger: () => select("kommune")},
			{ ...article.p4, trigger: () => select("region")},
			{ ...article.p5, trigger: () => {
				props.selectbestControl(false)
				setTimeout( () => {
					select("fylke")
				}, 100)
			}},
			{ ...article.p6, trigger: () => props.selectbestControl(true)}
		]

		let graph = <BestControl {...props}/>
		//let graph = <div style={{height: "500px", background: "gray"}}> </div>

		return <TwoColumn height="2500px" graphWidth={8} sections={sections} graph={graph} paddingTop={150} paddingBottom={150}/>
	}

	return(
	<Grid>
		<Row>
			{renderSection("p1")}
		</Row>
		<Row>
			{renderSection("p2")}
		</Row>
		<Row>
			{renderSection("s1")}
		</Row>
		<div style={{height: "100px"}}> </div>
		<Row>
			{renderStructureSection()}
		</Row>
		<Row>
			{renderFirstSection()}
		</Row>
		<div style={{height: "100px"}}> </div>
		<Row>
			{renderSection("p7")}
		</Row>
	</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(SamletAtrakk)

