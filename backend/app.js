const express = require('express');
const cors = require('cors');
require('dotenv').config();
const client = require('prom-client');

const eventoRoutes = require('./src/Routes_temp/eventos');
const contactoRoutes = require('./src/Routes_temp/contactos');

const app = express();
app.use(cors());
app.use(express.json());

// Crear registro de métricas
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Métrica personalizada: contador de peticiones HTTP
const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Número total de peticiones HTTP',
    labelNames: ['method', 'route', 'status'],
});
register.registerMetric(httpRequestCounter);

// Middleware para contar peticiones
app.use((req, res, next) => {
    res.on('finish', () => {
        httpRequestCounter.inc({
            method: req.method,
            route: req.route?.path || req.path,
            status: res.statusCode,
        });
    });
    next();
});

// Rutas
app.use('/eventos', eventoRoutes);
app.use('/contactos', contactoRoutes);

// Endpoint de métricas
app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
});

module.exports = app;
