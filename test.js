const express = require('express')
const app = express()
const expressStaticGzip = require("express-static-gzip")

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
