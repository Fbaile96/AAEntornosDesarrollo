const request = require('supertest');
const app = require('../../app'); // Asegúrate de exportar tu app de Express sin listen()

describe('Contacto Endpoints', () => {
  it('GET /contactos - debe obtener todos los contactos', async () => {
    const res = await request(app).get('/contactos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /contactos - debe fallar por datos inválidos', async () => {
    const res = await request(app).post('/contactos').send({ telefono: '12345' });
    expect(res.statusCode).toBe(400);
  });

  it('POST /contactos - debe crear un contacto', async () => {
    const res = await request(app).post('/contactos').send({
      nombre: 'Juan Test',
      telefono: '999999',
      email: 'juan@test.com',
      direccion: 'Calle Falsa 123'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('PUT /contactos/:id - debe fallar por id inexistente', async () => {
    const res = await request(app).put('/contactos/9999').send({ nombre: 'Modificado' });
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /contactos/:id - debe fallar si el contacto no existe', async () => {
    const res = await request(app).delete('/contactos/9999');
    expect(res.statusCode).toBe(404);
  });
});
