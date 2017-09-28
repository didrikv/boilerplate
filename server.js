const express = require("express")
const expressStaticGzip = require("express-static-gzip")
const favicon = require("serve-favicon")
const app = express()

app.use(favicon(__dirname + "/favicon.ico"))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/regional/index.html')
})

app.use('/', expressStaticGzip(__dirname + "/public"))

app.get('/naring/*', (req, res) => {
	res.sendFile(__dirname + '/public/naring/index.html')
})

app.get('/attraktivitet/*', (req, res) => {
	res.sendFile(__dirname + '/public/attraktivitet/index.html')
})


app.get('/kultur/*', (req, res) => {
	res.sendFile(__dirname + '/public/kultur/index.html')
})

app.listen(3000, () => {
	console.log("Server running, and listening on port 3000")
})
