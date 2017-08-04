import React from 'react'
import {connect} from 'react-redux'
import {selectPopulation} from "../actions/actions.js"
import Slider from "../components/Slider.js"
import RadioPicker from "../components/RadioPicker.js"
import {Fade} from 'react-bootstrap'


function mapStateToProps(state) {
	return {
		population: state.population,
		inndeling: state.inndeling
	}
}

function mapDispatchToProps(dispatch){
	return {handleChange: (population) => dispatch(selectPopulation(population))}
}

let names = ["Alle", "> 1000", "> 3000", "> 10 000"]
let values = [0, 1000, 3000, 10000]

function PopulationSlider(props) {
	let show = props.inndeling == "kommune"
	return(
		<Fade in={show}>
			<div>
			<RadioPicker
				{...props}
				names={names}
				values={values}
				value={props.population}
			/>
			</div>
		</Fade>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(PopulationSlider)


