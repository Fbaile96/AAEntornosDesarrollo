const request = require('supertest');
const app = require('../app'); // Asegúrate de tener app.js como te mostré antes

describe('Endpoints de /eventos', () => {
    let nuevoEventoId;

    // GET /eventos - Éxito
    it('GET /eventos debería devolver una lista de eventos', async () => {
        const res = await request(app).get('/eventos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // POST /eventos - Éxito
    it('POST /eventos debería crear un nuevo evento', async () => {
        const res = await request(app)
            .post('/eventos')
            .send({
                nombre: 'Evento de prueba',
                fecha: '2025-05-15',
                descripcion: 'Un evento de prueba'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        nuevoEventoId = res.body.id; // Lo usamos en los siguientes tests
    });

    // POST /eventos - Fallo (datos incompletos)
    it('POST /eventos debería fallar si falta información', async () => {
        const res = await request(app)
            .post('/eventos')
            .send({
                nombre: 'Sin fecha'
                // falta 'fecha' y/o 'descripcion'
            });

        expect(res.statusCode).toBe(400); // Suponiendo que validas entrada
    });

    // GET /eventos/:id - Éxito
    it('GET /eventos/:id debería devolver el evento creado', async () => {
        const res = await request(app).get(`/eventos/${nuevoEventoId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', nuevoEventoId);
    });

    // GET /eventos/:id - Fallo (no existe)
    it('GET /eventos/:id debería devolver 404 si el evento no existe', async () => {
        const res = await request(app).get('/eventos/999999');
        expect(res.statusCode).toBe(404);
    });

    // PUT /eventos/:id - Éxito
    it('PUT /eventos/:id debería actualizar el evento', async () => {
        const res = await request(app)
            .put(`/eventos/${nuevoEventoId}`)
            .send({ nombre: 'Evento actualizado' });

        expect(res.statusCode).toBe(200);
        expect(res.body.nombre).toBe('Evento actualizado');
    });

    // PUT /eventos/:id - Fallo (no existe)
    it('PUT /eventos/:id debería fallar si el evento no existe', async () => {
        const res = await request(app)
            .put('/eventos/999999')
            .send({ nombre: 'No existe' });

        expect(res.statusCode).toBe(404);
    });

    // DELETE /eventos/:id - Éxito
    it('DELETE /eventos/:id debería eliminar el evento', async () => {
        const res = await request(app).delete(`/eventos/${nuevoEventoId}`);
        expect(res.statusCode).toBe(204);
    });

    // DELETE /eventos/:id - Fallo (ya fue eliminado o no existe)
    it('DELETE /eventos/:id debería fallar si el evento no existe', async () => {
        const res = await request(app).delete(`/eventos/${nuevoEventoId}`);
        expect(res.statusCode).toBe(404);
    });
});
