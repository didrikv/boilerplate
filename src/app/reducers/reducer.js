let defaultState = {
	year:[2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
	domain:"Samlet attraktivitet",
	fylke:8,
	kommune:821,
	inndeling:"kommune",
	population: 0,
	Nr: 821,
	search: [],
	bestControl: false,
	variable: "Forventet Befolkningsvekst",
	pane: 1
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
		case "SELECT_NR": {
			return {...state, Nr: action.payload}
		}
		case "SELECT_SEARCH": {
			return {...state, search: action.payload}
		}
		case "SELECT_BESTCONTROL": {
			return {...state, bestControl: action.payload}
		}
		case "SELECT_VARIABLE": {
			return {...state, variable: action.payload}
		}
		case "SELECT_PANE": {
			return {...state, pane: action.payload}
		}
		default:
			return state
	}
}
