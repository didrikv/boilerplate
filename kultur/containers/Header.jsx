import React from 'react'

import styles from './App.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {AutoAffix} from 'react-overlays'
import {LinkContainer} from 'react-router-bootstrap'
import logo from '../../logo/logoFullFarge.svg'
import categories from '../data/categories.json'


function Header(props) {
	return(
		<div>
			<div className={styles.header} >
				<a href='https://www.telemarksforsking.no'>
				<img src={logo} height='30px'/>
				</a>
				<h1> NORSK KULTURINDEKS</h1> 
				<p> Hvor er det kultur? </p>
				<p> av  <a href='http://www.tmforsk.no/medarbeidere/Detalj.asp?id=80&merket=6'> Bård Kleppe</a> </p>
			</div>

			<div className={styles.navbarWrapper}>
			<AutoAffix>
				<div style={{zIndex:'10'}}>
				<Navbar bsStyle='inverse' collapseOnSelect staticTop>
					<Navbar.Toggle/>
					<div className={styles.navbar}>
							<Navbar.Collapse>
						<Nav>
							<LinkContainer exact to="/">
								<NavItem> Kulturindeksen 2017 </NavItem>
							</LinkContainer>
							<LinkContainer exact to="/analyser">
								<NavItem> Analyer </NavItem>
							</LinkContainer>
							<NavDropdown title="Hovedkategorier" >
								<LinkContainer 
									to={'/kategori/indeks'}
								>
									<MenuItem> Norsk Kulturindeks</MenuItem>
								</LinkContainer>
								<MenuItem divider />
								{categories.map( (e) => 
									<LinkContainer 
										to={'/kategori/' + e.title.toLowerCase()}
										key={e.title}
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
					</Navbar.Collapse>
					</div>
				</Navbar>
			</div>
			</AutoAffix>
		</div>
		</div>
	)
}

export default Header
