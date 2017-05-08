export default function reducer(state = {year:2015, domain:"Bosted"}, action) {
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
		default:
			return state
	}
}
