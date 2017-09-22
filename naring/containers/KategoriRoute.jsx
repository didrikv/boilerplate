import React from 'react'
import categories from '../data/categories.json'
import {Route} from 'react-router-dom'
import Kategori from './Kategori.jsx'



export default function KategoriRoute(props) {
	let url = props.match.url
	let renderKategori = (i) =>  <Kategori {...props} i={i}/>
	return(
		<div>
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
