import React from 'react'
import {connect} from 'react-redux'

import {CSSTransition} from 'react-transition-group'
import transitions from "./transitions.css"
import populationTransition from "./populationTrasition.css"
import styles from "./theme.css"

import { Grid,
		Row,
		Col,
		Jumbotron,
		PageHeader,
		Tabs,
		Tab
	} from 'react-bootstrap'

import StaticNorwayMap from "./containers/StaticNorwayMap.js"
import BestWorstChart from "./containers/BestWorstChart.js"
import YearPicker from "./containers/YearPicker.js"
import DomainPicker from "./containers/DomainPicker.js"
import InndelingPicker from "./containers/InndelingPicker.js"
import MultiSelect from "./components/MultiSelect.js"
import PopulationSlider from "./containers/PopulationSlider.js"
import ScatterContainer from "./containers/ScatterContainer.js"
import PlacePicker from "./containers/PlacePicker.js"
import DecompChart from "./containers/DecompChart.js"
import { selectPane } from "./actions/actions.js"



function mapStateToProps(state) {
	return {inndeling: state.inndeling, pane: state.pane}
}

function mapDispatchToProps(dispatch) {
	return{selectPane: (pane) => dispatch(selectPane(pane)) }
}

function Layout(props){
	let data = props.data
	let years = props.years
	return(
	<div className={styles.default}>

	<Grid>
		<Row>
			<Col sm={12} style={{display:"flex", justifyContent:"center"}}> <YearPicker years={years}/> </Col>
		</Row>
		<Row style={{borderBottom:"1px solid #eee", marginBottom:"30px"}}>
			<Col sm={6} style={{display:"flex", justifyContent:"flex-end"}}> 
					{props.inndeling == "kommune" ? <PopulationSlider /> : null}
				<InndelingPicker /> 
			</Col>
			<Col sm={6} style={{display:"flex", justifyContent:"center"}}> 
				<DomainPicker/> 
			</Col>
		</Row>
		<Row>
		<Tabs id="paneSelector" activeKey={props.pane} onSelect={props.selectPane} bsStyle="pills">
			<div style={{height: "20px"}} > </div>
			<Tab eventKey={1} title="Top i Landet" unmountOnExit>
				<Row>
					<Col sm={6} > <StaticNorwayMap createControl={false}/> </Col>
					<Col sm={6} > <BestWorstChart view="top" n={10} data={data}/> </Col>
				</Row>
			</Tab>
			<Tab eventKey={2} title="Resultat per enkelt sted" unmountOnExit>
				<Row>
					<Col sm={6} > <PlacePicker data={data} /> </Col>
					<Col sm={6} > 
						<ScatterContainer data={data} />
						<DecompChart data={props.origData}/> 
					</Col>
				</Row>
			</Tab>
		</Tabs>
		</Row>
	</Grid>
	</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
