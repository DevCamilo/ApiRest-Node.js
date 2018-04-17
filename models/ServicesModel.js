'use strict'

const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const ServicesSchema = Schema({
    name: String,
    value: Number,
    assignedBonuses: Number,
    image: String,
    staffAssigned: String,
    description: String,
    status: Boolean
}, { versionKey: false });


ServicesSchema.plugin(timestamp, {
    createdName: 'created_at',
    updatedName: 'updated_at',
    disableCreated: false,
    disableUpdated: false
});


module.exports = mongoose.model('services', ServicesSchema);
