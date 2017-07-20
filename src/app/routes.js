import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from "./app.js"

export const routes = (
	<Route path='/' component={App} title="Awesome Website" />
)

export default routes
