const express = require("express")
var expressStaticGzip = require("express-static-gzip")
const app = express()

app.use(expressStaticGzip(__dirname + "/src/build"))

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/src/build/index.html")
})

app.get('/test', (req, res) => {
	res.sendFile(__dirname + "/src/build/index.html")
})

app.listen(3000, () => {
	console.log("Server running, and listening on port 3000")
})

