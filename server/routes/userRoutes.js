const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas
router.get('/', userController.get);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.put('/getNotBranchAssociate/:id', userController.getNotBranchAssociate);
router.put('/getByBranch/:id', userController.getByBranch);
// authentication routes
// login
router.post('/login', userController.login);
// register
router.post('/register', userController.register);
module.exports = router;
