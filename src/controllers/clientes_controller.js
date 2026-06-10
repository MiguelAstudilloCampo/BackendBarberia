const express = require('express');
const router = express.Router();
const pool = require('../../config/db');

router.get('/', async (req, res) => {
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
});

module.exports = router;