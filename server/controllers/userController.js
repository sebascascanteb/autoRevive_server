const { PrismaClient } = require('@prisma/client');
const { connect } = require('http2');
const prisma = new PrismaClient();

// Obtener listado
module.exports.get = async (req, res, next) => {
  try {
    const listado = await prisma.user.findMany({
      orderBy: { name: 'asc' },
      include: {
        branch: true
      },
    });
    res.json(listado);
  } catch (error) {
    next(error);
  }
};


module.exports.getNotBranchAssociate = async (req, res, next) => {
  try {
    const listado = await prisma.user.findMany({
      orderBy: { name: 'asc' },
      where: { branchId: null },
      include: {
        branch: true
      },
    });
    res.json(listado);
  } catch (error) {
    next(error);
  }
};

module.exports.getByBranch = async (req, res, next) => {
  try {
    let idBranch = parseInt(req.params.id);

    const listado = await prisma.user.findMany({
      orderBy: { name: 'asc' },
      where: { branchId: idBranch },
      include: {
        branch: true
      },
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
    const obj = await prisma.user.findFirst({
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
    const obj = await prisma.user.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        exactAddress: body.exactAddress,
        birthDate: body.birthDate,
        password: body.password,
        role: body.role,
        branchId: body.branchId,
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
    const obj = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        exactAddress: body.exactAddress,
        birthDate: body.birthDate,
        password: body.password,
        role: body.role,
        branchId: body.branchId,
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
    const id = parseInt(req.params.id);
    await prisma.user.delete({
      where: { id },
    });
    res.json({ success: 'Registro eliminado' });
  } catch (error) {
    next(error);
  }
};
