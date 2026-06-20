
const pool = require('../../config/db.js');

const getBarberias = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM barberias');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createBarberia = async (req, res) => {
    try {
        const { nombre, descripcion, direccion, ciudad, telefono, latitud, longitud } = req.body;

        const [result] = await pool.query(
            "INSERT INTO barberias (nombre, descripcion, direccion, ciudad, telefono, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [nombre, descripcion, direccion, ciudad, telefono, latitud, longitud]
        );

        res.status(201).json({
            message: "Barbería creada",
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const updateBarberia = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, direccion, ciudad, telefono, latitud, longitud } = req.body;

        await pool.query(
            `UPDATE barberias 
             SET nombre = ?, descripcion = ?, direccion = ?, ciudad = ?, telefono = ?, latitud = ?, longitud = ?
             WHERE id_barberia = ?`,
            [nombre, descripcion, direccion, ciudad, telefono, latitud, longitud, id]
        );

        res.json({
            message: 'Barbería actualizada'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const deleteBarberia = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            'DELETE FROM barberias WHERE id_barberia = ?',
            [id]
        );

        res.json({
            message: 'Barbería eliminada'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


module.exports = {
    getBarberias,
    createBarberia,
    updateBarberia,
    deleteBarberia
};
