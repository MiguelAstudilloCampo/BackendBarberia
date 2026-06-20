const pool = require('../../config/db.js');

// Obtener todas las calificaciones
const getCalificaciones = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM calificaciones'
        );

        res.status(200).json(rows);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Crear calificación
const createCalificacion = async (req, res) => {
    try {
        const {
            id_usuario,
            id_barberia,
            id_turno,
            puntuacion,
            comentario,
            fecha_calificacion
        } = req.body;

        const [result] = await pool.query(
            `INSERT INTO calificaciones
            (id_usuario, id_barberia, id_turno, puntuacion, comentario, fecha_calificacion)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                id_usuario,
                id_barberia,
                id_turno,
                puntuacion,
                comentario,
                fecha_calificacion
            ]
        );

        res.status(201).json({
            message: 'Calificación creada',
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Actualizar calificación
const updateCalificacion = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            id_usuario,
            id_barberia,
            id_turno,
            puntuacion,
            comentario,
            fecha_calificacion
        } = req.body;

        const [result] = await pool.query(
            `UPDATE calificaciones
            SET
                id_usuario = ?,
                id_barberia = ?,
                id_turno = ?,
                puntuacion = ?,
                comentario = ?,
                fecha_calificacion = ?
            WHERE id_calificacion = ?`,
            [
                id_usuario,
                id_barberia,
                id_turno,
                puntuacion,
                comentario,
                fecha_calificacion,
                id
            ]
        );

        res.status(200).json({
            message: 'Calificación actualizada',
            affectedRows: result.affectedRows
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Eliminar calificación
const deleteCalificacion = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'DELETE FROM calificaciones WHERE id_calificacion = ?',
            [id]
        );

        res.status(200).json({
            message: 'Calificación eliminada',
            affectedRows: result.affectedRows
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getCalificaciones,
    createCalificacion,
    updateCalificacion,
    deleteCalificacion
};