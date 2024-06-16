const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Rutas
router.get('/', invoiceController.get);
router.get('/:id', invoiceController.getById); 
router.post('/', invoiceController.create);
router.get('/listByManager/:id', invoiceController.listInvoicesByManager);

module.exports = router;