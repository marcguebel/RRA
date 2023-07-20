const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const eventSchema = mongoose.Schema({
    name : { type: String, required: true },
    date :  Date,
    country :  String,
    location : String,
    longitude : Number,
    latitude : Number,
}, { versionKey: false });

eventSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Event', eventSchema);