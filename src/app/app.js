import React from "react"
import { connect } from "react-redux"

import {data, createDataObject} from './dataStore.js'
import Layout from "./Layout.js"
import Article from "./article/Article.js"
import { 
	BrowserRouter as Router,
	Route,
	Link,
	withRouter
} from 'react-router-dom'


function mapStateToProps(state){
	return {year: state.year}
}

function Container(props) {
	let dataobj = createDataObject(data, props.year)
	return(<Article data={dataobj} origData={data}/>)
}

Container = connect(mapStateToProps)(Container)

export default function App(props) {
	return(
			<Container/>
	)
}




