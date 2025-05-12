const request = require('supertest'); // Importa la librería supertest para hacer solicitudes HTTP a la app.
const app = require('../../../app'); // Asegúrate de que el archivo app.js esté configurado correctamente.

describe('Contacto Endpoints', () => { // Describe el conjunto de pruebas relacionadas con los endpoints de contactos.

  // Prueba para obtener todos los contactos (GET /contactos)
  it('GET /contactos - debe obtener todos los contactos', async () => {
    // Realiza una solicitud GET a /contactos.
    const res = await request(app).get('/contactos');

    // Comprueba que el código de respuesta sea 200 (OK).
    expect(res.statusCode).toBe(200);

    // Verifica que la respuesta sea un arreglo (debería ser una lista de contactos).
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Prueba de POST que debe fallar si los datos son inválidos (POST /contactos)
  it('POST /contactos - debe fallar por datos inválidos', async () => {
    // Realiza una solicitud POST con datos incompletos (solo un teléfono, falta nombre y otros campos).
    const res = await request(app).post('/contactos').send({ telefono: '12345' });

    // Se espera que el código de estado sea 400 (Bad Request) por datos incompletos o inválidos.
    expect(res.statusCode).toBe(400);
  });

  // Prueba de POST que debe crear un nuevo contacto (POST /contactos)
  it('POST /contactos - debe crear un contacto', async () => {
    // Realiza una solicitud POST con todos los datos necesarios para crear un contacto.
    const res = await request(app).post('/contactos').send({
      nombre: 'Juan Test',  // Nombre del contacto.
      telefono: '999999',   // Teléfono del contacto.
      email: 'juan@test.com', // Correo electrónico del contacto.
      direccion: 'Calle Falsa 123'  // Dirección del contacto.
    });

    // Se espera que el código de estado sea 201 (Creado) porque se creó un nuevo contacto.
    expect(res.statusCode).toBe(201);

    // Verifica que la respuesta tenga la propiedad 'id', que debe ser asignada al contacto creado.
    expect(res.body).toHaveProperty('id');
  });

  // Prueba de PUT que debe fallar si el id no existe (PUT /contactos/:id)
  it('PUT /contactos/:id - debe fallar por id inexistente', async () => {
    // Realiza una solicitud PUT para actualizar un contacto con un id que no existe.
    const res = await request(app).put('/contactos/9999').send({ nombre: 'Modificado' });

    // Se espera que el código de estado sea 404 (No encontrado) ya que el contacto no existe.
    expect(res.statusCode).toBe(404);
  });

  // Prueba de DELETE que debe fallar si el contacto no existe (DELETE /contactos/:id)
  it('DELETE /contactos/:id - debe fallar si el contacto no existe', async () => {
    // Realiza una solicitud DELETE para eliminar un contacto con un id que no existe.
    const res = await request(app).delete('/contactos/9999');

    // Se espera que el código de estado sea 404 (No encontrado) ya que el contacto no existe.
    expect(res.statusCode).toBe(404);
  });
});
