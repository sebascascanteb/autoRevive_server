const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas
router.get('/', productController.get);
router.get('/:id', productController.getById);
router.post('/', productController.create);
router.put('/:id', productController.update);

module.exports = router;
