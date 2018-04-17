'use strict'

var jwt    = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_barber';

exports.ensureAuth = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'la peticion no tiene permisos'});
    };
    var token = req.headers.authorization.replace(/['"]+/g,'');

    try{
        var payload = jwt.decode(token,secret);
        if(payload.exp <= moment().unix()){
             return res.status(401).send({message: 'token ha exrirado'});
        }

    }catch(ex){
        console.log(ex);
        return res.status(404).send({message: 'token no valido'});
    }

    req.client = payload;
    next();
};

exports.ensureAuthBarbershop = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Whoops no tienes permiso para realizar estar operaciòn'});
    };
    var token = req.headers.authorization.replace(/['"]+/g,'');

    try{
        var payloadBarbershop = jwt.decode(token,secret);
        if(payloadBarbershop.exp <= moment().unix()){
             return res.status(401).send({message: 'token ha exrirado'});
        }

    }catch(ex){
        console.log(ex);
        return res.status(404).send({message: 'token no valido'});
    }

    req.barbershop = payloadBarbershop;
    next();
};


exports.ensureAuth_Admin = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Whoops no tienes permiso para realizar estar operaciòn'});
    };
    var token = req.headers.authorization.replace(/['"]+/g,'');

    try{
        var payloadAdmin = jwt.decode(token,secret);
        if(payloadAdmin.exp <= moment().unix()){
             return res.status(401).send({message: 'token ha exrirado'});
        }

    }catch(ex){
        console.log(ex);
        return res.status(404).send({message: 'token no valido'});
    }

    req.payloadAdmin = payloadAdmin;
    next();
};