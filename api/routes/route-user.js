'use strict'

var express = require('express');
var UserController = require('../controllers/controller-user');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});



api.get('/user/:id', UserController.getUser);
api.get('/users', UserController.getUsers);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-user-image/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-user-image/:image', UserController.getImage);

module.exports = api;