const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../db');

// Middleware de validación
const validar = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    next();
};

// GET todos los eventos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM eventos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ mensaje: 'Error al obtener eventos' });
    }
});

// GET evento por ID
router.get('/:id',
    [param('id').isInt().withMessage('ID inválido')],
    validar,
    async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await db.execute('SELECT * FROM eventos WHERE id = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ mensaje: 'Evento no encontrado' });
            res.json(rows[0]);
        } catch (error) {
            console.error('Error al obtener evento:', error);
            res.status(500).json({ mensaje: 'Error al obtener el evento' });
        }
    }
);

// POST crear evento
router.post('/',
    [
        body('titulo').notEmpty().withMessage('El título es obligatorio'),
        body('fecha').isISO8601().withMessage('La fecha debe tener un formato válido (AAAA-MM-DD)'),
        body('descripcion').optional({ nullable: true }).isString().withMessage('La descripción debe ser texto')
    ],
    validar,
    async (req, res) => {
        const { titulo, fecha, descripcion } = req.body;
        try {
            const [result] = await db.execute(
                'INSERT INTO eventos (titulo, fecha, descripcion) VALUES (?, ?, ?)',
                [titulo, fecha, descripcion]
            );
            res.status(201).json({ mensaje: 'Evento creado exitosamente', id: result.insertId });
        } catch (error) {
            console.error('Error al crear evento:', error);
            res.status(500).json({ mensaje: 'Error al crear el evento' });
        }
    }
);

// PUT actualizar evento
router.put('/:id',
    [
        param('id').isInt().withMessage('ID inválido'),
        body('titulo').notEmpty().withMessage('El título es obligatorio'),
        body('fecha').isISO8601().withMessage('La fecha debe tener un formato válido (AAAA-MM-DD)'),
        body('descripcion').optional({ nullable: true }).isString()
    ],
    validar,
    async (req, res) => {
        const { id } = req.params;
        const { titulo, fecha, descripcion } = req.body;
        try {
            const [result] = await db.execute(
                'UPDATE eventos SET titulo = ?, fecha = ?, descripcion = ? WHERE id = ?',
                [titulo, fecha, descripcion, id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Evento no encontrado' });
            res.json({ mensaje: 'Evento actualizado exitosamente' });
        } catch (error) {
            console.error('Error al actualizar evento:', error);
            res.status(500).json({ mensaje: 'Error al actualizar el evento' });
        }
    }
);

// DELETE eliminar evento
router.delete('/:id',
    [param('id').isInt().withMessage('ID inválido')],
    validar,
    async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await db.execute('DELETE FROM eventos WHERE id = ?', [id]);
            if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Evento no encontrado' });
            res.json({ mensaje: 'Evento eliminado exitosamente' });
        } catch (error) {
            console.error('Error al eliminar evento:', error);
            res.status(500).json({ mensaje: 'Error al eliminar el evento' });
        }
    }
);

module.exports = router;