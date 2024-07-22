const { PrismaClient } = require('@prisma/client');
const { connect } = require('http2');
const prisma = new PrismaClient();

// Obtener listado
module.exports.get = async (req, res, next) => {
  try {
    const listado = await prisma.invoice.findMany({
      orderBy: { date: 'desc' },
      include: {
        branch: true,
        user: true,
        invoiceDetails: {
          include: {
            product: true,

            service: true,
          },
        },
      },
    });

    res.json(listado);
  } catch (error) {
    next(error);
  }
};

// Obtener por Id
//localhost:3000/invoice/3
module.exports.getById = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const obj = await prisma.invoice.findFirst({
      where: { id: id },
      include: {
        branch: true,
        user: true,
        invoiceDetails: {
          include: {
            product: true,

            service: true,
          },
        },
      },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};

// Obtener por encargado asociado a la branch
//localhost:3000/invocie/getByIdClient/2
module.exports.getByIdClient = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    // Obtener las facturas de la branch asociada al manager
    const invoices = await prisma.invoice.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      include: {
        branch: true,
        user: true,
        invoiceDetails: {
          include: {
            product: true,

            service: true,
          },
        },
      },
    });

    res.json(invoices);
  } catch (error) {
    next(error);
  }
};

// Obtener por encargado asociado a la branch
//localhost:3000/invocie/listInvoicesByManager/2
module.exports.listInvoicesByManager = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    // Verificar si el usuario es un MANAGER
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
        branchId: true,
      },
    });

    if (!user || user.role !== 'MANAGER') {
      return res
        .status(403)
        .json({ error: 'User is not a manager or does not exist' });
    }

    const branchId = user.branchId;

    // Obtener las facturas de la branch asociada al manager
    const invoices = await prisma.invoice.findMany({
      where: { branchId },
      orderBy: { date: 'desc' },
      include: {
        branch: true,
        user: true,
        invoiceDetails: {
          include: {
            product: true,

            service: true,
          },
        },
      },
    });

    res.json(invoices);
  } catch (error) {
    next(error);
  }
};

// Crear
module.exports.create = async (req, res, next) => {
  try {
    let body = req.body;
    const newinvoice = await prisma.invoice.create({
      data: {
        userId: body.userId,
        branchId: body.branchId,
        date: body.date,
        total: body.total,
      },
    });
    res.json(newinvoice);
  } catch (error) {
    next(error);
  }
};

// Actualizar
module.exports.update = async (req, res, next) => {
  try {
    let body = req.body;
    let id = parseInt(req.params.id);
    const invoice = await prisma.invoice.update({
      where: { id: id },
      data: {
        userId: body.userId,
        branchId: body.branchId,
        date: body.date,
        total: body.total,
      },
    });
    res.json(invoice);
  } catch (error) {
    next(error);
  }
};
