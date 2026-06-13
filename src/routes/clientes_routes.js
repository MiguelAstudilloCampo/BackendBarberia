const express = require('express');
const router = express.Router();

const {
    getUsuarios
} = require('../controllers/clientes_controller');

router.get('/', getUsuarios);

module.exports = router;