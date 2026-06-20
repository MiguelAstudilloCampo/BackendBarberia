const express = require('express');
const router = express.Router();

const {
    getBarberias,
    createBarberia,
    updateBarberia,
    deleteBarberia
} = require('../controllers/barberia_controller');

router.get('/', getBarberias);
router.post('/', createBarberia);
router.put('/:id', updateBarberia);
router.delete('/:id', deleteBarberia);

module.exports = router;