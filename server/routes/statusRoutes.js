const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

// Rutas
router.get('/', statusController.get);
router.get('/:id', statusController.getById);
router.post('/', statusController.create);
router.put('/:id', statusController.update);
router.delete('/:id', statusController.delete);

module.exports = router;
