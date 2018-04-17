'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;


mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://develop:devbarberscloud2016@104.131.36.15:27017/dev-develop`, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("la base de datos esta conectada correctamente!!");
    }
});

app.listen(port, function () {
    console.log("server corriendo");
});