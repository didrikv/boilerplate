import React from 'react'
import { connect } from 'react-redux'

import Header from "./Header.js"
import SamletAtrakk from "./SamletAtrakk.js"
import Bostedsattraktivitet from "./Bostedsattraktivitet.js"
import Naringsattraktivitet from "./Naringsattraktivitet.js"
import Befolkningsframskriving from "./Befolkningsframskriving.js"
import Layout from "../Layout.js"

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

export default connect(mapStateToProps)(Article)

