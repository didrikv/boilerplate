import React from 'react'

import styles from './App.css'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import logo from '../../logo/logoFullFarge.svg'


function Header(props) {
	return(
		<div>
			<div className={styles.header} >
				<a href='https://www.telemarksforsking.no'>
					<img src={logo} height='30px'/>
				</a>
				<h1> Attraktivitetsanalyser </h1> 
				<p> Hva får steder til å vokse? </p>
				<p> av  <a href='http://www.tmforsk.no/medarbeidere/detalj.asp?id=13&merket=6'> Knut Vareide </a> </p>
			</div>

			<Navbar bsStyle='default' staticTop>
				<div className={styles.navbar}>
					<Nav>
						<LinkContainer exact to='/'>
							<NavItem > Attraktivitet </NavItem>
						</LinkContainer>
						<LinkContainer to='/bosted' >
							<NavItem >Bosted</NavItem>
						</LinkContainer>
						<LinkContainer to='/naring' >
							<NavItem > Næring </NavItem>
						</LinkContainer>
						<LinkContainer to='/scenarier' >
							<NavItem > Scenarier</NavItem>
						</LinkContainer>
						<LinkContainer to='/dashboard' >
							<NavItem > Dashboard </NavItem>
						</LinkContainer>
					</Nav>
				</div>
			</Navbar>
		</div>
	)
}

export default Header
