import React from "react"
import { render } from "react-dom"
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import store from "./store.js"
import routes from "./routes.js"

const root = document.getElementById("root")

render(
	<Provider store={store}>
		<Router routes={routes} history={browserHistory} />
	</Provider>
,root)

