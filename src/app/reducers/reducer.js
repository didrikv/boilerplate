let defaultState = {
	year:[2007, 2008, 2009, 2010, 2011, 2012, 2013],
	domain:"Samlet attraktivitet",
	fylke:8,
	kommune:821,
	inndeling:"kommune",
	population: 0
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
		case "SELECT_POPULATION": {
			return {...state, population: action.payload}
		}
		default:
			return state
	}
}
