'use strict'

const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const CardsSchema = Schema({
    idCard: String,
    cash: Number,
    credit: Number,
    bonuses: Number,
}, { versionKey: false });


CardsSchema.plugin(timestamp, {
    createdName: 'created_at',
    updatedName: 'updated_at',
    disableCreated: false,
    disableUpdated: false
});


module.exports = mongoose.model('Cards', CardsSchema);
 