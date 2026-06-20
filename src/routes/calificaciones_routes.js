const express = require('express');
const router = express.Router();

const {
    getCalificaciones,
    createCalificacion,
    updateCalificacion,
    deleteCalificacion
} = require('../controllers/calificaciones_controller');

router.get('/', getCalificaciones);

router.post('/', createCalificacion);

router.put('/:id', updateCalificacion);

router.delete('/:id', deleteCalificacion);

module.exports = router;