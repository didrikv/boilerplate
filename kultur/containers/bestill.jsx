import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import styles from './App.css'

export default function Bestill(props) {
	return(
		<Grid>
			<Row>
				<div className={styles.section}>
					<h3>Bestill rapport</h3>
					<p>Datamaterialet i Norsk kulturindeks muliggjør en rekke statistiske analyser og sammenligninger, og brukes som kunnskapsgrunnlag for kommuneadministrasjon og politikere i mange norske kommuner. Med basis i indeksen leverer Telemarksforsking ulike typer rapporter som kunnskapsgrunnlag for kulturplanprosesser, planlegging av nytt kulturhus, utredninger av regionale samarbeid med mer. Rapportene er godt egnet til å beskrive kulturlivet i en kommune, region eller fylke – og hvilket mulighetsrom som finnes på de ulike kulturområdene. Slike rapporter kan være til god hjelp i utarbeidelse av bl.a. planer, søknader og rapporteringer.</p>
					<p>En standard kommunerapport kan i 2019 produseres for kr 35.000 + mva. Vi utarbeider også en forenklet powerpoint-versjon for kr 15.000 + mva.</p>
					<p>Standard fylkesrapporter kan i 2019 produseres for kr 60.000 + mva. </p>
					<p><a href="https://www.telemarksforsking.no/prosjekter/norsk-kulturindeks-2018/20180960/">Se eksempler på rapporter fra alle år her</a></p>
					<p>For bestilling og informasjon, kontakt <a href="https://www.telemarksforsking.no/medarbeidere/bard-kleppe/80/">Bård Kleppe</a>,  eller <a href="https://www.telemarksforsking.no/medarbeidere/kristine-persdatter-miland/169/">Kristine P. Miland</a> </p>
				</div>
			</Row>
		</Grid>
	)
}

