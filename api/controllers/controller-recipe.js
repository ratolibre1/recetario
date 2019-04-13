'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

/*var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');*/

/*function getSong(req, res){
	var songId = req.params.id;

	Song.findById(songId).populate({path: 'album'}).exec((err, song) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		} else {
			if(!song){
				res.status(404).send({message: 'La canción no existe'});
			} else {
				res.status(200).send({song});
			}
		}
	});
}*/

/*function getSongs(req, res){
	var albumId = req.params.album;

	if(!albumId){
		//Mostrar todas las canciones
		var find = Song.find({}).sort('number');
	} else {
		//Mostrar las canciones del album
		var find = Song.find({album: albumId}).sort('number');
	}

	find.populate({
			path: 'album',
			populate: {
				path: 'artist',
				model: 'Artist'
			}
		}).exec((err, songs) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		} else {
			if(!songs){
				res.status(404).send({message: 'No hay canciones'});
			} else {
				return res.status(200).send({songs});
			}
		}
	});
}*/

/*function saveSong(req, res) {
	var song = new Song();

	var params = req.body;

	song.name = params.name;
	song.number = params.number;
	song.duration = params.duration;
	song.file = 'null';
	song.album = params.album;

	song.save((err, songStored) => {
		if(err){
			res.status(500).send({message: 'Error al guardar Canción'});
		} else {
			if(!songStored){
				res.status(404).send({message: 'La canción no ha sido guardada'});
			} else {
				res.status(200).send({song: songStored});
			}
		}
	});
}*/

/*function updateSong(req, res){
	var songId = req.params.id;
	var update = req.body;

	Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar la canción'});
		} else {
			if(!songUpdated){
				res.status(404).send({message: 'La canción no ha sido actualizada'});
			} else {
				res.status(200).send({song: songUpdated});
			}
		}
	});
}

function deleteSong(req, res){
	var songId = req.params.id;

	Song.findByIdAndRemove(songId, (err, songRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar la canción'});
		} else {
			if(!songRemoved){
				res.status(404).send({message: 'La canción no ha sido eliminada'});
			} else {
				res.status(200).send({song: songRemoved});
			}
		}
	});
}*/

/*function uploadFile(req, res){
	var songId = req.params.id;
	var fileName = 'No subido...';

	if(req.files){
		var filePath = req.files.file.path;
		var fileSplit = filePath.split('\\');
		var fileName = fileSplit[2];

		var extSplit = fileName.split('\.');
		var fileExt = extSplit[1];

		if(fileExt == 'mp3' || fileExt == 'ogg'){
			Song.findByIdAndUpdate(songId, {file: fileName}, (err, songUpdated) => {
				if(!songUpdated){
					res.status(404).send({message: 'Error al actualizar la canción'});
				} else {
					res.status(200).send({song: songUpdated});
				}
			});
		} else {
			res.status(200).send({message: 'Extensión de archivo no válida'});
		}

		console.log(fileSplit);
	} else {
		res.status(200).send({message: 'No has subido ninguna pista...'});
	}
}*/

/*function getFile(req, res){
	var file = req.params.file;
	var pathFile = './uploads/songs/' + file;

	fs.exists(pathFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile));
		} else {
			res.status(200).send({message: 'No existe la pista...'});
		}
	});
}*/

module.exports = {
	/*getSong,
	getSongs,
	saveSong,
	updateSong,
	deleteSong,
	uploadFile,
	getFile*/
}