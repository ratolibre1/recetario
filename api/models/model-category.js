'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = Schema({
	name: String,
	desc: String,
	image: String
});

module.exports = mongoose.model('Category', CategorySchema);