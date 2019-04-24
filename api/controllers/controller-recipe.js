'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var Recipe = require('../models/model-recipe');
var User = require('../models/model-user');
var Ingredient = require('../models/model-ingredient');
var Category = require('../models/model-category');

function getRecipe(req, res){
	var recipeId = req.params.id;

	Recipe.findById(recipeId).exec((err, recipe) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		} else {
			if(!recipe){
				res.status(404).send({message: 'La receta no existe'});
			} else {
				res.status(200).send({recipe});
			}
		}
	});
}

//VERSION BETA
function getRecipes(req, res){
	if(req.params.page){
		var page = req.params.page;
	} else {
		var page = 1;
	}	
	var itemsPerPage = 999;

	Recipe.find().sort('name').paginate(page, itemsPerPage, function(err, recipes, total){
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		} else {
			if(!recipes){
				res.status(404).send({message: 'No hay recetas'});
			} else {
				return res.status(200).send({
					total: total,
					recipes: recipes
				});
			}
		}
	});
}

function saveRecipe(req, res) {
	var recipe = new Recipe();

	var params = req.body;

	recipe.name = params.name;
	recipe.desc = params.desc;
	recipe.author = params.author;
	recipe.category = params.category;
	recipe.ingredients = params.ingredients;
	recipe.steps = params.steps;
	recipe.image = params.image;
	recipe.thumbnail = params.thumbnail;
	recipe.portions = params.portions;
	recipe.difficulty = params.difficulty;
	recipe.cookingTime = params.cookingTime;
	recipe.comment = params.comment;

	recipe.save((err, recipeStored) => {
		if(err){
			res.status(500).send({message: 'Error al guardar Receta'});
		} else {
			if(!recipeStored){
				res.status(404).send({message: 'La Receta no ha sido guardada'});
			} else {
				res.status(200).send({recipe: recipeStored});
			}
		}
	});
}

function updateRecipe(req, res){
	var recipeId = req.params.id;
	var update = req.body;

	Recipe.findByIdAndUpdate(recipeId, update, (err, recipeUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar la Receta'});
		} else {
			if(!recipeUpdated){
				res.status(404).send({message: 'La Receta no ha sido actualizada'});
			} else {
				res.status(200).send({recipe: recipeUpdated});
			}
		}
	});
}

function deleteRecipe(req, res){
	var recipeId = req.params.id;

	Recipe.findByIdAndRemove(recipeId, (err, recipeRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar la Receta'});
		} else {
			if(!recipeRemoved){
				res.status(404).send({message: 'La Receta no ha sido eliminada'});
			} else {
				res.status(200).send({recipe: recipeRemoved});
			}
		}
	});
}

function uploadImage(req, res) {
	var recipeId = req.params.id;
	var fileName = 'No subido...';

	if(req.files){
		var filePath = req.files.image.path;
		var fileSplit = filePath.split('\\');
		var fileName = fileSplit[3];

		var extSplit = fileName.split('\.');
		var fileExt = extSplit[1];

		if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif'){
			Recipe.findByIdAndUpdate(recipeId, {image: fileName}, (err, recipeUpdated) => {
				if(!recipeUpdated){
					res.status(404).send({message: 'Error al actualizar la receta'});
				} else {
					res.status(200).send({
						recipe: recipeUpdated,
						image: fileName
					});
				}
			});
		} else {
			res.status(200).send({message: 'Extensión de archivo no válida'});
		}
	} else {
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

function uploadThumb(req, res) {
	var recipeId = req.params.id;
	var fileName = 'No subido...';

	if(req.files){
		var filePath = req.files.image.path;
		var fileSplit = filePath.split('\\');
		var fileName = fileSplit[3];

		var extSplit = fileName.split('\.');
		var fileExt = extSplit[1];

		if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif'){
			Recipe.findByIdAndUpdate(recipeId, {thumbnail: fileName}, (err, recipeUpdated) => {
				if(!recipeUpdated){
					res.status(404).send({message: 'Error al actualizar la receta'});
				} else {
					res.status(200).send({
						recipe: recipeUpdated,
						thumbnail: fileName
					});
				}
			});
		} else {
			res.status(200).send({message: 'Extensión de archivo no válida'});
		}
	} else {
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

function getImage(req, res){
	var imageFile = req.params.image;
	var imageFolder = req.params.folder;
	var pathFile = './uploads/recipes/' + imageFolder + '/' + imageFile;

	fs.exists(pathFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile));
		} else {
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

module.exports = {
	getRecipe,
	getRecipes,
	saveRecipe,
	updateRecipe,
	deleteRecipe,
	uploadImage,
	uploadThumb,
	getImage
}