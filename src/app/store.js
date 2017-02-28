import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"

import reducer from "./reducers/reducer.js"

const middelware = applyMiddleware(thunk, logger())

export default createStore(reducer, middelware)
