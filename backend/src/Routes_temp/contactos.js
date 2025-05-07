const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

// Función para validar los errores
const validarErrores = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    next();
};

router.get('/', contactoController.obtenerContactos);

// Validación y control de errores para obtener un contacto por ID
router.get('/:id', [
    param('id').isInt().withMessage('El ID debe ser un número entero')
], validarErrores, contactoController.obtenerContactoPorId);

// Validación y control de errores para crear un contacto
router.post(
    '/',
    [
        body('nombre').isString().notEmpty().withMessage('El nombre es obligatorio y debe ser una cadena de texto.'),
        body('telefono').isString().notEmpty().withMessage('El teléfono es obligatorio y debe ser una cadena de texto.'),
        body('email').optional().isEmail().withMessage('El email debe ser válido.'),
        body('direccion').optional().isString().withMessage('La dirección debe ser una cadena de texto.')
    ],
    validarErrores, 
    contactoController.crearContacto
);

// Validación y control de errores para actualizar un contacto
router.put(
    '/:id',
    [
        param('id').isInt().withMessage('El ID debe ser un número entero'),
        body('nombre').optional().isString().withMessage('El nombre debe ser una cadena de texto.'),
        body('telefono').optional().isString().withMessage('El teléfono debe ser una cadena de texto.'),
        body('email').optional().isEmail().withMessage('El email debe ser válido.'),
        body('direccion').optional().isString().withMessage('La dirección debe ser una cadena de texto.')
    ],
    validarErrores,
    contactoController.actualizarContacto
);

// Validación para eliminar un contacto (solo ID)
router.delete('/:id', [
    param('id').isInt().withMessage('El ID debe ser un número entero')
], validarErrores, contactoController.eliminarContacto);

module.exports = router;
