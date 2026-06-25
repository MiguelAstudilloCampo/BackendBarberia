const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../config/db');

const login = async (req, res) => {
    try {

        const { correo, password } = req.body;

        const [rows] = await pool.query(
            `SELECT *
             FROM usuarios
             WHERE correo = ?`,
            [correo]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            });
        }

        const usuario = rows[0];

        const match = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!match) {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id_usuario,
                correo: usuario.correo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        res.json({
            token,
            usuario: {
                id: usuario.id_usuario,
                nombre: usuario.nombre,
                correo: usuario.correo
            }
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    login
};