const express = require('express');
const router = express.Router();
const invoiceDetail = require('../controllers/InvoiceDetailController');

// Rutas
router.get('/', invoiceDetailController.get);
router.get('/:id', invoiceDetailController.getById);
router.post('/', invoiceDetailController.create);
router.put('/:id', invoiceDetailController.update);
router.delete('/:id', invoiceDetailController.delete);

module.exports = router;
