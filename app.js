const express = require('express');
const mongoose = require('mongoose');
const env = require('./environment');
const userRoutes = require('./routes/user');
const raceRoutes = require('./routes/race');
const eventRoutes = require('./routes/event');

mongoose.connect(env.url,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);
app.use('/api/races', raceRoutes);
app.use('/api/events', eventRoutes);

module.exports = app;