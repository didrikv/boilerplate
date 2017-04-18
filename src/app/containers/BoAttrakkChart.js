import React from 'react'
import {connect} from 'react-redux'
import StackAndLineChart2 from "../components/StackAndLineChart2.js"

function mapStateToProps(state){
	return {knr: state.kommune}
}

function BoAtrakkChart(props) {
	let data = props.data.filter((e) => e.Nr == props.knr)
	let stack = ["Strukturelle flyttefaktorer", "Egenvekst", "Bostedsattraktivitet"]
	if(props.knr) {
		return <StackAndLineChart2
					data={data}
					line="Nettoinnflytting"
					stack={stack}
					x="Aar"
				/>
	}
	else {return null}
}

export default connect(mapStateToProps)(BoAtrakkChart)
				

