import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import KategoriRoute from './KategoriRoute.jsx'
import Steder from './Steder.jsx'

export default class App extends React.Component {
	constructor(props){
		super()

		this.state = {
			years: [2013, 2014, 2015],
			variable: 'Produktivitet',
			inndeling: 'Kommune',
			knr: 101,
			rnr: 3001,
			fnr: 1
		}
	}

	kategori = (routeProps) => <KategoriRoute {...this.props} {...routeProps} Gstate={this.state} setGstate={ (obj) => this.setState(obj)} />
	steder = (routeProps) => <Steder {...this.props} {...routeProps} Gstate={this.state} setGstate={ (obj) => this.setState(obj)} />

	render() {
		return(
			<div>
				<Router basename="/naring">
					<div>
						<Header/>
						<Route path="/kategori" render={this.kategori} />
						<Route path="/steder" render={this.steder} />
						<Footer />
					</div>
				</Router>
			</div>
		)
	}
}
