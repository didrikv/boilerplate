import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import frontPage from '../data/frontPage.json'
import HorizontalChart from '../../components/HorizontalChart/HorizontalChart.jsx'
import StaticNorwayMap from '../../components/Map/StaticNorwayMap.jsx'
import TwoColumn, { renderSection } from '../../components/TwoColumn/TwoColumn.jsx'
import categories from '../data/categories.json'
import Table from './Table.jsx'
import styles from './App.css'
import { NavLink } from 'react-router-dom'



export default function FrontPage(props) {

	function renderGraphSection() {
		let graphProps = {
			dataStore: props.dataStore,
			stack: categories.map( (e) => e.title ),
			sortby: 'Kulturindeks Score',
			years: [2018],	
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
			years: [2018],
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
				{frontText}
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

let frontText = 
	<div className={styles.section}>
		<h3>Norsk kulturindeks 2020</h3>
	<br/>
		<p><i>Hva og hvorfor?</i></p>
		<p>Norsk kulturindeks er en årlig oversikt over kulturtilbud og kulturaktivitet i norske kommuner, regioner og fylker. Indeksen er basert på registerdata fra en rekke offentlige etater, interesseorganisasjoner og foreninger. Målsetningen med Norsk kulturindeks er å beskrive det faktiske kulturtilbudet og den faktiske kulturbruken innenfor kommunen som geografisk område. Indeksen er utviklet av Telemarksforsking i samarbeid med norske kommuner og fylkeskommuner.</p>
		<p><NavLink to='/steder'>Finn resultater for din kommune.</NavLink></p>
		<br/>
		<p><i>Hvordan fungerer Norsk kulturindeks?</i></p>
		<p>Hvert år samler Telemarksforsking data til Norsk kulturindeks og gir ut en oversikt over hvordan kommunene plasserer seg i forhold til hverandre. De årlige kulturindeksene er basert på data fra året før. Det vil si at Norsk kulturindeks 2020 er basert på data fra 2019. Man må derfor velge 2019 som år for å få fram datagrunnlaget for Norsk kulturindeks 2020.</p>
		<p><NavLink to='/kategori/indeks'>20 på topp i hver kategori.</NavLink></p>
	<br/>
		<p><i>Hva kan man bruke datamaterialet til?</i></p>
		<p>Datamaterialet i Norsk kulturindeks muliggjør en rekke statistiske analyser og sammenligninger, og brukes som kunnskapsgrunnlag for kommuneadministrasjon og politikere i mange norske kommuner. Med basis i indeksen leverer Telemarksforsking ulike typer rapporter som kunnskapsgrunnlag for kulturplanprosesser, planlegging av nytt kulturhus, utredninger av regionale samarbeid med mer. Rapportene er godt egnet til å beskrive kulturlivet i en kommune, region eller fylke – og hvilket mulighetsrom som finnes på de ulike kulturområdene. Slike rapporter kan være til god hjelp i utarbeidelse av bl.a. planer, søknader og rapporteringer.</p>
		<a target="_blank" href="https://www.telemarksforsking.no/prosjekter/norsk-kulturindeks-2019/20191310/">Klikk her for en oversikt over alle rapporter basert på Norsk kulturindeks.</a>
	</div>



















