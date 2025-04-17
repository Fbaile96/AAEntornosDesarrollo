const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los eventos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM eventos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ mensaje: 'Error al obtener eventos' });
    }
});

// Obtener un evento por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM eventos WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ mensaje: 'Evento no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener evento:', error);
        res.status(500).json({ mensaje: 'Error al obtener el evento' });
    }
});

// Crear un nuevo evento
router.post('/', async (req, res) => {
    const { titulo, fecha, descripcion } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO eventos (titulo, fecha, descripcion) VALUES (?, ?, ?)',
            [titulo, fecha, descripcion || null]
        );
        res.status(201).json({ mensaje: 'Evento creado exitosamente', id: result.insertId });
    } catch (error) {
        console.error('Error al crear evento:', error);
        res.status(500).json({ mensaje: 'Error al crear el evento' });
    }
});

// Actualizar un evento
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, fecha, descripcion } = req.body;
    try {
        const [result] = await db.execute(
            'UPDATE eventos SET titulo = ?, fecha = ?, descripcion = ? WHERE id = ?',
            [titulo, fecha, descripcion || null, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Evento no encontrado' });
        res.json({ mensaje: 'Evento actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar evento:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el evento' });
    }
});

// Eliminar un evento
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM eventos WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Evento no encontrado' });
        res.json({ mensaje: 'Evento eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar evento:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el evento' });
    }
});

module.exports = router;
