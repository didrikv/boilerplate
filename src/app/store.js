import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"

import reducer from "./reducers/reducer.js"

const middelware = applyMiddleware(thunk, logger)

export default createStore(reducer, middelware)
