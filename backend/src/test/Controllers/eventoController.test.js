const eventoController = require('../../controllers/eventoController');
const eventoService = require('../../services/eventoService');

jest.mock('../../services/eventoService');

const httpMocks = require('node-mocks-http');

describe('eventoController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('obtenerEventos devuelve lista de eventos', async () => {
    const eventosMock = [{ id: 1, titulo: 'Evento Test' }];
    eventoService.obtenerEventos.mockResolvedValue(eventosMock);

    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await eventoController.obtenerEventos(req, res);

    expect(res._getJSONData()).toEqual(eventosMock);
    expect(res.statusCode).toBe(200);
  });

  test('obtenerEventoPorId devuelve evento existente', async () => {
    const eventoMock = { id: 1, titulo: 'Evento A' };
    eventoService.obtenerEventoPorId.mockResolvedValue(eventoMock);

    const req = httpMocks.createRequest({ params: { id: 1 } });
    const res = httpMocks.createResponse();

    await eventoController.obtenerEventoPorId(req, res);

    expect(res._getJSONData()).toEqual(eventoMock);
    expect(res.statusCode).toBe(200);
  });

  test('obtenerEventoPorId devuelve 404 si no existe', async () => {
    eventoService.obtenerEventoPorId.mockResolvedValue(null);

    const req = httpMocks.createRequest({ params: { id: 999 } });
    const res = httpMocks.createResponse();

    await eventoController.obtenerEventoPorId(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({ error: 'Evento no encontrado' });
  });

  test('crearEvento devuelve nuevo evento y status 201', async () => {
    const nuevoEvento = { id: 2, titulo: 'Nuevo Evento' };
    eventoService.crearEvento.mockResolvedValue(nuevoEvento);

    const req = httpMocks.createRequest({ body: { titulo: 'Nuevo Evento' } });
    const res = httpMocks.createResponse();

    await eventoController.crearEvento(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual(nuevoEvento);
  });

  test('actualizarEvento devuelve evento actualizado', async () => {
    const eventoActualizado = { id: 1, titulo: 'Actualizado' };
    eventoService.actualizarEvento.mockResolvedValue(eventoActualizado);

    const req = httpMocks.createRequest({ params: { id: 1 }, body: { titulo: 'Actualizado' } });
    const res = httpMocks.createResponse();

    await eventoController.actualizarEvento(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(eventoActualizado);
  });

  test('actualizarEvento devuelve 404 si no se actualiza', async () => {
    eventoService.actualizarEvento.mockResolvedValue(null);

    const req = httpMocks.createRequest({ params: { id: 999 }, body: { titulo: 'Nada' } });
    const res = httpMocks.createResponse();

    await eventoController.actualizarEvento(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({ error: 'No se pudo actualizar' });
  });

  test('eliminarEvento devuelve 204 si se elimina', async () => {
    eventoService.eliminarEvento.mockResolvedValue(true);

    const req = httpMocks.createRequest({ params: { id: 1 } });
    const res = httpMocks.createResponse();

    await eventoController.eliminarEvento(req, res);

    expect(res.statusCode).toBe(204);
  });

  test('eliminarEvento devuelve 404 si no se puede eliminar', async () => {
    eventoService.eliminarEvento.mockResolvedValue(false);

    const req = httpMocks.createRequest({ params: { id: 999 } });
    const res = httpMocks.createResponse();

    await eventoController.eliminarEvento(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({ error: 'No se pudo eliminar' });
  });
});
