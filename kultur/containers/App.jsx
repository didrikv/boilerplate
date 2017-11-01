import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import KategoriRoute from './KategoriRoute.jsx'
import Steder from './Steder.jsx'
import FrontPage from './FrontPage.jsx'
import Analyser from './Analyser.jsx'
import Bestill from './bestill.jsx'
import IEWarning from '../../components/IEWarning.jsx'


export default class App extends React.Component {
	constructor(props){
		super()

		this.state = {
			years: [2016],
			variable: 'Kulturindeks',
			inndeling: 'Kommune',
			knr: 101,
			rnr: 3001,
			fnr: 1
		}
	}

	kategori = (routeProps) => <KategoriRoute {...this.props} {...routeProps} Gstate={this.state} setGstate={ (obj) => this.setState(obj)} />
	steder = (routeProps) => <Steder {...this.props} {...routeProps} Gstate={this.state} setGstate={ (obj) => this.setState(obj)} />
	frontPage = (routeProps) => <FrontPage {...this.props} {...routeProps} Gstate={this.state} setGstate={ (obj) => this.setState(obj)} />
	analyser = (routeProps) => <Analyser {...this.props} {...routeProps} />
	bestill = (routeProps) => <Bestill {...this.props} {...routeProps} />

	render() {
		return(
			<div>
				<Router>
					<div>
						<IEWarning/>
						<Header/>
						<Route path="/kategori" render={this.kategori} />
						<Route path="/steder" render={this.steder} />
						<Route exact path="/" render={this.frontPage} />
						<Route path="/analyser" render={this.analyser} />
						<Route path="/bestill" render={this.bestill} />
						<Footer />
					</div>
				</Router>
			</div>
		)
	}
}
