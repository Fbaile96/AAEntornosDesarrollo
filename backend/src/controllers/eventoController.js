const eventoService = require('../services/eventoService');

exports.obtenerEventos = async (req, res) => {
    const eventos = await eventoService.obtenerEventos();
    res.json(eventos);
};

exports.obtenerEventoPorId = async (req, res) => {
    const evento = await eventoService.obtenerEventoPorId(req.params.id);
    evento ? res.json(evento) : res.status(404).json({ error: 'Evento no encontrado' });
};

exports.crearEvento = async (req, res) => {
    const nuevo = await eventoService.crearEvento(req.body);
    res.status(201).json(nuevo);
};

exports.actualizarEvento = async (req, res) => {
    const actualizado = await eventoService.actualizarEvento(req.params.id, req.body);
    actualizado ? res.json(actualizado) : res.status(404).json({ error: 'No se pudo actualizar' });
};

exports.eliminarEvento = async (req, res) => {
    const eliminado = await eventoService.eliminarEvento(req.params.id);
    eliminado ? res.sendStatus(204) : res.status(404).json({ error: 'No se pudo eliminar' });
};
