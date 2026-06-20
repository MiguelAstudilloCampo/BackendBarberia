const express = require('express');
const router = express.Router();

const {
    getBarbero,
    createBarbero,
    updateBarbero,
    deleteBarbero
} = require('../controllers/barbero_controller');

router.get('/', getBarbero);
router.post('/', createBarbero);
router.put('/:id', updateBarbero);
router.delete('/:id', deleteBarbero);

module.exports = router;