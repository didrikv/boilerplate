import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"

import store from "./store.js"

const app = document.getElementById("app")

ReactDom.render(
	<p>Fuck Yeah, deploying like a Boss!!!</p>
,app)

