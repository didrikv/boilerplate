import React from 'react'
import {connect} from 'react-redux'

import BestWorstChart from "./BestWorstChart.js"
import YearPicker from "./YearPicker.js"
import InndelingPicker from "./InndelingPicker.js"
import PopulationSlider from "./PopulationSlider.js"
import { selectbestControl } from "../actions/actions.js"
import {Collapse, Fade} from 'react-bootstrap'

function mapStateToProps(state) {
	return {bestControl: state.bestControl}
}

function BestControl(props) {



	return(
		<div >
		<div style={{height: "150px", border: "1px solid transparent"}}>
		<Fade in={props.bestControl}>
				<div>
					<YearPicker years={props.years} />
					<div style={{display: "flex"}}>
					<InndelingPicker />
					<PopulationSlider />
					</div>
				</div>
		</Fade>
		</div>
		<div >
		<BestWorstChart view="top" n={10} data={props.data} key="test"/> 
		</div>
		</div>
	)
}

export default connect(mapStateToProps)(BestControl)


