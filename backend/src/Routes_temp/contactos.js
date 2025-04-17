const express = require('express');
const router = express.Router();
const db = require('../db'); // importamos la conexión a MariaDB

// Crear nuevo contacto
router.post('/', async (req, res) => {
    const { nombre, telefono, email, direccion } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO contactos (nombre, telefono, email, direccion) VALUES (?, ?, ?, ?)',
            [nombre, telefono, email, direccion]
        );
        res.status(201).json({ mensaje: 'Contacto creado exitosamente', id: result.insertId });
    } catch (error) {
        console.error('Error al crear contacto:', error);
        res.status(500).json({ mensaje: 'Error al crear el contacto' });
    }
});

// Obtener todos los contactos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM contactos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener contactos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los contactos' });
    }
});

// Obtener un contacto por ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await db.execute('SELECT * FROM contactos WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Contacto no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener contacto:', error);
        res.status(500).json({ mensaje: 'Error al obtener el contacto' });
    }
});

// Actualizar un contacto
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, telefono, email, direccion } = req.body;
    try {
        const [result] = await db.execute(
            'UPDATE contactos SET nombre = ?, telefono = ?, email = ?, direccion = ? WHERE id = ?',
            [nombre, telefono, email, direccion, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Contacto no encontrado' });
        }
        res.json({ mensaje: 'Contacto actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar contacto:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el contacto' });
    }
});

// Eliminar un contacto
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [result] = await db.execute('DELETE FROM contactos WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Contacto no encontrado' });
        }
        res.json({ mensaje: 'Contacto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar contacto:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el contacto' });
    }
});

module.exports = router;
