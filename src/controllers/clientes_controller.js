const pool = require('../../config/db');

const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM usuarios'
        );

        res.json(rows);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getUsuarios
};