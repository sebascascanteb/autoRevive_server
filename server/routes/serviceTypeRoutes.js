const express=require("express")
const router=express.Router();


const serviceType = require('../controllers/serviceTypeController');

// Rutas
router.get('/', serviceType.get);
router.get('/:id', serviceType.getById);
router.post('/', serviceType.create);
router.put('/:id', serviceType.update);

module.exports = router;