'use strict'

const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const ProductsSchema = Schema({
    name: String,
    value: Number,
    assignedBonuses: Number,
    image: String,
    description: String
}, { versionKey: false });


ProductsSchema.plugin(timestamp, {
    createdName: 'created_at',
    updatedName: 'updated_at',
    disableCreated: false,
    disableUpdated: false
});


module.exports = mongoose.model('products', ProductsSchema);
