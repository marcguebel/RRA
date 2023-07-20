const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Event = require('./Event');  

const raceSchema = mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
    distance : { type: Number, required: true },
    elevationGain : Number,
    type : ['trail', 'road']
}, { versionKey: false });

raceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Race', raceSchema); 