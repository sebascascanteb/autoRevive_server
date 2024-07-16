const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

// Rutas
router.get('/', branchController.get);
router.get('/:id', branchController.getById);
router.post('/', branchController.create);
router.get('/getByIdManager/:id', branchController.getByIdManager);
router.delete('/:id', branchController.delete);
router.put('/:id', branchController.update);
module.exports = router;
