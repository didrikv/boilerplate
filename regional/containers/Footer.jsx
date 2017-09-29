import React from 'react'

import {Grid, Row, Col} from 'react-bootstrap'
import styles from './App.css'


export default function Footer(props) {


	return(
		<div className={styles.footer}>
			<Grid>
				<Row>
					<Col sm={4} style={{textAlign: 'center'}}>
						<p> <a href="www.telemarksforsking.no/medarbeidere/detalj.asp?id=13&merket=6">Knut Vareide</a> </p>
						<p> <a href="mailto:vareide@tmforsk.no">vareide@tmforsk.no</a> </p>
						<p>+47 982 20 004</p>
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
