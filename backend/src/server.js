const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


let contactos = [];
let currentId = 1;


// Crear un contacto con validación
app.post('/contactos',
    [
        body('nombre').isString().notEmpty().withMessage('El nombre es obligatorio y debe ser una cadena de texto.'),
        body('telefono').isString().notEmpty().withMessage('El teléfono es obligatorio y debe ser una cadena de texto.'),
        body('email').optional().isEmail().withMessage('El email debe ser válido.'),
        body('direccion').optional().isString().withMessage('La dirección debe ser una cadena de texto.')
    ],
    validarErrores,
    (req, res) => {
        const { nombre, telefono, email, direccion } = req.body;
        const nuevoContacto = { id: currentContactoId++, nombre, telefono, email, direccion };
        contactos.push(nuevoContacto);
        res.status(201).json({ mensaje: 'Contacto creado exitosamente', contacto: nuevoContacto });
    }
);


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
