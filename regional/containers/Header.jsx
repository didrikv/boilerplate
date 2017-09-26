import React from 'react'

import styles from './App.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'


function Header(props) {
	return(
		<div style={{height: '260px'}}>
			<div className={styles.header} >
				<p> Telemarksforskning </p>
				<h1> Regionale Analyser</h1> 
			</div>
				<Navbar bsStyle='default' staticTop>
					<div className={styles.navbar}>
						<Nav>
							<NavItem href='/attraktivitet'> Attraktivitetsanalyser </NavItem>
							<NavItem href='/naring'> Næringsindeksen</NavItem>
							<NavItem href='/kultur'> Norsk Kulturindeks</NavItem>
						</Nav>
					</div>
				</Navbar>
		</div>
	)
}

export default Header
