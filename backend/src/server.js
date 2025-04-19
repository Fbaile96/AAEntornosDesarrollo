const express = require('express');
const cors = require('cors');
require('dotenv').config();

const eventoRoutes = require('./routes/eventos');
const contactoRoutes = require('./routes/contactos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/eventos', eventoRoutes);
app.use('/contactos', contactoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
