const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir CORS para que el frontend pueda hacer peticiones al backend
app.use(cors());

// Servir archivos estáticos desde la carpeta "src"
app.use(express.static(path.join(__dirname, 'src')));

// Ruta principal (opcional)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor frontend escuchando en http://localhost:${PORT}`);
});
