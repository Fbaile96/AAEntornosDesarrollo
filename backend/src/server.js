const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


let contactos = [];
let currentId = 1;


app.post('/contactos', (req, res) => {
    const { nombre, telefono, email, direccion } = req.body;
    const nuevoContacto = { id: currentId++, nombre, telefono, email, direccion };
    contactos.push(nuevoContacto);
    res.status(201).json({ mensaje: 'Contacto creado exitosamente', contacto: nuevoContacto });
});

app.get('/contactos', (req, res) => {
    res.json(contactos);
});

app.get('/contactos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const contacto = contactos.find(c => c.id === id);
    if (!contacto) {
        return res.status(404).json({ mensaje: 'Contacto no encontrado' });
    }
    res.json(contacto);
});

app.put('/contactos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const contacto = contactos.find(c => c.id === id);
    if (!contacto) {
        return res.status(404).json({ mensaje: 'Contacto no encontrado' });
    }

    const { nombre, telefono, email, direccion } = req.body;
    if (nombre !== undefined) contacto.nombre = nombre;
    if (telefono !== undefined) contacto.telefono = telefono;
    if (email !== undefined) contacto.email = email;
    if (direccion !== undefined) contacto.direccion = direccion;

    res.json({ mensaje: 'Contacto actualizado exitosamente', contacto });
});

app.delete('/contactos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = contactos.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ mensaje: 'Contacto no encontrado' });
    }

    contactos.splice(index, 1);
    res.json({ mensaje: 'Contacto eliminado exitosamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');



app.use(cors());
app.use(bodyParser.json());

// Simulación de base de datos
let grupos = [];
let relacionContactoGrupo = []; // Relación muchos a muchos
let currentContactoId = 1;
let currentGrupoId = 1;

// Crear un contacto
app.post('/contactos', (req, res) => {
    const { nombre, telefono, email, direccion } = req.body;
    const nuevoContacto = { id: currentContactoId++, nombre, telefono, email, direccion };
    contactos.push(nuevoContacto);
    res.status(201).json({ mensaje: 'Contacto creado exitosamente', contacto: nuevoContacto });
});

// Crear un grupo
app.post('/grupos', (req, res) => {
    const { nombre } = req.body;
    const nuevoGrupo = { id: currentGrupoId++, nombre };
    grupos.push(nuevoGrupo);
    res.status(201).json({ mensaje: 'Grupo creado exitosamente', grupo: nuevoGrupo });
});

// Asociar un contacto a un grupo
app.post('/grupos/:grupoId/contactos/:contactoId', (req, res) => {
    const grupoId = parseInt(req.params.grupoId, 10);
    const contactoId = parseInt(req.params.contactoId, 10);

    const grupo = grupos.find(g => g.id === grupoId);
    const contacto = contactos.find(c => c.id === contactoId);

    if (!grupo || !contacto) {
        return res.status(404).json({ mensaje: 'Grupo o contacto no encontrado' });
    }

    if (!relacionContactoGrupo.some(r => r.grupoId === grupoId && r.contactoId === contactoId)) {
        relacionContactoGrupo.push({ grupoId, contactoId });
    }

    res.json({ mensaje: 'Contacto asociado al grupo exitosamente' });
});

// Obtener contactos de un grupo
app.get('/grupos/:grupoId/contactos', (req, res) => {
    const grupoId = parseInt(req.params.grupoId, 10);
    const grupo = grupos.find(g => g.id === grupoId);

    if (!grupo) {
        return res.status(404).json({ mensaje: 'Grupo no encontrado' });
    }

    const contactosEnGrupo = relacionContactoGrupo
        .filter(r => r.grupoId === grupoId)
        .map(r => contactos.find(c => c.id === r.contactoId));

    res.json(contactosEnGrupo);
});

// Leer todos los grupos
app.get('/grupos', (req, res) => {
    res.json(grupos);
});

// Leer todos los contactos
app.get('/contactos', (req, res) => {
    res.json(contactos);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
