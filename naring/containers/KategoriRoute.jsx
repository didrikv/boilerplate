import React from 'react'
import categories from '../data/categories.json'
import {Route} from 'react-router-dom'
import Kategori from './Kategori.jsx'
import Indeks from './Indeks.jsx'



export default function KategoriRoute(props) {
	let url = props.match.url
	let renderKategori = (i) =>  <Kategori {...props} i={i}/>
	let renderIndeks = () => <Indeks {...props} />
	return(
		<div>
			<Route
				path={url + '/indeks'}
				render={() => renderIndeks()}
			/>
			{categories.map( (e, i) =>
				<Route 
					path={url + '/' + e.webtitle}
					render={() => renderKategori(i)}
					key={i}
				/>
			)}
		</div>
	)
}
