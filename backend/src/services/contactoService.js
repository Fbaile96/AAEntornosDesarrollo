const db = require('../config/db');

exports.obtenerContactos = async () => {
    const [rows] = await db.query('SELECT * FROM contactos');
    return rows;
};

exports.obtenerContactoPorId = async (id) => {
    const [rows] = await db.query('SELECT * FROM contactos WHERE id = ?', [id]);
    return rows[0];
};

exports.crearContacto = async ({ nombre, email: email, telefono, direccion }) => {
    const [result] = await db.query(
        'INSERT INTO contactos (nombre, email, telefono, direccion) VALUES (?, ?, ?, ?)',
        [nombre, email, telefono, direccion]
    );
    return { id: result.insertId, nombre, correo: email, telefono, direccion };
};

exports.actualizarContacto = async (id, { nombre, correo, telefono, direccion }) => {
    const [result] = await db.query(
        'UPDATE contactos SET nombre = ?, email = ?, telefono = ?, direccion = ? WHERE id = ?',
        [nombre, correo, telefono, direccion, id]
    );
    return result.affectedRows > 0 ? { id, nombre, correo, telefono, direccion } : null;
};

exports.eliminarContacto = async (id) => {
    const [result] = await db.query('DELETE FROM contactos WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
