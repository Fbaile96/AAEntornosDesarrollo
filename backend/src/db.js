const mysql = require('mysql2/promise');

// Ajusta estos valores según tu base de datos
const db = mysql.createPool({
    host: 'localhost',
    user: 'fran',
    password: 'fran',
    database: 'agenda_web'
});

module.exports = db;
