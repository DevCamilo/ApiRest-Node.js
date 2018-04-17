
const bcrypt = require('bcrypt-nodejs');
const path = require('path');
const fs = require('fs');
const CardModel = require('../models/CardsModel');

/**
 * METODO DE PRUEBAS
 * @param {any} req 
 * @param {any} res 
 */

function test(req, res) {
    res.status(200).send({
        message: "hola mundo desde controlador de tarjetas"
    });
}

/**
 * METODO PARA GUARDAR UN NUEVO CLIENTE
 * @param {any} req 
 * @param {any} res 
 */
function createCard(req, res) {
    var params = req.body;
    if (params.idCard != null) {
        CardModel.create(params, (error, response) => {
            if (error) {
                res.status(500).send({ message: 'error al guardar la tarjeta ' + error });
            } else {
                if (!response) {
                    res.status(500).send({ message: 'no se guardo la tarjeta' });
                } else {
                    res.status(200).send({
                        card: response
                    });
                }
            }
        });
    } else {
        res.status(500).send({ message: 'por faltan campos por diligenciar' });
    }

}



/**
 * METODO PARA ACTUALIZAR PERFIL DE UN CLIENTE
 * @param {any} req 
 * @param {any} res 
 */
function updateClient(req, res) {
    var idClient = req.params.id;
    var update = req.body;
    cardModel.findByIdAndUpdate(idClient, update, (err, clientUpdated) => {
        if (err) {
            res.status(500).send({ message: 'error en la peticion' });
        } else {
            if (!clientUpdated) {
                res.status(404).send({ message: 'no se ha podido actualizar el perfil' });
            } else {
                clientUpdated.idCity = update;
                res.status(200).send({ client: clientUpdated });
            }
        }
    });
}



/**
 * METODO PARA SUBIR UNA IMAGEN DE EL CLIENTE 
 * @param {any} req 
 * @param {any} res 
 */
function uploadImageClient(req, res) {

    var idClient = req.params.id;
    var file_name = 'no se ha subido..';

    if (req.files) {
        var file_path = req.files.Image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'JPEG') {
            let pathUrl = 'https://barberscloud.com.co:1998/api/get-image-client/' + file_name;
            cardModel.findByIdAndUpdate(idClient, { Image: pathUrl }, (err, clientUpdated) => {
                if (!clientUpdated) {
                    res.status(404).send({ message: 'no se ha podido actualizar perfil' });
                } else {
                    cardModel.findOne({ _id: idClient }, (err, client) => {
                        if (client) {
                            res.status(200).send({ client });
                        }
                    });
                }
            });
        } else {
            res.status(200).send({ message: 'extensión del archivo no valida' });
        }
    } else {
        res.status(200).send({ message: 'no has subido ninguna imagen' });
    }
}

/**
 * METODO PARA TRAER IMAGEN DE UN CLIENTE 
 * @param {any} req 
 * @param {any} res 
 */
function getImageFileClient(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/clients/' + imageFile;
    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: "no existe la imagen" });
        }
    });
}


function searchClient(req, res) {
    cardModel.find({ Email: req.params.value }, (err, client) => {
        if (err) {
            res.status(500).send({ message: 'error en la peticion' });
        } else {
            if (client.length > 0) {
                res.status(202).send({ client: client });
            } else {
                cardModel.find({ Telephone: req.params.value }, (err, client2) => {
                    if (err) {
                        res.status(500).send({ message: 'error en la peticion' });
                    } else {
                        res.status(202).send({ client: client2 });
                    }
                });
            }
        }
    });
}

// Exporta las apis
module.exports = {
    test,
    createCard,
    updateClient,
    uploadImageClient,
    getImageFileClient,
    searchClient
};