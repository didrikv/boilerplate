import React from 'react'
import { render } from 'react-dom'
import App from './containers/App.jsx'
import dataStore from './dataStore2.js'


const root = document.getElementById('root')

render(<App dataStore={dataStore}/>, root)
