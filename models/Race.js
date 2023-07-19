const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const raceSchema = mongoose.Schema({
    distance : { type: Number, required: true },
    elevationGain : Number,
    type : ['trail', 'road']
}, { versionKey: false });

raceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Race', raceSchema);