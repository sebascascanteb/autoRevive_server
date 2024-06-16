const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const chalk = require("chalk");
const prism = new PrismaClient();
//---Archivos de rutas---
const serviceRouter= require("./routes/serviceRoutes")
const productCategoryRouter= require("./routes/productCategoryRoutes")
const productRouter= require("./routes/productRoutes")
const serviceTypeRouter= require("./routes/serviceTypeRoutes")
const invoiceRouter= require("./routes/invoiceRoutes")
const reservationRouter= require("./routes/reservationRoutes")

// Acceder a la configuracion del archivo .env
dotEnv.config();
// Puero que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;
// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger("dev"));
// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//---- Definir rutas ----
app.use("/service/",serviceRouter)
app.use("/productCategory/",productCategoryRouter)
app.use("/product/",productRouter)
app.use("/serviceType/",serviceTypeRouter)
app.use("/invoice/",invoiceRouter)
app.use("/reservation/",reservationRouter)

// Servidor
app.listen(port, () => {
  console.log(chalk.blue(`http://localhost:${port}`));
  console.log(chalk.blue.bgRed("Presione CTRL-C para deternerlo\n"));
});
