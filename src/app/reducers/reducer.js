let defaultState = {
	year:2015,
	domain:"Samlet attraktivitet",
	fylke:8,
	kommune:821,
	inndeling:"kommune"
}

export default function reducer(state = defaultState, action) {
	switch(action.type) {
		case "SELECT_FYLKE": {
			return {...state, fylke: action.payload}
		}
		case "SELECT_KOMMUNE": {
			return {...state, kommune: action.payload}
		}
		case "SELECT_YEAR": {
			return {...state, year: action.payload}
		}
		case "SELECT_DOMAIN": {
			return {...state, domain: action.payload}
		}
		case "SELECT_INNDELING": {
			return {...state, inndeling: action.payload}
		}
		default:
			return state
	}
}
