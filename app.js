'use strict'

const express = require('express');
const cors = require('cors'); // Cros Origin Resource Sharing

const bodyParser = require('body-parser'); // Parsea todo a JSON

const app = express(); // Se referencia a express para iniciar el servidor

//carga de rutas
app.use(cors())


const cards_routes = require('./routes/CardsRouter');

// Se puede asignar el nivel de trafico de las peticiones
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());

// Habilitan permisos de cabeceras HTTP para los cors
app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', 'Authorizacion, X-API-KEY, Origin, X-Requested-with, Content-Type, Accept, Access-Control-Allow-Request-Method');
    req.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,PUT,DELETE');
    req.header('Allow', 'GET, POST, OPTIONS,PUT,DELETE');

    next();
});

// Enruta a partir del API
app.use('/api', cards_routes);


module.exports = app;