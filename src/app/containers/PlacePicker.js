import React from 'react'
import FancyList from "../components/FancyList.js"
import {connect} from 'react-redux'

import {selectNr, selectSearch} from "../actions/actions.js"

function mapStateToProps(state) {
	return {
		inndeling: state.inndeling,
		domain: state.domain,
		value: state.Nr,
		population: state.population
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onChange: (Nr) => dispatch(selectNr(Nr)),
		onSearch: (search) => dispatch(selectSearch(search)),	
	}
}

function PlacePicker(props) {
	let data = props.data
	let inndeling = props.inndeling[0].toUpperCase() + props.inndeling.slice(1) 

	data = data.filter( (e) => e.Inndeling == inndeling )
	
	if(props.inndeling == "kommune") {
		data = data.filter( (e) => e.Folketall >= props.population )
	}


	let show = ["Nr", "Navn"]
	let main = "Navn"
	
	return(
		<FancyList 
			{...props}
			data={data} 
			show={show} 
			main={main} 
			onChange={props.onChange} 
			domain={props.domain} 
			onSearch={props.onSearch}
			value={props.value}
		/> 
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacePicker)
