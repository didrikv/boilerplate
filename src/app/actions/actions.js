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

export function selectYear(year) {
	return {
		type: "SELECT_YEAR",
		payload: year
	}
}

export function selectDomain(domain) {
	return {
		type: "SELECT_DOMAIN",
		payload: domain
	}
}
