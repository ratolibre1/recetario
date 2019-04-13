'use strict'

var express = require('express');
var IngredientController = require('../controllers/controller-ingredient');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/ingredients'});

api.get('/ingredient/:id', IngredientController.getIngredient);
api.get('/ingredients', IngredientController.getIngredients);
api.post('/ingredient', md_auth.ensureAuth, IngredientController.saveIngredient);
api.put('/ingredient/:id', md_auth.ensureAuth, IngredientController.updateIngredient);
api.delete('/ingredient/:id', md_auth.ensureAuth, IngredientController.deleteIngredient);
api.post('/upload-ingredient-image/:id', [md_auth.ensureAuth, md_upload], IngredientController.uploadImage);
api.get('/get-ingredient-image/:file', IngredientController.getImage);

module.exports = api;