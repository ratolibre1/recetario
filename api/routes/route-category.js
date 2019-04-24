'use strict'

var express = require('express');
var CategoryController = require('../controllers/controller-category');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/categories'});

api.get('/category/:id', CategoryController.getCategory);
api.get('/categories', CategoryController.getCategories);
api.post('/category', md_auth.ensureAuth, CategoryController.saveCategory);
api.put('/category/:id', md_auth.ensureAuth, CategoryController.updateCategory);
api.delete('/category/:id', md_auth.ensureAuth, CategoryController.deleteCategory);
api.post('/upload-category-image/:id', [md_auth.ensureAuth, md_upload], CategoryController.uploadImage);
api.get('/get-category-image/:image', CategoryController.getImage);

module.exports = api;