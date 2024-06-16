const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Rutas
router.get('/', reservationController.get);
//router.get('/:id', reservationController.getById); 
router.post('/', reservationController.create);
router.get('/listByManager/:id', reservationController.listReservationsByManager);
router.get('/getByIdClient/:id', reservationController.getByIdClient);

module.exports = router;