const db = require('../config/db');

exports.obtenerEventos = async () => {
    const [rows] = await db.query('SELECT * FROM eventos');
    return rows;
};

exports.obtenerEventoPorId = async (id) => {
    const [rows] = await db.query('SELECT * FROM eventos WHERE id = ?', [id]);
    return rows[0];
};

exports.crearEvento = async ({ titulo, fecha, descripcion }) => {
    const [result] = await db.query(
        'INSERT INTO eventos (titulo, fecha, descripcion) VALUES (?, ?, ?)',
        [titulo, fecha, descripcion]
    );
    return { id: result.insertId, titulo, fecha, descripcion };
};

exports.actualizarEvento = async (id, { titulo, fecha, descripcion }) => {
    const [result] = await db.query(
        'UPDATE eventos SET titulo = ?, fecha = ?, descripcion = ? WHERE id = ?',
        [titulo, fecha, descripcion, id]
    );
    return result.affectedRows > 0 ? { id, titulo, fecha, descripcion } : null;
};

exports.eliminarEvento = async (id) => {
    const [result] = await db.query('DELETE FROM eventos WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
