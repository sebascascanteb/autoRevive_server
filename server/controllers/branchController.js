const { PrismaClient } = require('@prisma/client');
const { connect } = require('http2');
const prisma = new PrismaClient();

// Obtener listado
module.exports.get = async (req, res, next) => {
  try {
    const listado = await prisma.branch.findMany({
      orderBy: { name: 'asc' },
      include: {
        users: true // Incluir usuarios asociados a la sucursal
      }
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
      include: {
        users: true // Incluir usuarios asociados a la sucursal
      }
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

    // Crear el nuevo branch
    const obj = await prisma.branch.create({
      data: {
        name: body.name,
        description: body.description,
        phoneNumber: body.phoneNumber,
        exactAddress: body.exactAddress,
        email: body.email,
        users: {
          connect: body.users.map(userId => ({ id: userId }))
        }
      },
    });

    // Actualizar el branchId de los usuarios
    const userUpdates = body.users.map(userId => {
      return prisma.user.update({
        where: { id: userId },
        data: { branchId: obj.id },
      });
    });

    // Ejecutar las actualizaciones en paralelo
    await Promise.all(userUpdates);

    res.json(obj);
  } catch (error) {
    next(error);
  }
};


// Actualizar
module.exports.update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id); // Asegúrate de que el ID esté siendo obtenido correctamente
    const body = req.body;

    const updatedBranch = await prisma.branch.update({
      where: { id: id },
      data: {
        name: body.name,
        managerId: body.managerId,
        description: body.description,
        phoneNumber: body.phoneNumber,
        exactAddress: body.exactAddress,
        email: body.email,
        users: {
          set: body.users.map(userId => ({ id: userId })) // Asegúrate de mapear los IDs de los usuarios correctamente
        },
      },
    });

    // Actualizar branchId de los usuarios seleccionados
    await Promise.all(
      body.users.map(userId =>
        prisma.user.update({
          where: { id: userId },
          data: { branchId: id },
        })
      )
    );

    res.json(updatedBranch);
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
