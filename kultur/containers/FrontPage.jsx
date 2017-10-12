import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import frontPage from '../data/frontPage.json'
import HorizontalChart from '../../components/HorizontalChart/HorizontalChart.jsx'
import StaticNorwayMap from '../../components/Map/StaticNorwayMap.jsx'
import TwoColumn, { renderSection } from '../../components/TwoColumn/TwoColumn.jsx'
import categories from '../data/categories.json'
import Table from './Table.jsx'



export default function FrontPage(props) {
	console.log(props)

	function renderGraphSection() {
		let graphProps = {
			dataStore: props.dataStore,
			stack: categories.map( (e) => e.title ),
			sortby: 'Kulturindeks Score',
			years: [2016],
			inndeling: 'Kommune',
			createControl: false,
			itemsPerRow: 4,
			noticks: true
		}

		return(
			<Row>
				<Col sm={8}>
					<HorizontalChart {...graphProps} />
				</Col>
				<Col sm={4}>
					{renderSection(frontPage.g1)}
				</Col>
			</Row>
		)
	}

	function renderMapSection() {
		let graphProps = {
			variable: 'Kulturindeks Score',
			years: [2016],
			inndeling: 'Kommune',
			createControl: false,
			dataStore: props.dataStore,
			name: 'Kulturindeks',
			percentLegend: true
		}

		return(
			<Row>
				<Col sm={8}>
					<StaticNorwayMap {...graphProps} />
				</Col>
				<Col sm={4}>
					{renderSection(frontPage.m1)}
				</Col>
			</Row>
		)
	}

	function renderTableSection() {

		return(
			<Row>
				<Col sm={8}>
					<Table/>
				</Col>
				<Col sm={4}>
					{renderSection(frontPage.t1)}
				</Col>
			</Row>
		)
	}
			

	return(
		<Grid>
			<Row>
				{renderSection(frontPage.h1)}
			</Row>
			<div style={{height: '100px'}}></div>
				{renderGraphSection()}
			<div style={{height: '100px'}}></div>
				{renderMapSection()}
			<div style={{height: '100px'}}></div>
				{renderTableSection()}
		</Grid>
	)
}
