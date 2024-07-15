const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// Rutas
router.get('/', scheduleController.get);
router.get('/:id', scheduleController.getById);
router.post('/', scheduleController.create);
router.put('/:id', scheduleController.update);
router.delete('/:id', scheduleController.delete);

module.exports = router;
