'use strict'
const BarbershopsModel = require('../models/BarberShopsModel');
const ClientModel = require('../models/ClientsModel');
const AuthModelBarbershop = require('../models/AuthBarbershopModel');
const LogModel = require('../models/LogsModel');
const jwtBarbershop = require('../services/jwtBarbershops');
const jwt = require('../services/jwt');
const admin = require("firebase-admin");
const serviceAccount = require("../credentials/dev-barberscloud-firebase-adminsdk-kjh8n-f6b745a48d.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dev-barberscloud.firebaseio.com"
});


/**
 * METODO PARA AUTH DE UNA BARBERIA
 * @param {any} req 
 * @param {any} res 
 */
function authBarbershop(req, res) {
    const params = req.body;
    const idToken = params.token;

};

/**
 * METODO PARA AUTH DE UNA USUARIOS
 * @param {any} req 
 * @param {any} res 
 */
function authUsers(req, res) {
    const uid = req.params.id;

    ClientModel.findOne({ Uid: uid }, (err, client) => {
        if (err) {
            res.status(500).send({ message: 'error en la peticion' });
        } else {
            if (!client) {
                res.status(404).send({ message: 'el usuario no existe' });
            } else {
                res.status(200).send({ client: client });
            }
        }
    });

};


function login_admin(req, res) {
    let params = req.body;
    let ipRemote = req.connection.remoteAddress;
    ipRemote = ipRemote.split(':')[3];
    if (params.Username && params.Password) {
        AuthModelBarbershop.findOne({ email: params.Username }, (err, user) => {
            if (err) {
                LogModel.create({
                    name: 'Login',
                    description: err,
                    status: 0,
                    code: 0,
                    url: params.url,
                    ip: params.ip,
                    ipRemote: ipRemote,
                    typeUser: 'Admin',
                    user: params.Username
                });
                res.status(500).send({ message: 'error en la peticion.' });
            } else {
                if (!user) {
                    res.status(404).send({ message: 'el usuario no existe.' });
                } else {
                    res.status(200).send({
                        user_admin: user,
                        token: jwt.createToken_Admin(user)
                    });
                }
            }
        });
    } else {
        res.status(404).send({ message: 'Faltan campos.' });
    }
}


/*function save_admin(req, res) {
    var userData = {
        Name: req.body.Name,
        Username: req.body.Username,
        Password: req.body.Password
    }
    Users_admin.create(userData, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'error en la peticion.' });
        } else {
            if (!user) {
                res.status(404).send({ message: 'el usuario no pudo ser guardado.' });
            } else {
                res.status(200).send({
                    client: user
                });
            }
        }
    });
}*/

module.exports = {
    authBarbershop,
    authUsers,
    login_admin
}