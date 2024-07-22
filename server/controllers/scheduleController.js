const { PrismaClient } = require('@prisma/client');
const { connect } = require('http2');
const prisma = new PrismaClient();

// Obtener listado
module.exports.get = async (req, res, next) => {
  try {
    const listado = await prisma.schedule.findMany({
      orderBy: { day: 'asc' },
    });
    res.json(listado);
  } catch (error) {
    next(error);
  }
};



// Obtener por branch
//localhost:3000/schedule/3
module.exports.getByBranch = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const obj = await prisma.schedule.findMany({
      where: { branchId: id },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};

// Obtener por Id
//localhost:3000/schedule/3
module.exports.getById = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const obj = await prisma.schedule.findFirst({
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
    const obj = await prisma.schedule.create({
      data: {
        branchId: body.branchId,
        startDate: new Date(body.startDate),
        endDate: new Date( body.endDate),
        description: body.description,
        availability: body.availability // Aquí pasas el valor como enum
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
    const obj = await prisma.schedule.update({
      where: { id },
      data: {
        branchId: body.branchId,
        startDate: body.startDate,
        endDate: body.endDate,
        description: body.description,
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
    const { id } = req.body;
    const obj = await prisma.schedule.delete({
      where: { id },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};
