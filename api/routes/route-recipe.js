'use strict'

var express = require('express');
var RecipeController = require('../controllers/controller-recipe');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');
var md_upload_image = multipart({uploadDir: './uploads/recipes/images'});
var md_upload_thumb = multipart({uploadDir: './uploads/recipes/thumbs'});

api.get('/recipe/:id', RecipeController.getRecipe);
api.get('/recipes/', RecipeController.getRecipes);
api.post('/recipe/', md_auth.ensureAuth, RecipeController.saveRecipe);
api.put('/recipe/:id', md_auth.ensureAuth, RecipeController.updateRecipe);
api.delete('/recipe/:id', md_auth.ensureAuth, RecipeController.deleteRecipe);
api.post('/upload-recipe-image/:id', [md_auth.ensureAuth, md_upload_image], RecipeController.uploadImage);
api.post('/upload-recipe-thumb/:id', [md_auth.ensureAuth, md_upload_thumb], RecipeController.uploadThumb);
api.get('/get-recipe-image/:folder/:image', RecipeController.getImage);

module.exports = api;