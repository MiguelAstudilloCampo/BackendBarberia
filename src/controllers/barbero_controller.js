const pool = require('../../config/db.js');

const getBarbero = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM barberos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createBarbero = async (req, res) => {
    try {
        const {
            id_usuario,
            id_barberia,
            especialidad,
            experiencia,
            disponible,
            horario_inicio,
            horario_fin,
            descanso_inicio,
            descanso_fin,
            estado
        } = req.body;

        const [result] = await pool.query(
            `INSERT INTO barberos
            (id_usuario, id_barberia, especialidad, experiencia, disponible, horario_inicio, horario_fin, descanso_inicio, descanso_fin, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id_usuario,
                id_barberia,
                especialidad,
                experiencia,
                disponible,
                horario_inicio,
                horario_fin,
                descanso_inicio,
                descanso_fin,
                estado
            ]
        );

        res.status(201).json({
            message: 'Barbero creado',
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const updateBarbero = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            id_usuario,
            id_barberia,
            especialidad,
            experiencia,
            disponible,
            horario_inicio,
            horario_fin,
            descanso_inicio,
            descanso_fin,
            estado
        } = req.body;

        await pool.query(
            `UPDATE barberos SET
            id_usuario = ?,
            id_barberia = ?,
            especialidad = ?,
            experiencia = ?,
            disponible = ?,
            horario_inicio = ?,
            horario_fin = ?,
            descanso_inicio = ?,
            descanso_fin = ?,
            estado = ?
            WHERE id_barbero = ?`,
            [
                id_usuario,
                id_barberia,
                especialidad,
                experiencia,
                disponible,
                horario_inicio,
                horario_fin,
                descanso_inicio,
                descanso_fin,
                estado,
                id
            ]
        );

        res.json({
            message: 'Barbero actualizado'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const deleteBarbero = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            'DELETE FROM barberos WHERE id_barbero = ?',
            [id]
        );

        res.json({
            message: 'Barbero eliminado'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getBarbero,
    createBarbero,
    updateBarbero,
    deleteBarbero
};