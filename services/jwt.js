'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_barber';

exports.createToken = function (client) {

    let payload = {
        Name: client.Name,
        Email: client.Email,
        Telephone: client.Telephone,
        Password: client.Password,
        PlayerID: client.PlayerID,
        IdCelular: client.IdCelular,
        Notify: client.Notify,
        Active: client.Active,
        idCity: client.idCity,
        UserName: client.UserName,
        Image: client.Image,
        Cities: client.Cities,
        Reservations: client.Reservations,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret)

};


exports.createToken_Admin = function (admin) {
    let payloadAdmin = {
        Name: admin.Name,
        Username: admin.Username,
        Password: admin.Password,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payloadAdmin, secret)
};