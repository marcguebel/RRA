const Event = require('../models/Event');  
const express = require('express');

exports.getAll = (req, res, next) => {
    try{
        Event.find()
             .then(event => res.status(200).json(event))
             .catch(error => res.status(404).json({ error : error.message }));
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
}

exports.get = (req, res, next) => {
    try{
        Event.findOne({_id: req.params.id})
             .then(event => res.status(200).json(event))
             .catch(error => res.status(404).json({ error : error.message }));
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
}

exports.add = (req, res, next) => {
    try{
        const event = new Event({
            ...req.body
        });
        event.save()
             .then(() => res.status(201).json(event))
             .catch(error => res.status(404).json({ error : error.message }));
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
}

exports.update = (req, res, next) => {
    try{
        Event.findOneAndUpdate({_id: req.params.id}, {...req.body, _id: req.params.id}, {new: true})
             .then(event => res.status(200).json(event))
             .catch(error => res.status(404).json({ error : error.message }));
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
}

exports.delete = (req, res, next) => {
    try{
        Event.findOneAndDelete({_id: req.params.id})
            .then(() => res.status(204).end())
            .catch(error => res.status(404).json({ error : error.message }));
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
}

exports.search = (req, res, next) => {
    try{
        const { name, date, country, location } = req.query;
        const filter = {};
      
        if (name) {
            filter.name = new RegExp(decodeURIComponent(cleanParameter(name)), 'i');
        }
        if (country) {
            filter.country = new RegExp(decodeURIComponent(cleanParameter(country)), 'i');
        }
        if (location) {
            filter.location = new RegExp(decodeURIComponent(cleanParameter(location)), 'i');
        }
 
        Event.find(filter)
             .then(events => res.status(200).json(events))
             .catch(error => res.status(404).json({ error : error.message }));
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
} 

// Eliminate quotes, apostrophes or backticks at the beginning and end of the string
function cleanParameter(param) {
    if (!param) 
        return '';
    return param.replace(/^['"`]|['"`]$/g, '');
}