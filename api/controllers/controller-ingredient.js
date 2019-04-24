'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var Ingredient = require('../models/model-ingredient');

function getIngredient(req, res){
	var ingredientId = req.params.id;

	Ingredient.findById(ingredientId, (err, ingredient) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		} else {
			if(!ingredient){
				res.status(404).send({message: 'El ingrediente no existe'});
			} else {
				res.status(200).send({ingredient});
			}
		}
	});
}

function getIngredients(req, res){
	if(req.params.page){
		var page = req.params.page;
	} else {
		var page = 1;
	}	
	var itemsPerPage = 4;

	Ingredient.find().sort('name').paginate(page, itemsPerPage, function(err, ingredients, total){
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		} else {
			if(!ingredients){
				res.status(404).send({message: 'No hay ingredientes'});
			} else {
				return res.status(200).send({
					total: total,
					ingredients: ingredients
				});
			}
		}
	});
}

function saveIngredient(req, res) {
	var ingredient = new Ingredient();

	var params = req.body;

	ingredient.name = params.name;
	ingredient.desc = params.desc;
	ingredient.image = params.image;

	ingredient.save((err, ingredientStored) => {
		if(err){
			res.status(500).send({message: 'Error al guardar Ingrediente'});
		} else {
			if(!ingredientStored){
				res.status(404).send({message: 'El Ingrediente no ha sido almacenado'});
			} else {
				res.status(200).send({ingredient: ingredientStored});
			}
		}
	});
}

function updateIngredient(req, res){
	var ingredientId = req.params.id;
	var update = req.body;

	Ingredient.findByIdAndUpdate(ingredientId, update, (err, ingredientUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar Ingrediente'});
		} else {
			if(!ingredientUpdated){
				res.status(404).send({message: 'El Ingrediente no ha sido actualizado'});
			} else {
				res.status(200).send({ingredient: ingredientUpdated});
			}
		}
	});
}

function deleteIngredient(req, res){
	var ingredientId = req.params.id;

	Ingredient.findByIdAndRemove(ingredientId, (err, ingredientRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar Ingrediente'});
		} else {
			if(!ingredientRemoved){
				res.status(404).send({message: 'El Ingrediente no ha sido eliminado'});
			} else {
				res.status(200).send({ingredient: ingredientRemoved});
			}
		}
	});
}

function uploadImage(req, res) {
	var ingredientId = req.params.id;
	var fileName = 'No subido...';

	if(req.files){
		var filePath = req.files.image.path;
		var fileSplit = filePath.split('\\');
		var fileName = fileSplit[2];

		var extSplit = fileName.split('\.');
		var fileExt = extSplit[1];

		if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif'){
			Ingredient.findByIdAndUpdate(ingredientId, {image: fileName}, (err, ingredientUpdated) => {
				if(!ingredientUpdated){
					res.status(404).send({message: 'Error al actualizar el ingrediente'});
				} else {
					res.status(200).send({
						ingredient: ingredientUpdated,
						image: fileName
					});
				}
			});
		} else {
			res.status(200).send({message: 'Extensión de archivo no válida'});
		}

		console.log(fileSplit);
	} else {
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

function getImage(req, res){
	var imageFile = req.params.image;
	var pathFile = './uploads/ingredients/' + imageFile;

	fs.exists(pathFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile));
		} else {
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

module.exports = {
	getIngredient,
	getIngredients,
	saveIngredient,
	updateIngredient,
	deleteIngredient,
	uploadImage,
	getImage
}