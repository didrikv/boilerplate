import React from 'react'

import styles from './App.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import logo from '../../logo/logoFullFarge.svg'


function Header(props) {
	return(
		<div>
			<div className={styles.linkContainer}>
				<div> Regional Analyse </div>
				<a href='/naring' >Næringsindeksen</a>
				<a href='/attraktivitet'>Attraktivitetsanalyser</a>
				<a href='/kultur'>Norsk Kulturindeks</a>
			</div>
			<div className={styles.header} >
				<a href='https://www.telemarksforsking.no'>
					<img src={logo} height='40px'/>
				</a>
				<h1> Regionale analyser</h1> 
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
