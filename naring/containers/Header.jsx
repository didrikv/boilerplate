import React from 'react'

import styles from './App.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {AutoAffix} from 'react-overlays'
import {LinkContainer} from 'react-router-bootstrap'
import categories from '../data/categories.json'


function Header(props) {
	return(
		<div style={{height: '260px'}}>
			<div className={styles.header} >
				<p> Telemarksforskning </p>
				<h1> Næringsindeks</h1> 
				<p> Hvordan går det med næringslivet? </p>
				<p> av  <a href='http://www.tmforsk.no/medarbeidere/detalj.asp?id=13&merket=6'> Knut Vareide</a> </p>
			</div>

			<AutoAffix>
				<Navbar bsStyle='default' staticTop>
					<div className={styles.navbar}>
						<Nav>
							<LinkContainer exact to="/">
								<NavItem> Næringsindeksen 2017 </NavItem>
							</LinkContainer>
							<NavDropdown title="Hovedkategorier" >
								{categories.map( (e) => 
									<LinkContainer 
										to={'/kategori/' + e.webtitle}
										key={e.webtitle}
									>
										<MenuItem> {e.title} </MenuItem>
									</LinkContainer>
								)}
							</NavDropdown>
							<LinkContainer to='/kommuner'>
								<NavItem> Kommuner </NavItem>
							</LinkContainer>
							<LinkContainer to='/regioner'>
								<NavItem> Regioner </NavItem>
							</LinkContainer>
							<LinkContainer to='/fylker'>
								<NavItem> Fylker </NavItem>
							</LinkContainer>
						</Nav>
					</div>
				</Navbar>
			</AutoAffix>
		</div>
	)
}

export default Header
