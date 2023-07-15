const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const raceSchema = mongoose.Schema({
    name : { type: String, required: true },
    date :  Date,
    inscriptionOpen : Boolean,
    description : String,
    url : String,
    location : String,
    longitude : Number,
    latitude : Number
}, { versionKey: false });

raceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Race', raceSchema);