import React from 'react'

export default function Table(props) {
	return (
		<div>
			<style
				type="text/css"
				dangerouslySetInnerHTML={{
					__html:
						'\n.tg  {border-collapse:collapse;border-spacing:0;}\n.tg td{font-family:Arial, sans-serif;font-size:14px;padding:1px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}\n.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}\n.tg .tg-95q0{background-color:#75a9dc;color:#ffffff;border-color:black}\n.tg .tg-pnvs{font-weight:bold;background-color:#807f83;color:#ffffff;border-color:black;text-align:center}\n.tg .tg-icwe{background-color:#00546d;color:#ffffff;border-color:black;text-align:center}\n.tg .tg-28d0{background-color:#b1c88a}\n'
				}}
			/>
			<table className="tg">
				<tbody>
					<tr>
						<th className="tg-pnvs">Kategori</th>
						<th className="tg-pnvs">Kilde</th>
						<th className="tg-pnvs">Vekting</th>
					</tr>
					<tr>
						<td className="tg-icwe" colSpan={3}>
							1 KUNSTNERE
						</td>
					</tr>
					<tr>
						<td className="tg-28d0">1a Forfattere</td>
						<td className="tg-28d0">DNF, Dramatikerforbundet, NBU og Norsk oversetterforening</td>
						<td className="tg-28d0">2%</td>
					</tr>
					<tr>
						<td className="tg-28d0">1b Musikere og komponister</td>
						<td className="tg-28d0">Creo, Folkorg, Gramart, NOPA, Norsk Jazzforum og Norsk komponistforening</td>
						<td className="tg-28d0">2%</td>
					</tr>
					<tr>
						<td className="tg-28d0">1c Scenekunstnere</td>
						<td className="tg-28d0">Norsk Filmforbund, Norsk Skuespillerforbund, Norske dansekunstnere og Norske filmregissører</td>
						<td className="tg-28d0">2%</td>
					</tr>
					<tr>
						<td className="tg-28d0">1d Visuelle kunstnere</td>
						<td className="tg-28d0">FFF, Grafil, NIL, Norske billedkunstnere, Norske husflidshåndverkere, Norske kunsthåndverkere og UKS</td>
						<td className="tg-28d0">2%</td>
					</tr>
					<tr>
						<td className="tg-28d0">
							1c Tildelinger fra Statens kunstnerstipend
						</td>
						<td className="tg-28d0">Statens kunstnerstipend</td>
						<td className="tg-28d0">2%</td>
					</tr>
					<tr>
						<td className="tg-icwe" colSpan={3}>
							2 KULTURARBEIDERE
						</td>
					</tr>
					<tr>
						<td className="tg-28d0">
							2a Sysselsatte innen kunstnerisk produksjon
						</td>
						<td className="tg-28d0">
							SSB sin sysselsettingsstatistikk (SN2007)
						</td>
						<td className="tg-28d0">3,3 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">2b Sysselsatte innen kulturformidling</td>
						<td className="tg-28d0">
							SSB sin sysselsettingsstatistikk (SN2007)
						</td>
						<td className="tg-28d0">3,3 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">2a Sysselsatte i media</td>
						<td className="tg-28d0">
							SSB sin sysselsettingsstatistikk (SN2007)
						</td>
						<td className="tg-28d0">3,3 %</td>
					</tr>
					<tr>
						<td className="tg-icwe" colSpan={3}>
							3 MUSEUM
						</td>
					</tr>
					<tr>
						<td className="tg-28d0">3a Besøkstall, totalt</td>
						<td className="tg-28d0">Norsk kulturråd</td>
						<td className="tg-28d0">3,33 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">3b: Besøkstall, betalende</td>
						<td className="tg-28d0">Norsk kulturråd</td>
						<td className="tg-28d0">3,33 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">3c: Utstillinger og arrangementer</td>
						<td className="tg-28d0">Norsk kulturråd</td>
						<td className="tg-28d0">3,33 %</td>
					</tr>
					<tr>
						<td className="tg-icwe" colSpan={3}>
							4 MUSIKK
						</td>
					</tr>
					<tr>
						<td className="tg-28d0">
							4a Billettinntekter for konserter billettselskaper
						</td>
						<td className="tg-28d0">
							Ticketmaster, Billettportalen, TicketCo, eBillett, Hoopla, Aurora,
							Ringbillett, Linticket og Tikkio{' '}
						</td>
						<td className="tg-28d0">10.00%</td>
					</tr>
					<tr>
						<td className="tg-icwe" colSpan={3}>
							5 KINO
						</td>
					</tr>
					<tr>
						<td className="tg-28d0">5a Antall filmfremvisninger totalt</td>
						<td className="tg-28d0">KOSTRA/SSB</td>
						<td className="tg-28d0">2,50 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">5b Antall kinobesøk totalt</td>
						<td className="tg-28d0">KOSTRA/SSB</td>
						<td className="tg-28d0">2,50 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">5c Mangfold filmframvisninger</td>
						<td className="tg-28d0">KOSTRA/SSB</td>
						<td className="tg-28d0">2,50 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">5d Mangfold kinobesøk</td>
						<td className="tg-28d0">KOSTRA/SSB</td>
						<td className="tg-28d0">2,50 %</td>
					</tr>
					<tr>
						<td className="tg-icwe" colSpan={3}>
							6 BIBLIOTEK
						</td>
					</tr>
					<tr>
						<td className="tg-28d0">
							6a Totalt utlån fra folkebibliotek (alle medier)
						</td>
						<td className="tg-28d0">
							Folkebibliotekstatistikk fra Nasjonalbiblioteket
						</td>
						<td className="tg-28d0">2,50%</td>
					</tr>
					<tr>
						<td className="tg-28d0">6b Antall besøk i folkebibliotek</td>
						<td className="tg-28d0">KOSTRA/SSB</td>
						<td className="tg-28d0">2,50 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">6c Voksne aktive lånere</td>
						<td className="tg-28d0">
							Folkebibliotekstatistikk fra Nasjonalbiblioteket
						</td>
						<td className="tg-28d0">2,50 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">
							6d Antall deltagere på arrangementer i folkebibliotekene
						</td>
						<td className="tg-28d0">
							Folkebibliotekstatistikk fra Nasjonalbiblioteket
						</td>
						<td className="tg-28d0">2,50 %</td>
					</tr>
					<tr>
						<td className="tg-icwe" colSpan={3}>
							7 SCENEKUNST
						</td>
					</tr>
					<tr>
						<td className="tg-28d0">7a Antall teaterforestillinger</td>
						<td className="tg-28d0">
							NTO statistikk + tilsendte lister fra regionteatre
						</td>
						<td className="tg-28d0">3,3 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">7b Teaterpublikum</td>
						<td className="tg-28d0">
							NTO statistikk + tilsendte lister fra regionteatre
						</td>
						<td className="tg-28d0">3,3 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">7c Antall danseforestillinger</td>
						<td className="tg-28d0">Danseinformasjonen</td>
						<td className="tg-28d0">3,3 %</td>
					</tr>
					<tr>
						<td className="tg-icwe" colSpan={3}>
							8 KULTUR FOR BARN
						</td>
					</tr>
					<tr>
						<td className="tg-95q0" colSpan={2}>
							KULTURSKOLE
						</td>
						<td className="tg-95q0">7,50 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">
							8a Antall årstimer totalt i kulturskolen
						</td>
						<td className="tg-28d0">GSI</td>
						<td className="tg-28d0">2,50 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">8b Bredden i kulturskoletilbudet</td>
						<td className="tg-28d0">GSI</td>
						<td className="tg-28d0">2,50 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">
							8c Antall elever fra kommunen i kulturskole
						</td>
						<td className="tg-28d0">KOSTRA/SSB</td>
						<td className="tg-28d0">2,50 %</td>
					</tr>
					<tr>
						<td className="tg-95q0" colSpan={2}>
							DEN KULTURELLE SKOLESEKKEN
						</td>
						<td className="tg-95q0">2,50 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">8d Antall DKS-besøk</td>
						<td className="tg-28d0">DKS-sekretariatet </td>
						<td className="tg-28d0">1,25 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">8d Bredden i DKS-tilbudet</td>
						<td className="tg-28d0">DKS-sekretariatet</td>
						<td className="tg-28d0">1,25 %</td>
					</tr>
					<tr>
						<td className="tg-icwe" colSpan={3}>
							9 SENTRALE TILDELINGER
						</td>
					</tr>
					<tr>
						<td className="tg-28d0">
							9a Kulturfondtildelinger + tilskudd over statsbudsjettet
						</td>
						<td className="tg-28d0">Norsk kulturråd</td>
						<td className="tg-28d0">3,3 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">9b Tildelinger Frifond</td>
						<td className="tg-28d0">Frifond</td>
						<td className="tg-28d0">3,3 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">9c Tildelinger Riksantikvaren</td>
						<td className="tg-28d0">Norsk kulturminnefond</td>
						<td className="tg-28d0">3,3 %</td>
					</tr>
					<tr>
						<td className="tg-icwe" colSpan={3}>
							10 FRIVILLIGHET
						</td>
					</tr>
					<tr>
						<td className="tg-28d0">10a Mva.-refusjon siste tre år</td>
						<td className="tg-28d0">Lotteri- og stiftelsestilsynet</td>
						<td className="tg-28d0">2,50 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">10b Antall korpsmedlemmer</td>
						<td className="tg-28d0">Norges musikkorps forbund og Korpsnett</td>
						<td className="tg-28d0">1,25 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">10d Antall historielagsmedlemmer</td>
						<td className="tg-28d0">Landslaget for historielag</td>
						<td className="tg-28d0">1,25 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">10c Antall kormedlemmer</td>
						<td className="tg-28d0">
							Norsk sangerforbund, Norges Korforbund, Norsk sangerforum, Ung i
							Kor og KOSTRA
						</td>
						<td className="tg-28d0">1,25 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">10e Antall husflidsmedlemmer</td>
						<td className="tg-28d0">Norges husflidslag</td>
						<td className="tg-28d0">1,25 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">10f Deltagere voksenopplæring</td>
						<td className="tg-28d0">
							VOX, nasjonalt fagorgan for kompetansepolitikk
						</td>
						<td className="tg-28d0">1,25 %</td>
					</tr>
					<tr>
						<td className="tg-28d0">10g Antall kunstforeningsmedlemmer</td>
						<td className="tg-28d0">Norske kunstforeninger</td>
						<td className="tg-28d0">1,25 %</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
