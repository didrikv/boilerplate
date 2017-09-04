import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header.jsx'
import KategoriRoute from './KategoriRoute.jsx'


export default function App(props) {
	const kategori = (routeProps) => <KategoriRoute {...props} {...routeProps} />
	return(
		<div>
			<Router basename="/kultur">
				<div>
					<Header/>
					<Route path="/kategori" render={kategori} />
				</div>
			</Router>
		</div>
	)
}
