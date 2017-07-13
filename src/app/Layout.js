import React from 'react'
import {connect} from 'react-redux'

import {CSSTransitionGroup} from 'react-transition-group'
import transitions from "./transitions.css"
import populationTransition from "./populationTrasition.css"
import { Grid, Row, Col, Jumbotron, PageHeader} from 'react-bootstrap'
import styles from "./theme.css"

import StaticNorwayMap from "./containers/StaticNorwayMap.js"
import BestWorstChart from "./containers/BestWorstChart.js"
import YearPicker from "./containers/YearPicker.js"
import DomainPicker from "./containers/DomainPicker.js"
import InndelingPicker from "./containers/InndelingPicker.js"
import MultiSelect from "./components/MultiSelect.js"
import PopulationSlider from "./containers/PopulationSlider.js"

function mapStateToProps(state) {
	return {inndeling: state.inndeling}
}

function Layout(props){
	let data = props.data
	let years = props.years
	return(
	<div className={styles.default}>

	<Grid>
		<Row>
			<PageHeader style={{textAlign: "center", padding:"0px"}}>
				 Attraktivitetsanalyser  
				<small style={{textAlign: "right", fontSize:"12px"}}> Telemarksforskning </small>
			</PageHeader>
		</Row>
			<Col sm={12} style={{display:"flex", justifyContent:"center"}}> <YearPicker years={years}/> </Col>
		<Row style={{borderBottom:"1px solid #eee", marginBottom:"30px"}}>
			<Col sm={6} style={{display:"flex", justifyContent:"flex-end"}}> 
				<CSSTransitionGroup
					transitionName={populationTransition}
					transitionAppear={true}
					transitionAppearTimeout={700}
					transitionEnterTimeout={700}
					transitionLeaveTimeout={700}
					component="div"
				>
					{props.inndeling == "kommune" ? <PopulationSlider /> : null}
				</ CSSTransitionGroup>
				<InndelingPicker /> 
			</Col>
			<Col sm={6} style={{display:"flex", justifyContent:"center"}}> 
				<DomainPicker/> 
			</Col>
		</Row>
		<Row>
			<Col sm={6} > <StaticNorwayMap onClick={null} data={data}/> </Col>
			<Col sm={6} > <BestWorstChart view="top" n={10} data={data}/> </Col>
		</Row>
	</Grid>

	</div>
	)
}

export default connect(mapStateToProps)(Layout)
