import React from 'react'

import {Grid, Row, Col} from 'react-bootstrap'
import styles from './App.css'


export default function Footer(props) {


	return(
		<div className={styles.footer}>
			<Grid>
				<Row>
					<Col sm={4} style={{textAlign: 'center'}}>
						<p> <a href="www.telemarksforsking.no/medarbeidere/detalj.asp?id=80&merket=6">Bård Kleppe</a> </p>
						<p> <a href="mailto:kleppe@tmforsk.no">kleppe@tmforsk.no</a> </p>
						<p>+47 911 97 543</p>
					</Col>
					<Col sm={4} style={{textAlign: 'center'}}>
						<p> <a href="www.telemarksforsking.no">Telemarksforsking</a> </p>
						<p>Postboks 4, 3833 Bø i Telemark</p>
						<p>	+47 35 06 15 00</p>
					</Col>
					<Col sm={4} style={{textAlign: 'center'}}>
						<p> © 2017 Telemarksforsking </p>
					</Col>
				</Row>
			</Grid>
		</div>
	)
}
