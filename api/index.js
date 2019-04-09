'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3978;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dbRecetario', (err, res) => {
	if(err){
		throw err;
	} else {
		console.log("La base de datos está corriendo correctamente...");

		app.listen(port, function(){
			console.log("Servidor del API Rest de musica escuchando en http://localhost:" + port);
		})
	}
});