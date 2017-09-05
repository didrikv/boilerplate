import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header.jsx'
import KategoriRoute from './KategoriRoute.jsx'
import Kommuner from './Kommuner.jsx'


export default function App(props) {
	const kategori = (routeProps) => <KategoriRoute {...props} {...routeProps} />
	const kommuner = (routeProps) => <Kommuner {...props} {...routeProps} />
	return(
		<div>
			<Router basename="/kultur">
				<div>
					<Header/>
					<Route path="/kategori" render={kategori} />
					<Route path="/kommuner" render={kommuner} />
					<Route path="/regioner" render={null} />
					<Route path="/fylker" render={null} />
				</div>
			</Router>
		</div>
	)
}
