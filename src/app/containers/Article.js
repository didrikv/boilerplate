import React from 'react'
import { Grid,
		Row,
		Col,
		PageHeader,
		Tabs,
		Jumbotron,
		Tab
	} from 'react-bootstrap'
import article from "../data/article.json"
import styles from "./Article.css"
import pstyles from "../components/TwoColumn.css"
import BestWorstChart from "./BestWorstChart.js"
import Waypoint from 'react-waypoint'
import { StickyContainer, Sticky } from 'react-sticky'
import {selectInndeling, selectbestControl, selectPopulation, selectYear} from "../actions/actions.js"
import { connect } from 'react-redux'
import TwoColumn from "../components/TwoColumn.js"
import BestControl from "./BestControl.js"

function mapDispatchToProps(dispatch) {
	return {
		chooseInndeling: (inndeling) => dispatch(selectInndeling(inndeling)),
		selectbestControl:(bool) =>  dispatch(selectbestControl(bool)),
		selectPopulation:(pop) => dispatch(selectPopulation(pop)),
		selectYear: (year) => dispatch(selectYear(year))
	}
}

function renderSection(section) {
	return(
		<div className={pstyles.section}>
		<h3 className={pstyles.header}> {article[section].title} </h3>
		<p className={pstyles.paragraph}> {article[section].text} </p>
		</div>
	)
}



function Article(props) {
	let setInndeling = props.chooseInndeling
	
	function renderFirstSection() {
		let sections = [
			{ ...article.p3, trigger: () => setInndeling("kommune")},
			{ ...article.p4, trigger: () => setInndeling("region")},
			{ ...article.p5, trigger: () => {
				props.selectbestControl(false)
				setTimeout( () => {
					setInndeling("fylke")
					props.selectYear([2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016])
					props.selectPopulation(1000)
				}, 100)
			}},
			{ ...article.p6, trigger: () => props.selectbestControl(true)}
		]

		//let graph = <BestWorstChart view="top" n={10} data={props.data}/>
		let graph = <BestControl {...props}/>

		return <TwoColumn height="2000px" graphWidth={8} graphOffset={150} sections={sections} graph={graph} />
	}

	return(
	<div>
	<div className={styles.header}>
		<p> Telemarksforskning </p>
		<h1> ATTRAKTIVITETSANALYSER </h1> 
		<p> HVA FÅR STEDER TIL Å VOKSE? </p>
		<p> av  <a href="http://www.tmforsk.no/medarbeidere/detalj.asp?id=13&merket=6"> Knut Vareide </a> </p>
	</div>
		
	<Grid>
		<Row>
			{renderSection("p1")}
		</Row>
		<Row>
			{renderSection("p2")}
		</Row>
			{renderFirstSection()}
		<Row>
		<div style={{height: "200px"}} > </div>
			{renderSection("p7")}
		</Row>
	</Grid>
	</div>
	)
}

export default connect(null, mapDispatchToProps)(Article)

