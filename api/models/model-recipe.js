'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = Schema({
	name: String,
	desc: String,
	author: { type: Schema.ObjectId, ref: 'User' },
	category: { type: Schema.ObjectId, ref: 'Category' },
	ingredients: [{ amount: Number, ingredient: { type: Schema.ObjectId, ref: 'Ingredient' }}],
	steps: [String],
	image: String,
	thumbnail: String,
	portions: Number,
	difficulty: Number,
	cookingTime: Number,
	comment: String
});

module.exports = mongoose.model('Recipe', RecipeSchema);