const express = require("express")
const app = express()

app.use(express.static(__dirname + "/src/build"))

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/src/build/index.html")
})

app.listen(3000, () => {
	console.log("Server running, and listening on port 3000")
})

