const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

router.get('/', eventoController.obtenerEventos);
router.get('/:id', eventoController.obtenerEventoPorId);
router.post('/', eventoController.crearEvento);
router.put('/:id', eventoController.actualizarEvento);
router.delete('/:id', eventoController.eliminarEvento);


module.exports = router;