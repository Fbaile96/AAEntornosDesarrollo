const express = require('express');
const cors = require('cors');
require('dotenv').config();

const eventoRoutes = require('./Routes_temp/eventos');
const contactoRoutes = require('./Routes_temp/contactos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/eventos', eventoRoutes);
app.use('/contactos', contactoRoutes);

module.exports = app;