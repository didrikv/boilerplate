import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"

import reducer from "./reducers/reducer.js"

const middelware = applyMiddleware(thunk)

export default createStore(reducer, middelware)
