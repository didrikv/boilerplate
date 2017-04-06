export default function reducer(state = {selected: null}, action) {
	switch(action.type) {
		case "SELECT_AREA": {
			return {...state, selected: action.payload}
		}
	}
	return state
}
