import React from 'react'

import styles from './App.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {AutoAffix} from 'react-overlays'
import {LinkContainer} from 'react-router-bootstrap'
import logo from '../../logo/logoFullFarge.svg'
import categories from '../data/categories.json'

import indeks from '../data/logo/indeks.svg'
import Kunstnere from '../data/logo/kunstnere.svg'
import Kulturarbeidere from '../data/logo/kulturarbeidere.svg'
import Museum from '../data/logo/museum.svg'
import Konserter from '../data/logo/konserter.svg'
import Kino from '../data/logo/kino.svg'
import Bibliotek from '../data/logo/bibliotek.svg'
import Scenekunst from '../data/logo/scenekunst.svg'
import Kulturskole from '../data/logo/kulturskole.svg'
import DKS from '../data/logo/dks.svg'
import Tildelinger from '../data/logo/tildelinger.svg'
import Frivillighet from '../data/logo/frivillighet.svg'

function Header(props) {
	return(
		<div>
			<div className={styles.linkContainer}>
				<a href='/regional'> Regional Analyse </a>
				<a href='/naring' >Næringsindeksen</a>
				<a href='/attraktivitet'>Attraktivitetsanalyser</a>
				<div>Norsk Kulturindeks</div>
			</div>
			<div className={styles.header} >
				<a href='https://www.telemarksforsking.no'>
				<img src={logo} height='40px'/>
				</a>
				<h1> Norsk kulturindeks</h1> 
				<p>Lokalt kulturliv i norske kommuner</p>
				<p> av  <a href='http://www.tmforsk.no/medarbeidere/Detalj.asp?id=80&merket=6'> Bård Kleppe</a> </p>
			</div>

			<div className={styles.navbarWrapper}>
			<AutoAffix>
				<div style={{zIndex:'10'}}>
				<Navbar bsStyle='default' collapseOnSelect staticTop>
					<Navbar.Toggle/>
					<div className={styles.navbar}>
							<Navbar.Collapse>
						<Nav>
							<LinkContainer exact to="/">
								<NavItem> Kulturindeksen 2017 </NavItem>
							</LinkContainer>
							<NavDropdown title="Analyser">
								<LinkContainer exact to='/analyser'>
									<MenuItem>1. Hva skaper kultur?</MenuItem>
								</LinkContainer>
								<LinkContainer to='/analyser/struktur'>
									<MenuItem> 2. Strukturelle variabler</MenuItem>
								</LinkContainer>
								<LinkContainer to='/analyser/metode'>
									<MenuItem> 3. Statistisk metode</MenuItem>
								</LinkContainer>
								<LinkContainer to='/analyser/resultat'>
									<MenuItem>4. Forskningsresultater</MenuItem>
								</LinkContainer>
								<LinkContainer to='/analyser/potensial'>
									<MenuItem>5. Utnytter kommunene sitt potensial på kulturfeltet?</MenuItem>
								</LinkContainer>
								<LinkContainer to='/analyser/rapport'>
									<MenuItem>6. Rapporter for kommuner og fylker</MenuItem>
								</LinkContainer>
							</NavDropdown>
							<NavDropdown title="Hovedkategorier" >
								<LinkContainer 
									to={'/kategori/indeks'}
								>
									<MenuItem> <img src={require('../data/logo/indeks.svg')} height='25px'/> Norsk Kulturindeks</MenuItem>
								</LinkContainer>
								<MenuItem divider />
								{categories.map( (e) => { 
									var logo = require('../data/logo/' + e.title.toLowerCase() + '.svg')
									return(
									<LinkContainer 
										to={'/kategori/' + e.title.toLowerCase()}
										key={e.title}
									>
										<MenuItem> <img src={logo} height='25px'/>  {e.title} </MenuItem>
									</LinkContainer>
									)}
								)}
							</NavDropdown>
							<LinkContainer to='/steder'>
								<NavItem> Steder </NavItem>
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
