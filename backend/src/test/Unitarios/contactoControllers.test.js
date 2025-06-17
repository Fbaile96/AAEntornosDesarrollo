// tests/contactoController.test.js
const contactoController = require('../../controllers/contactoController');
const contactoService = require('../../services/contactoService');

jest.mock('../../services/contactoService'); // 🔥 Importante: mockea el módulo

// Utilidad para simular `req` y `res`
const getMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  return res;
};

describe('contactoController', () => {
  test('obtenerContactos - debe responder con contactos', async () => {
    const mockContactos = [{ id: 1, nombre: 'Juan' }];
    contactoService.obtenerContactos.mockResolvedValue(mockContactos);

    const req = {};
    const res = getMockRes();

    await contactoController.obtenerContactos(req, res);

    expect(contactoService.obtenerContactos).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockContactos);
  });

  test('obtenerContactoPorId - debe responder con contacto si existe', async () => {
    const mockContacto = { id: 1, nombre: 'Ana' };
    contactoService.obtenerContactoPorId.mockResolvedValue(mockContacto);

    const req = { params: { id: '1' } };
    const res = getMockRes();

    await contactoController.obtenerContactoPorId(req, res);

    expect(res.json).toHaveBeenCalledWith(mockContacto);
  });

  test('obtenerContactoPorId - debe responder 404 si no existe', async () => {
    contactoService.obtenerContactoPorId.mockResolvedValue(null);

    const req = { params: { id: '999' } };
    const res = getMockRes();

    await contactoController.obtenerContactoPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Contacto no encontrado' });
  });

  test('crearContacto - debe crear y responder con nuevo contacto', async () => {
    const nuevo = { id: 2, nombre: 'Luis' };
    contactoService.crearContacto.mockResolvedValue(nuevo);

    const req = { body: { nombre: 'Luis' } };
    const res = getMockRes();

    await contactoController.crearContacto(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(nuevo);
  });

  test('actualizarContacto - debe actualizar si existe', async () => {
    const actualizado = { id: 1, nombre: 'Pedro' };
    contactoService.actualizarContacto.mockResolvedValue(actualizado);

    const req = { params: { id: '1' }, body: { nombre: 'Pedro' } };
    const res = getMockRes();

    await contactoController.actualizarContacto(req, res);

    expect(res.json).toHaveBeenCalledWith(actualizado);
  });

  test('actualizarContacto - debe responder 404 si no se actualiza', async () => {
    contactoService.actualizarContacto.mockResolvedValue(null);

    const req = { params: { id: '999' }, body: { nombre: 'X' } };
    const res = getMockRes();

    await contactoController.actualizarContacto(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'No se pudo actualizar' });
  });

  test('eliminarContacto - debe responder 204 si se elimina', async () => {
    contactoService.eliminarContacto.mockResolvedValue(true);

    const req = { params: { id: '1' } };
    const res = getMockRes();

    await contactoController.eliminarContacto(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });

  test('eliminarContacto - debe responder 404 si no se elimina', async () => {
    contactoService.eliminarContacto.mockResolvedValue(false);

    const req = { params: { id: '999' } };
    const res = getMockRes();

    await contactoController.eliminarContacto(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'No se pudo eliminar' });
  });
});
