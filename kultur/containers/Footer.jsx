import React from 'react'

import {Grid, Row, Col} from 'react-bootstrap'
import styles from './App.css'


export default function Footer(props) {


	return(
		<div className={styles.footer}>
			<Grid>
				<Row>
					<Col sm={3} style={{textAlign: 'center'}}>
						<p> <a href="https://www.telemarksforsking.no/medarbeidere/bard-kleppe/80/">Bård Kleppe</a> </p>
						<p> <a href="mailto:kleppe@tmforsk.no">kleppe@tmforsk.no</a> </p>
						<p>+47 911 97 543</p>
					</Col>
					<Col sm={3} style={{textAlign: 'center'}}>
						<p> <a href="https://www.telemarksforsking.no">Telemarksforsking</a> </p>
						<p style={{fontSize: '18px'}}>Postboks 4, 3833 Bø i Telemark</p>
						<p>	+47 35 06 15 00</p>
					</Col>
					<Col sm={3} style={{textAlign: 'center'}}>
						<p style={{fontSize: '18px'}}>Nettsiden er produsert av Didrik Vareide</p>
						<p><a href="mailto:dvareide@gmail.com">dvareide@gmail.com</a></p>
					</Col>
					<Col sm={3} style={{textAlign: 'center'}}>
						<p> © 2019 Telemarksforsking </p>
						<p style={{fontSize: '18px'}}>Icons made by <a style={{fontSize: '18px'}} href="http://www.freepik.com" title="Freepik">Freepik</a> from <a style={{fontSize: '18px'}} href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a style={{fontSize: '18px'}} href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
					</Col>
				</Row>
			</Grid>
		</div>
	)
}
