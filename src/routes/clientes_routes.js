const express = require('express');
const router = express.Router();

const {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/clientes_controller');


const verifyToken = require('../middleware/verefyToken');


router.get('/', getUsuarios);
router.post('/', createUsuario);
router.put('/:id',verifyToken, updateUsuario);
router.delete('/:id',verifyToken, deleteUsuario);



module.exports = router;