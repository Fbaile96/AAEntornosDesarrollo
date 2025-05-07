const contactoService = require('../services/contactoService');

exports.obtenerContactos = async (req, res) => {
    const contactos = await contactoService.obtenerContactos();
    res.json(contactos);
};

exports.obtenerContactoPorId = async (req, res) => {
    const contacto = await contactoService.obtenerContactoPorId(req.params.id);
    contacto ? res.json(contacto) : res.status(404).json({ error: 'Contacto no encontrado' });
};

exports.crearContacto = async (req, res) => {
    const nuevo = await contactoService.crearContacto(req.body);
    res.status(201).json(nuevo);
};

exports.actualizarContacto = async (req, res) => {
    const actualizado = await contactoService.actualizarContacto(req.params.id, req.body);
    actualizado ? res.json(actualizado) : res.status(404).json({ error: 'No se pudo actualizar' });
};

exports.eliminarContacto = async (req, res) => {
    const eliminado = await contactoService.eliminarContacto(req.params.id);
    eliminado ? res.sendStatus(204) : res.status(404).json({ error: 'No se pudo eliminar' });
};
