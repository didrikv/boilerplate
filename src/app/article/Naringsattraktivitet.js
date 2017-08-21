import React from 'react'
import { 
	Grid,
	Row,
	Col,
} from 'react-bootstrap'
import { renderSection } from "./Article.js"

import article from "../data/Naring.json"
import styles from "./Article.css"
import pstyles from "../components/TwoColumn.css"

import HorizontalChart from '../containers/HorizontalChart.js'
import StaticNorwayMap from "../containers/StaticNorwayMap.js"
import TwoColumn from "../components/TwoColumn.js"

export default function Naringsattraktivitet(props) {

	function renderMapSection() {
		let graphProps = {
			options: ['Bransjeeffekt', 'Befolkningseffekt', 'Næringsstruktur'],
			variable: 'Bransjeeffekt',
			years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
			inndeling: 'Kommune',
			createControl: true,
			hideControl: true
		}

		let sections = [
			{...article.k1, graphProps: {variable: 'Bransjeeffekt'}},
			{...article.k2, graphProps: {variable: 'Befolkningseffekt'}},
			{...article.k3, graphProps: {variable: 'Næringsstruktur'}},
			{...article.k4, graphProps: {
				variable: 'Bransjeeffekt',
				years: [2015, 2016],
				hideControl: false
			}},
		]
		
		return <TwoColumn 
					height="2000px" 
					graphWidth={8} 
					sections={sections} 
					graph={StaticNorwayMap} 
					graphProps={graphProps}
					paddingBottom={200} 
					paddingTop={120}
				/>
	}

	function renderGraphSection() {
		let graphProps = {
			stack: ['Nasjonalt Bidrag', 'Næringsstruktur', 'Næringsattraktivitet'],
			sortby: 'Næringsattraktivitet',
			years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
			inndeling: 'Kommune',
			colorScale:["#7FB3D5","#9E9E9E","#FFB74D"],
			population: 1000,
			hideControl: true,
			createControl: true
		}

		let sections = [
			{ ...article.g1, graphProps:{inndeling: "Kommune"}},
			{ ...article.g2, graphProps:{inndeling: "Region"}},
			{ ...article.g3, graphProps:{inndeling: "Fylke"}},
			{ ...article.g4, graphProps:{
				inndeling: "Fylke",
				hideControl: false,
			}}
		]

		return <TwoColumn 
					height="2500px" 
					graphWidth={8} 
					sections={sections} 
					graph={HorizontalChart} 
					graphProps={graphProps}
					paddingBottom={200} 
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


