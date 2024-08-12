const express=require("express")
const router=express.Router();

//Controlador
const serviceController =require("../controllers/serviceController")

//Rutas
router.get('/:id', serviceController.getById);
router.get("/",serviceController.get)
router.post('/', serviceController.create);
router.put('/:id', serviceController.update);

module.exports=router