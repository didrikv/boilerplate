import React from 'react'
import variables from '../data/variables.json'

export default class Kommuner extends React.Component {
	constructor(props) {
		super()
		let {data, years, createDataObject} = props.dataStore
		let vars = variables.map( (e) => e.id)
		console.log(props)
		
		let dataobj = []

		this.state = {
			knr: 821
		}

		years.forEach( (year) => {
			dataobj = dataobj.concat( 
				createDataObject(data, year).filter( (e) => 
					e.Inndeling === 'Kommune'
				)
			)
		})

	}

	render() {
		return <p>"FUCK YEAH!"</p>
	}
}
