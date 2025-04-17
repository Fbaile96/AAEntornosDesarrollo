const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../db');

// Middleware para manejar errores de validación
const validar = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    next();
};

// Crear nuevo contacto
router.post('/',
    [
        body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('telefono').notEmpty().withMessage('El teléfono es obligatorio')
            .isNumeric().withMessage('El teléfono debe contener solo números'),
        body('email').optional({ nullable: true }).isEmail().withMessage('Email no válido'),
        body('direccion').optional({ nullable: true }).isString()
    ],
    validar,
    async (req, res) => {
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
    }
);

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
router.get('/:id',
    [param('id').isInt().withMessage('ID inválido')],
    validar,
    async (req, res) => {
        const { id } = req.params;
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
    }
);

// Actualizar un contacto
router.put('/:id',
    [
        param('id').isInt().withMessage('ID inválido'),
        body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('telefono').notEmpty().withMessage('El teléfono es obligatorio')
            .isNumeric().withMessage('El teléfono debe contener solo números'),
        body('email').optional({ nullable: true }).isEmail().withMessage('Email no válido'),
        body('direccion').optional({ nullable: true }).isString()
    ],
    validar,
    async (req, res) => {
        const { id } = req.params;
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
    }
);

// Eliminar un contacto
router.delete('/:id',
    [param('id').isInt().withMessage('ID inválido')],
    validar,
    async (req, res) => {
        const { id } = req.params;
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
    }
);

module.exports = router;
