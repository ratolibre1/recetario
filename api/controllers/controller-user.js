'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/model-user');
var jwt = require('../services/jwt');

//TODO: NO COMPARTIR CLAVE
function getUser(req, res){
	var userId = req.params.id;

	User.findById(userId, (err, user) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		} else {
			if(!user){
				res.status(404).send({message: 'El usuario no existe'});
			} else {
				res.status(200).send({user});
			}
		}
	});
}

//TODO: NO COMPARTIR CLAVES
function getUsers(req, res){
	if(req.params.page){
		var page = req.params.page;
	} else {
		var page = 1;
	}	
	var itemsPerPage = 4;

	User.find().sort('name').paginate(page, itemsPerPage, function(err, users, total){
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		} else {
			if(!users){
				res.status(404).send({message: 'No hay usuarios'});
			} else {
				return res.status(200).send({
					total: total,
					users: users
				});
			}
		}
	});
}

function saveUser(req, res) {
	var user = new User();

	var params = req.body;

	user.name = params.name;
	user.surname = params.surname;
	user.desc = params.desc;
	user.email = params.email;
	user.role = 'ROLE_READER';
	//user.role = 'ROLE_CHEF';
	//user.role = 'ROLE_CURATOR';
	user.image = 'null';
	
	if(params.password){
		//Encriptar contraseña
		bcrypt.hash(params.password, null, null, function(err, hash) {
			user.password = hash;
			if(user.name != null && user.surname != null && user.email != null){
				//Guardar usuario
				user.save((err, userStored) => {
					if (err){
						res.status(500).send({message: 'Error al guardar usuario'});
					} else {
						if(!userStored){
							res.status(404).send({message: 'No se ha registrado el usuario'});
						} else {
							res.status(200).send({user: userStored});
						}
					};
				});
			} else {
				res.status(200).send({message: 'Completa todos los campos'});
			}
		});
	} else {
		res.status(200).send({message: 'Introduce la contraseña'});
	}
}

function loginUser(req, res){
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({email: email.toLowerCase()}, (err, user) => {
		if (err){
			res.status(500).send({message: 'Error en la petición'});
		} else {
			if (!user){
				res.status(404).send({message: 'Usuario no existe'});
			} else {
				//Comprobar la contraseña
				bcrypt.compare(password, user.password, function(err, check){
					if(check){
						//Devolver los datos del usuario logueado
						if(params.gethash){
							//Devolver token de JWT
							res.status(200).send({
								token: jwt.createToken(user)
							});
						} else {
							res.status(200).send({user});
						}
					} else {
						res.status(404).send({message: 'Usuario no ha podido loguearse'});
					}
				});
			}
		}
	});
}

function updateUser(req, res){
	var userId = req.params.id;
	var update = req.body;

	if(userId != req.user.sub){
		return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});
	}

	if(update.password){
		//Encriptar contraseña
		update.password = bcrypt.hashSync(update.password, null, null);
	}

	User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario'});
		} else {
			if(!userUpdated){
				res.status(404).send({message: 'Usuario no ha podido loguearse'});
			} else {
				res.status(200).send({user: userUpdated});
			}
		}
	});
}

function uploadImage(req, res) {
	var userId = req.params.id;
	var fileName = 'No subido...';

	if(req.files){
		var filePath = req.files.image.path;
		var fileSplit = filePath.split('\\');
		var fileName = fileSplit[2];

		var extSplit = fileName.split('\.');
		var fileExt = extSplit[1];

		if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif'){
			User.findByIdAndUpdate(userId, {image: fileName}, (err, userUpdated) => {
				if(!userUpdated){
					res.status(404).send({message: 'Error al actualizar el usuario'});
				} else {
					res.status(200).send({
						user: userUpdated,
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
	var pathFile = './uploads/users/' + imageFile;

	fs.exists(pathFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile));
		} else {
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

module.exports  = {
	getUser,
	getUsers,
	saveUser,
	loginUser,
	updateUser,
	uploadImage,
	getImage
};