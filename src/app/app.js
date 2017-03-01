import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"

import store from "./store.js"

const app = document.getElementById("app")

ReactDom.render(
	<p>Jon Gudmund, slutt aa drikk saa mye!!</p>
,app)

