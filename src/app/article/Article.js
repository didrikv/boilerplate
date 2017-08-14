import React from 'react'
import { connect } from 'react-redux'

import Header from "./Header.js"
import SamletAtrakk from "./SamletAtrakk.js"
import Bostedsattraktivitet from "./Bostedsattraktivitet.js"
import Naringsattraktivitet from "./Naringsattraktivitet.js"
import Befolkningsframskriving from "./Befolkningsframskriving.js"
import Layout from "../Layout.js"
import pstyles from "../components/TwoColumn.css"
import ControlPanel from "../containers/ControlPanel.js"

import { 
	BrowserRouter as Router,
	Route,
	Link,
	withRouter
} from 'react-router-dom'

function mapStateToProps(state) {
	return { years: state.year }
}

function Article(props) {
	const attrak = () => <SamletAtrakk {...props}/>
	const naring = () => <Naringsattraktivitet {...props}/>
	const bosted = () => <Bostedsattraktivitet {...props}/>
	const framskriving = () => <Befolkningsframskriving {...props}/>
	const layout = () => <Layout {...props}/>

	return(
		<div>
		<Router>
		<div>
			<Header />
			<ControlPanel />
			<div>
			<Route exact path="/" render={attrak} />
			<Route path="/bosted" render={bosted} />
			<Route path="/naring" render={naring} />
			<Route path="/scenarier" render={framskriving} />
			<Route path="/dashboard" render={layout} /> 
			</div>
		</div>
		</Router>
		</div>
	)
}
export function renderSection(section) {
	return(
		<div>	
			<div className={pstyles.section}>
				<h3 className={pstyles.header}> {section.title} </h3>
				<p className={pstyles.paragraph}> {section.text} </p>
			</div>
			<div style={{height: "100px"}} > </div>
		</div>
		
	)
}

export default connect(mapStateToProps)(Article)

