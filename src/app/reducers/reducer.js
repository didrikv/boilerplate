export default function reducer(state = {fylke: 8, kommune: 821}, action) {
	switch(action.type) {
		case "SELECT_FYLKE": {
			return {...state, fylke: action.payload}
		}
	}
	switch(action.type) {
		case "SELECT_KOMMUNE": {
			return {...state, kommune: action.payload}
		}
	}
	return state
}
