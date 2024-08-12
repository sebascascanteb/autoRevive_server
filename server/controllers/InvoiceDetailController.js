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
    const body = req.body;

    // Registra el cuerpo de la solicitud para depuración
    console.log('Cuerpo de la solicitud entrante para crear:', body);

    // Valida los campos requeridos
    if (!body.invoiceId || !body.date || !body.quantity || !body.subtotal) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const data = {
      invoice: {
        connect: { id: body.invoiceId },
      },
      date: new Date(body.date),
      quantity: body.quantity,
      subtotal: body.subtotal,
    };

    if (body.serviceId) {
      data.service = {
        connect: { id: body.serviceId },
      };
    }
    
    if (body.productId) {
      data.product = {
        connect: { id: body.productId },
      };
    }

    const obj = await prisma.invoiceDetail.create({
      data,
    });

    res.status(201).json(obj); // Devuelve estado 201 Created
  } catch (error) {
    console.error('Error al crear el detalle de la factura:', error); // Registra el error para depuración
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
