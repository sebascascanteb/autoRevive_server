const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Rutas
router.get('/', invoiceController.get);
router.get('/:id', invoiceController.getById); 
router.post('/', invoiceController.create);
router.put('/:id', invoiceController.update);

router.get('/listByManager/:id', invoiceController.listInvoicesByManager);
router.get('/getByIdClient/:id', invoiceController.getByIdClient);
router.get('/getByIdClientCanceled/:id', invoiceController.getByIdClientCanceled);

module.exports = router;