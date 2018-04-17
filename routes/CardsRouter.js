'use strict'

var express = require('express');
var cardsController = require('../controllers/CardsController');
var api = express.Router(); // Se llama a las funciones de peticiones HTTP de express

/**
 * METHODS CLIENTS
*/
api.get('/test-card', cardsController.test);
api.post('/register-card', cardsController.createCard);
api.put('/update-client/:id', cardsController.updateClient);
api.post('/upload-image-client/:id', cardsController.uploadImageClient);
api.get('/get-image-client/:imageFile', cardsController.getImageFileClient);

 

// Se esta exportando la variable para que se pueda utilizar donde se requiera
module.exports = api;