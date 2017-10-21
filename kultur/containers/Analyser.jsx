import React from 'react'
import {Route} from 'react-router-dom'
import {Grid, Row} from 'react-bootstrap'
import styles from './App.css'

export default class Analyser extends React.Component {
	constructor(props) {
		super()
	}


	render() {
		let url = this.props.match.url
		console.log(url)
		return(
			<Grid>
				<Row>
					<div className={styles.section}>
				<Route
					exact path={url + '/'}
					render={() => analyser}
				/>
				<Route
					path={url + '/struktur'}
					render={() => struktur }
				/>
				<Route
					path={url + '/metode'}
					render={() => metode}
				/>
				<Route
					path={url + '/resultat'}
					render={() => resultat}
				/>
				<Route
					path={url + '/potensial'}
					render={() => potensial}
				/>
				<Route
					path={url + '/rapport'}
					render={() => rapport}
				/>
			</div>
			</Row>
		</Grid>
		)
	}
}

let analyser = 
	<div >
		<h3>Hva skaper kultur?</h3>
		<br/>
		<p><i> Kjennetegn ved gode kulturkommuner </i></p>
		<p> Hvert år siden 2011 har Telemarksforsking målt kulturnivået i norske kommuner. Tendensen over tid er slående: De samme kommunene rangerer i toppsjiktet år etter år. Hvorfor er det slik? Hva er det Røros gjør som Rødøy ikke gjør? Hvorfor har noen kommuner har et godt kulturtilbud og en høy aktivitet innenfor kultursektoren - og andre ikke? Er det bevisste kulturpolitiske satsinger som ligger bak? Hva kan kommunene selv påvirke dersom de vil bedre det lokale kulturlivet – og hva kan de ikke gjøre noe med? </p>
		<p> Telemarksforsking har et pågående forskningsprosjekt der vi undersøker hvilke strukturelle og kulturelle faktorer som har betydning for kulturtilbud og kulturaktivitet i norske kommuner. Denne kunnskapen skal brukes til å utvikle forklaringsmodeller for hva som kjennetegner gode kulturkommuner. Slike modeller kan være viktig utviklingsverktøy for norske kommuner og fylkeskommuner. </p>
		<br/>
		<p><i>Foreløpige resultater</i></p>
		<p>Kommunene har ulike forutsetninger for å ha et godt kulturtilbud og en høy kulturaktivitet. Dette handler blant annet om kommuneøkonomi, størrelse, sentralitet og utdanningsnivå i befolkingen. Det pågående forskningsprosjektet ser på hvordan disse forutsetningene påvirker kulturnivået. Som et objektivt mål for kulturnivået benytter vi Norsk kulturindeks. Gjennom statistiske analyser har Telemarksforsking undersøkt sammenhengene mellom de strukturelle forutsetningene (innbyggertall, økonomi, sentralitet osv.) og kulturnivået i kommunene. De foreløpige analysene gjør at vi kan si noe om hvorvidt en kommune, ut fra sine statistiske forutsetninger, oppfyller sitt potensial innenfor ulike kulturområder. Vi kan dermed si noe om hvilket handlingsrom kommunen har for å bli en bedre kulturkommune. Foreløpig vet vi fremdeles lite om hvilke kulturelle faktorer som påvirker kulturtilbudet.</p>
	</div>

let struktur = 
	<div>
		<h3> Strukturelle variabler </h3>
		<br/>
		<p>De aller fleste kommuner og kulturadministrasjoner er opptatt av hvordan man kan legge til rette for kulturell aktivitet og, ikke minst, hva som skal til for å fremme en stor mengde kulturell aktivitet. Men selv om både kulturbyråkrater, politikere, lokale kreative næringer og frivillige gjør sitt beste for å fremme et levende kulturliv, kan vi anta at det finnes flere strukturelle forhold som ikke kan styres av kommunene, men som fremmer og begrenser kulturnivået.</p>
		<br/>
		<p>For hver kommune har vi samlet inn data for:</p>
		<p>1.Utdanningsnivå. Andel innbyggere med 3 år eller mer høyere utdanning. Data fra SSB.</p>
		<p>2.Befolkningsstørrelse. Logaritme av antall innbyggere i hver av de 426 (2017-) norske kommuner. Data fra SSB.</p>
		<p>3.Sentralitet / urbanisering. De sentrale variablene er arbeidsmarkedsintegrasjon og netto pendling. Arbeidsmarkedsintegrasjon måler pendlermønstre mellom kommuner i en bestemt region. En høy arbeidsmarkedsintegrasjon betyr at det er en høy grad av pendling innenfor en region. Hvis en kommune har en positiv netto pendling, betyr det at de har flere personer som pendler inn til kommunen enn ut av kommunen. Og motsatt dersom netto pendling er negativ. Data om pendlingsmønstre er hentet fra SSB.</p>
		<p>4.Besøksnæringer. Her bruker vi variabelen: antall arbeidsplasser i turistsektoren / totalt antall arbeidsplasser. Turistsektoren inkluderer overnatting, restauranter, detaljhandel, underholdning. Data fra SSB.</p>
		<p>5.Universiteter og høyskoler. Binær variabel: 1 for kommuner der et universitet eller en høgskole er lokalisert, 0 hvis ikke.</p>
		<br/>
		<p><i> Innsatsfaktorer: </i> </p>
		<p>Vi har nå presentert både sosioøkonomiske og geografiske faktorer som kan tenkes å spille en rolle. I tillegg antar vi at tilstedeværelsen av ameniteter som høyskoler eller bedrifter innen besøksnæringene kan påvirke. Vi har også inkludert to faktorer som er strukturelle, men som kommunene kan påvirke direkte: nettoutgiftene til kultur og bygging av kulturhus.</p>
		<p>6.Kommunale utgifter. Data er hentet fra Kostra/ SSB og beskriver netto driftsutgifter i kultursektoren. For de fleste av de kulturelle indikatorene bruker vi samlede netto utgifter til kultur. Imidlertid er dataene underkategorisert i 10 kategorier som beskriver utgifter i ulike kulturelle felt. I noen tilfeller gjenspeiler underkategorien den kulturelle indikatoren. Vi ser på netto utgifter til kulturskoler når vi måler mot indikatorer om kulturskoler, for eksempel. Det samme gjelder for biblioteker, museer og kinoer.</p>
		<p>7.Kulturhus. Vår liste over kulturhus er utviklet av Storm (2016). Listen er delvis basert på en artikkel i den norske avisen Aftenposten samt medlemslisten fra interesseorganisasjon for norske kulturhus som heter Norsk kulturhusnettverk. Interessegruppen hevder å omfatte om lag 95% av kulturhusene i Norge. Listen blir løpende oppdatert, dersom vi får kunnskap om kulturhus som ikke er inkludert i vår nåværende liste. Binær variabel: 1 for kommuner der en eller flere kulturhus er plassert, 0 hvis ikke.</p>
	</div>

let metode = 
	<div>
		<h3>Statistisk metode</h3>
		<br/>
		<p>Studien er satt opp som en kausal analyse som tar sikte på å avgjøre om de 37 indikatorene for en kommunes kulturtilbud og deltakelse (målt gjennom Norsk kulturindeks) påvirkes av noen av de strukturelle variablene. Vår tilnærming til denne analysen er å gjennomføre en enkel multippel regresjonsanalyse. Denne metoden ble valgt først og fremst på grunn av sin enkelhet i bruk.</p>
		<p>De 11 strukturelle variablene (A, B, C, D ...) utgjør de uavhengige variablene og er testet mot hver av de 37 indikatorene (X) for kulturtilbud og deltakelse som blir de avhengige variablene.</p>
		<p>Antallet uavhengige variabler som inngår i de 37 ulike analysene av kulturindikatorer varierer avhengig av om et signifikansnivå er funnet. Derfor utførte vi en pre-analyse utført der de strukturelle variablene som ikke har en signifikant effekt på indikatorene ble utelatt. Dette resulterte i 37 forskjellige modeller, hvor antallet forklaringsvariabler varierer etter innvirkningen på kulturindikatorene i pre-analysen. Ubetydelige variabler ble utelatt fra funksjonen.</p>
		<p>Etter pre-analysen for hver av de 37 modellene, er analysen av hver av de 37 indikatorene utført på nytt med den valgte undergruppen av uavhengige variabler.</p>
	</div>

let resultat = 
	<div>
		<h3>Forskningsresultater</h3>
		<p>Basert på de strukturelle forholdene i en gitt kommune, kan vi regne ut forventet verdi på de ulike indikatorene i kulturindeksen, noe som kan gi en antydning for det vi kaller «mulighetsrom for forbedring gitt dagens strukturelle forhold». Den statistiske modellen har imidlertid ulik forklaringskraft for de ulike indikatorene. Det betyr at vi treffer det «reelle» mulighetsrommet for forbedring bedre for noen indikator enn andre. I figuren nedenfor viser vi dette. 1 er full forklaringskraft, 0 er ingen forklaringskraft.</p>
	</div>

let potensial = 
	<div>
		<h3>Utnytter kommunene sitt potensial på kulturfeltet?</h3>
		<p>Kulturindeks-analysene forteller oss noe om forbedringspotensialet og hvilket mulighetsrom kommunen, statistisk sett, har for å forbedre seg når det gjelder ulike deler av det lokale kulturlivet. Basert på de strukturelle forholdene i en gitt kommune, kan vi regne ut forventet resultat på de ulike indikatorene i kulturindeksen. Vi kan for eksempel si noe om hva som kjennetegner en god kinokommune, og i hvilken grad kommunen ser ut til å utnytte sitt potensial innenfor dette området.</p>
		<p>Våre statistiske analyser viser at det er mange strukturelle fakturer som påvirker kinotilbudet i en kommune og at slike faktorer har en høy forklaringsverdi. Et høyt innbyggertall er viktig, et høyt utdanningsnivå, en høy andel besøksnæringer, tilstedeværelsen av en høgskole og kulturhus samt en netto innpendling til kommunen. Generelt kan man altså si at det er store kommuner med sentrumsfunksjoner som har et godt kinotilbud. I tillegg til dette påvirker den kommunale pengebruken på kino tilbudet i en positiv retning.</p>
		<p>La oss ta et eksempel fra Kristiansand kommune:</p>
		<p>Kristiansand har alle kjennetegnene på en god kinokommune. Både innbyggertall, utdanningsnivået, antallet besøksnæringer, netto innpendling, kulturhus- og utdanningstilbud på universitetsnivå skulle tilsi at kommunen hadde et godt kinotilbud. Basert på de statistiske analysene, kunne man forventet seg et kinotilbud bestående av 120 forestillinger pr. tusen innbyggere i 2016. Dette er høyere enn den faktiske situasjonen, så Kristiansand utnytter ikke potensialet sitt ut når det gjelder kinotilbud. Motsatt er kinobesøket i Kristiansand i 2016 litt høyere forventet.</p>
	</div>

let rapport = 
	<div>
	<h3>Rapporter for kommuner og fylker</h3>
	<p>Telemarksforsking tilbyr regionale analyser med utgangspunkt i bakgrunnsdataene fra Norsk kulturindeks. Disse er godt egnet til å beskrive kulturlivet i de norske kommunene. 2017-rapportene er utvidet med en rekke nye data, samt potensialberegninger for alle områdene i Norsk kulturindeks.</p>
	<p>Kommunerapporter kan i 2017 produseres for kr 30.000 + mva. Vi utarbeider også en forenklet powerpoint-versjon for kr 10.000 + mva.</p>
	<p>Fylkesrappporter kan i 2017 produseres for kr 60.000 + mva. </p>
	<p><a href="http://www.telemarksforsking.no/publikasjoner/resultat.asp?sok=nk">Se eksempler på rapporter fra alle år her</a></p>
	<p>For bestilling og informasjon, kontakt <a href="http://www.telemarksforsking.no/medarbeidere/Detalj.asp?id=80&merket=6">Bård Kleppe</a>, <a href="http://www.telemarksforsking.no/medarbeidere/detalj.asp?id=146&merket=6">Svenja Doreen Roncossek</a> eller <a href="http://www.telemarksforsking.no/medarbeidere/detalj.asp?id=136&merket=6">Gunn Kristin Leikvoll</a> </p>
	</div>












