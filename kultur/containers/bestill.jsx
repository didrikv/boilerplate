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
					<p>En standard kommunerapport kan i 2018 produseres for kr 30.000 + mva. Vi utarbeider også en forenklet powerpoint-versjon for kr 10.000 + mva.</p>
					<p>Standard fylkesrapporter kan i 2018 produseres for kr 60.000 + mva. </p>
					<p><a href="http://www.telemarksforsking.no/publikasjoner/resultat.asp?sok=nk">Se eksempler på rapporter fra alle år her</a></p>
					<p>For bestilling og informasjon, kontakt <a href="http://www.telemarksforsking.no/medarbeidere/Detalj.asp?id=80&merket=6">Bård Kleppe</a>, <a href="http://www.telemarksforsking.no/medarbeidere/detalj.asp?id=146&merket=6">Svenja Doreen Roncossek</a> eller <a href="http://www.telemarksforsking.no/medarbeidere/detalj.asp?id=136&merket=6">Gunn Kristin Leikvoll</a> </p>
				</div>
			</Row>
		</Grid>
	)
}

