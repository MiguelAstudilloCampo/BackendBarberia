const express = require('express');
const router = express.Router();

const {
    getUsuarios
} = require('../controllers/clientes_controller');

// GET /usuarios
router.get('/', getUsuarios);



module.exports = router;