const pool = require('../../config/db.js');
const bcrypt = require('bcrypt');

const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUsuario = async (req, res) => {
    try {
        const {
            nombre,
            apellido,
            correo,
            telefono,
            password
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            `INSERT INTO usuarios
            (nombre, apellido, correo, telefono, password, puntuacion_confiabilidad, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                nombre,
                apellido,
                correo,
                telefono,
                hashedPassword,
                0,
                'activo'
            ]
        );

        res.status(201).json({
            message: 'Usuario creado',
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nombre,
            apellido,
            correo,
            telefono
        } = req.body;

        await pool.query(
            `UPDATE usuarios
             SET nombre = ?,
                 apellido = ?,
                 correo = ?,
                 telefono = ?
             WHERE id_usuario = ?`,
            [
                nombre,
                apellido,
                correo,
                telefono,
                id
            ]
        );

        res.json({
            message: 'Usuario actualizado'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const cambiarPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            `UPDATE usuarios
             SET password = ?
             WHERE id_usuario = ?`,
            [hashedPassword, id]
        );

        res.json({
            message: 'Contraseña actualizada'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            `UPDATE usuarios
             SET estado = 'inactivo'
             WHERE id_usuario = ?`,
            [id]
        );

        res.json({
            message: 'Usuario desactivado'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getUsuarios,
    createUsuario,
    updateUsuario,
    cambiarPassword,
    deleteUsuario
};
