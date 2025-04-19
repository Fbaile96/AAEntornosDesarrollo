const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

router.get('/', contactoController.obtenerContactos);
router.get('/:id', contactoController.obtenerContactoPorId);
router.post('/', contactoController.crearContacto);
router.put('/:id', contactoController.actualizarContacto);
router.delete('/:id', contactoController.eliminarContacto);

module.exports = router;
