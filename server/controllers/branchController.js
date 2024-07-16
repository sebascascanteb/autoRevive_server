const { PrismaClient } = require('@prisma/client');
const { connect } = require('http2');
const prisma = new PrismaClient();

// Obtener listado
module.exports.get = async (req, res, next) => {
  try {
    const listado = await prisma.branch.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(listado);
  } catch (error) {
    next(error);
  }
};

// Obtener por Id
//localhost:3000/branch/3
module.exports.getById = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const obj = await prisma.branch.findFirst({
      where: { id: id },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};

// Obtener por encargado asociado a la branch
//localhost:3000/branch/getByIdManager/2
module.exports.getByIdManager = async (req, res, next) => {
  try {
    const managerId = parseInt(req.params.id);

    // Obtener las branches asociadas al manager
    const branches = await prisma.branch.findMany({
      where: { managerId },
      orderBy: { name: 'asc' },
    });
    res.json(branches);
  } catch (error) {
    next(error);
  }
};

// Crear
module.exports.create = async (req, res, next) => {
  try {
    let body = req.body;
    const obj = await prisma.branch.create({
      data: {
        name: body.name,
        managerId: body.managerId,
        description: body.description,
        phoneNumber: body.phoneNumber,
        exactAddress: body.exactAddress,
        email: body.email,
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
    let body = req.body;
    const obj = await prisma.branch.update({
      where: { id },
      data: {
        name: body.name,
        managerId: body.managerId,
        description: body.description,
        phoneNumber: body.phoneNumber,
        exactAddress: body.exactAddress,
        email: body.email,
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
    const obj = await prisma.branch.delete({
      where: { id },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};
