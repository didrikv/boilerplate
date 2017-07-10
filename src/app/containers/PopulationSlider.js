import React from 'react'
import {connect} from 'react-redux'
import {selectPopulation} from "../actions/actions.js"
import Slider from "../components/Slider.js"


function mapStateToProps(state) {
	return {population: state.population}
}

function mapDispatchToProps(dispatch){
	return {onChange: (population) => dispatch(selectPopulation(population))}
}

let names = ["Alle", "> 1000", "> 3000", "> 10 000"]
let values = [0, 1000, 3000, 10000]

function PopulationSlider(props) {

	return(
		<div>
		<p style={{fontSize:"10px", color:"grey"}}> Filtrer på befolkning </p>
		<Slider
			{...props}
			names={names}
			values={values}
			value={props.population}
		/>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(PopulationSlider)


