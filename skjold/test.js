var request = require('request')
var fs = require('pn/fs')
var indeks = require('./skjoldindeks.json')
var svg2png = require('svg2png')

//request('https://commons.wikimedia.org/wiki/Special:Redirect/file/Halden_komm.svg').pipe(fs.createWriteStream('101.svg'))
//indeks.forEach( (e) => {
//	request('https://commons.wikimedia.org/wiki/Special:Redirect/file/' + e.File).pipe(fs.createWriteStream(e.Nr + '.svg'))
//	console.log("Finnished with " + e.File)
//})

indeks.forEach( (e) => {
	fs.readFile(e.Nr + '.svg')
		.then(buffer => svg2png(buffer, {width: 50, height: 60}))
		.then(buffer => fs.writeFile(e.Nr + '.png', buffer))
		.catch( e => console.error(e) )
})




