import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header.jsx'
import KategoriRoute from './KategoriRoute.jsx'
import Steder from './Steder.jsx'

export default function App(props) {
	const kategori = (routeProps) => <KategoriRoute {...props} {...routeProps} />
	const kommuner = (routeProps) => <Steder {...props} {...routeProps} inndeling='Kommune'/>
	const regioner = (routeProps) => <Steder {...props} {...routeProps} inndeling='Region'/>
	const fylker = (routeProps) => <Steder {...props} {...routeProps} inndeling='Fylke'/>
	return(
		<div>
			<Router basename="/kultur">
				<div>
					<Header/>
					<Route path="/kategori" render={kategori} />
					<Route path="/kommuner" render={kommuner} />
					<Route path="/fylker" render={fylker} />
					<Route path="/regioner" render={regioner} />
				</div>
			</Router>
		</div>
	)
}
