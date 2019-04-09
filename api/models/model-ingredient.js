'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientSchema = Schema({
	name: String,
	desc: String,
	image: String
});

module.exports = mongoose.model('Ingredient', IngredientSchema);