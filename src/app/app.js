import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"
import Chart from "./components/Chart.js"

import store from "./store.js"

const app = document.getElementById("app")

ReactDom.render(
	<Chart/>
,app)

