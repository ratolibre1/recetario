'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar rutas
var user_routes = require('./routes/route-user');
var ingredient_routes = require('./routes/route-ingredient');
var category_routes = require('./routes/route-category');
var recipe_routes = require('./routes/route-recipe');

//Configurar BodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    
    next();
});

//Rutas base
app.use('/api', user_routes);
app.use('/api', ingredient_routes);
app.use('/api', category_routes);
app.use('/api', recipe_routes);

app.get('/prueba', function(req, res){
	res.status(200).send({message: 'TODO OK'});
});

module.exports = app;