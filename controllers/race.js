const Race = require('../models/Race');  

exports.getAll = (req, res, next) => {
    try{
        Race.find()
            .then(races => res.status(200).json(races))
            .catch(error => res.status(404).json({ error : error.message }));
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
}

exports.get = (req, res, next) => {
    try{
        Race.findOne({_id: req.params.id})
            .then(races => res.status(200).json(races))
            .catch(error => res.status(404).json({ error : error.message }));
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
}

exports.add = (req, res, next) => {
    try{
        const race = new Race({
            ...req.body
        });
        race.save()
            .then(() => res.status(201).json(race))
            .catch(error => res.status(404).json({ error : error.message }));
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
}

exports.update = (req, res, next) => {
    try{
        Race.findOneAndUpdate({_id: req.params.id}, {...req.body, _id: req.params.id}, {new: true})
            .then(race => res.status(200).json(race))
            .catch(error => res.status(404).json({ error : error.message }));
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
}

exports.delete = (req, res, next) => {
    try{
        Race.findOneAndDelete({_id: req.params.id})
            .then(race => res.status(204).end())
            .catch(error => res.status(404).json({error}));
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
}