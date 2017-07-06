let inputfile = require("./WebInput v2.1 6dec.js").inputstring

let rows = inputfile.split("\n")
let data = {}
data.vars = rows[0].split(",")

for(let i = 1; i < rows.length; i++) {
	let row = rows[i].split(",")
	for(let e in row) {
		row[e] = isNaN(row[e]) ? row[e] : +row[e]
	}
	let year = row[data.vars.indexOf("År")]
	if(!data[year]) {data[year]=[]}
	data[year].push(row)
}

export default data

