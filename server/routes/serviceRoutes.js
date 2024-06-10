const express=require("express")
const router=express.Router();

//Controlador
const serviceController =require("../controllers/serviceController")

//Rutas
router.get("/",serviceController.get)

module.exports=router