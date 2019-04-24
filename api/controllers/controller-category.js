'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var Category = require('../models/model-category');

function getCategory(req, res){
	var categoryId = req.params.id;

	Category.findById(categoryId, (err, category) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		} else {
			if(!category){
				res.status(404).send({message: 'La categoría no existe'});
			} else {
				res.status(200).send({category});
			}
		}
	});
}

function getCategories(req, res){
	if(req.params.page){
		var page = req.params.page;
	} else {
		var page = 1;
	}	
	var itemsPerPage = 4;

	Category.find().sort('name').paginate(page, itemsPerPage, function(err, categories, total){
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		} else {
			if(!categories){
				res.status(404).send({message: 'No hay categorías'});
			} else {
				return res.status(200).send({
					total: total,
					categories: categories
				});
			}
		}
	});
}

function saveCategory(req, res) {
	var category = new Category();

	var params = req.body;

	category.name = params.name;
	category.desc = params.desc;
	category.image = params.image;

	category.save((err, categoryStored) => {
		if(err){
			res.status(500).send({message: 'Error al guardar Categoría'});
		} else {
			if(!categoryStored){
				res.status(404).send({message: 'La Categoría no ha sido almacenada'});
			} else {
				res.status(200).send({category: categoryStored});
			}
		}
	});
}

function updateCategory(req, res){
	var categoryId = req.params.id;
	var update = req.body;

	Category.findByIdAndUpdate(categoryId, update, (err, categoryUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar Categoría'});
		} else {
			if(!categoryUpdated){
				res.status(404).send({message: 'La Categoría no ha sido actualizada'});
			} else {
				res.status(200).send({category: categoryUpdated});
			}
		}
	});
}

function deleteCategory(req, res){
	var categoryId = req.params.id;

	Category.findByIdAndRemove(categoryId, (err, categoryRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar Categoría'});
		} else {
			if(!categoryRemoved){
				res.status(404).send({message: 'La Categoría no ha sido eliminado'});
			} else {
				res.status(200).send({category: categoryRemoved});
			}
		}
	});
}

function uploadImage(req, res) {
	var categoryId = req.params.id;
	var fileName = 'No subido...';

	if(req.files){
		var filePath = req.files.image.path;
		var fileSplit = filePath.split('\\');
		var fileName = fileSplit[2];

		var extSplit = fileName.split('\.');
		var fileExt = extSplit[1];

		if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif'){
			Category.findByIdAndUpdate(categoryId, {image: fileName}, (err, categoryUpdated) => {
				if(!categoryUpdated){
					res.status(404).send({message: 'Error al actualizar el categorye'});
				} else {
					res.status(200).send({
						category: categoryUpdated,
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
	var pathFile = './uploads/categories/' + imageFile;

	fs.exists(pathFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile));
		} else {
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

module.exports = {
	getCategory,
	getCategories,
	saveCategory,
	updateCategory,
	deleteCategory,
	uploadImage,
	getImage
}