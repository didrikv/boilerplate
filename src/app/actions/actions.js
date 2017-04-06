export function selectFylke(Navn) {
	return {
		type: "SELECT_FYLKE",
		payload: Navn
	}
}

export function selectKommune(Nr) {
	return {
		type: "SELECT_KOMMUNE",
		payload: Nr
	}
}
