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
			year: [2013, 2014, 2015],
			variable: 'Produktivitet',
			inndeling: 'Kommune'
		}
	}

	kategori = (routeProps) => <KategoriRoute {...this.props} {...routeProps} Gstate={this.state} setGstate={ () => this.setState()} />
	kommuner = (routeProps) => <Steder {...this.props} {...routeProps} inndeling='Kommune'/>
	regioner = (routeProps) => <Steder {...this.props} {...routeProps} inndeling='Region'/>
	fylker = (routeProps) => <Steder {...this.props} {...routeProps} inndeling='Fylke'/>

	render() {
		return(
			<div>
				<Router basename="/naring">
					<div>
						<Header/>
						<Route path="/kategori" render={this.kategori} />
						<Route path="/kommuner" render={this.kommuner} />
						<Route path="/fylker" render={this.fylker} />
						<Route path="/regioner" render={this.regioner} />
						<Footer />
					</div>
				</Router>
			</div>
		)
	}
}
