const express = require("express")
const expressStaticGzip = require("express-static-gzip")
const favicon = require("serve-favicon")
const vhost = require("vhost")
const app = express()

app.use(favicon(__dirname + "/favicon.ico"))

app.use('/', expressStaticGzip(__dirname + "/public"))
app.use(vhost('attraktivitetsanalyse.no', (req, res) => res.sendFile(__dirname + '/public/attraktivitet/index.html')))
app.use(vhost('attraktivitetsanalyser.no', (req, res) => res.sendFile(__dirname + '/public/attraktivitet/index.html')))
app.use(vhost('kulturindeks.no', (req, res) => res.sendFile(__dirname + '/public/kultur/index.html')))
app.use(vhost('kulturindeksen.no', (req, res) => res.sendFile(__dirname + '/public/kultur/index.html')))
app.use(vhost('naringslivsindeksen.no', (req, res) => res.sendFile(__dirname + '/public/naring/index.html')))
app.use(vhost('næringslivsindeksen.no', (req, res) => res.sendFile(__dirname + '/public/naring/index.html')))
app.use(vhost('regionalanalyse.no', (req, res) => res.sendFile(__dirname + '/public/regional/index.html')))
app.use(vhost('regionaleanalyser.no', (req, res) => res.sendFile(__dirname + '/public/regional/index.html')))

app.listen(3000, () => {
	console.log("Server running, and listening on port 3000")
})
