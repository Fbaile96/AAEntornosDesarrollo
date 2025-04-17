const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Importar rutas
const contactosRoutes = require('./Routes_temp/contactos');
const eventosRoutes = require('./Routes_temp/eventos');

// Usar rutas
app.use('/contactos', contactosRoutes);
app.use('/eventos', eventosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
