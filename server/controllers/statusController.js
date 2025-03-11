const { PrismaClient } = require('@prisma/client');
const { connect } = require('http2');
const prisma = new PrismaClient();

// Obtener listado
module.exports.get = async (req, res, next) => {
  try {
    const listado = await prisma.status.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(listado);
  } catch (error) {
    next(error);
  }
};

// Obtener por Id
//localhost:3000/status/3
module.exports.getById = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const obj = await prisma.status.findFirst({
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
    const obj = await prisma.status.create({
      data: {
        description: body.description,
        color: body.color,
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
    const obj = await prisma.status.update({
      where: { id },
      data: {
        description: body.description,
        color: body.color,
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
    await prisma.status.delete({
      where: { id },
    });
    res.json({ message: 'Eliminado' });
  } catch (error) {
    next(error);
  }
};
