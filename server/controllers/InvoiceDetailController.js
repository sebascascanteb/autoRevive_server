const { PrismaClient } = require('@prisma/client');
const { connect } = require('http2');
const prisma = new PrismaClient();

// Obtener listado
module.exports.get = async (req, res, next) => {
  try {
    const listado = await prisma.invoiceDetail.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(listado);
  } catch (error) {
    next(error);
  }
};

// Obtener por Id
//localhost:3000/invoiceDetail/3
module.exports.getById = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const obj = await prisma.invoiceDetail.findFirst({
      where: { id: id },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};

// Crear
module.exports.create = async (req, res, next) => {
  try {
    let body = req.body;
    const obj = await prisma.invoiceDetail.create({
      data: {
        invoiceId: body.invoiceId,
        serviceId: body.serviceId,
        productId: body.productId,
        date: body.date,
        quantity: body.quantity,
        subtotal: body.subtotal,
      },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};

// Actualizar
module.exports.update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    let body = req.body;
    const obj = await prisma.invoiceDetail.update({
      where: { id },
      data: {
        invoiceId: body.invoiceId,
        serviceId: body.serviceId,
        productId: body.productId,
        date: body.date,
        quantity: body.quantity,
        subtotal: body.subtotal,
      },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};

// Eliminar
module.exports.delete = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const obj = await prisma.invoiceDetail.delete({
      where: { id },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};
