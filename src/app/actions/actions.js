export function selectFylke(Nr) {
	return {
		type: "SELECT_FYLKE",
		payload: Nr
	}
}

export function selectKommune(Nr) {
	return {
		type: "SELECT_KOMMUNE",
		payload: Nr
	}
}
