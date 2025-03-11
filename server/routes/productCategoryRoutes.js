const express=require("express")
const router=express.Router();


const productCategoryController = require('../controllers/productCategoryController');

// Rutas
router.get('/', productCategoryController.get);
router.get('/:id', productCategoryController.getById);
router.post('/', productCategoryController.create);
router.put('/:id', productCategoryController.update);

module.exports = router;
