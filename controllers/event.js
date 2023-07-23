const Event = require('../models/Event');  
const Tool = require('./tool');  

exports.getAll = (req, res, next) => {
    try{
        Event.find().limit(req.pagination.limit).skip(req.pagination.offset)
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
        const { name, country, location } = req.query;
        const filter = {};
      
        if (name) {
            filter.name = new RegExp(decodeURIComponent(Tool.cleanParameter(name)), 'i');
        }
        if (country) {
            filter.country = new RegExp(decodeURIComponent(Tool.cleanParameter(country)), 'i');
        }
        if (location) {
            filter.location = new RegExp(decodeURIComponent(Tool.cleanParameter(location)), 'i');
        }
 
        Event.find(filter).limit(req.pagination.limit).skip(req.pagination.offset)
             .then(events => res.status(200).json(events))
             .catch(error => res.status(404).json({ error : error.message }));
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
} 