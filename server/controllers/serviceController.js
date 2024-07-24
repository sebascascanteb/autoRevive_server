const { PrismaClient } = require("@prisma/client");
const { connect } = require("http2");
const prisma = new PrismaClient();

// Obtener listado
module.exports.get = async (req, res, next) => {
  try {
    const listado = await prisma.service.findMany({
      orderBy: { name: "asc" },
      include: {
        serviceType: {
          select: {
            name: true,
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
//localhost:3000/service/3
module.exports.getById = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const obj = await prisma.service.findFirst({
      where: { id: id },
      include: {
        serviceType: {
          select: {
            name: true,
          },
        },
      },
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
    const newservice = await prisma.service.create({
      data: {
        name: body.name,
        description: body.description,
        priceRate: body.priceRate,
        serviceTime: body.serviceTime,
        warranty: body.warranty,
        serviceTypeId: body.serviceTypeId,
        imageUrl: body.imageUrl,

      },
    });
    res.json(newservice);
  } catch (error) {
    next(error);
  }
};

// Actualizar
module.exports.update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, priceRate, serviceTime, warranty, serviceTypeId, imageUrl } =
      req.body;
    const updatedservice = await prisma.service.update({
      where: { id },
      data: { name, description, priceRate, serviceTime, warranty, serviceTypeId, imageUrl },
    });
    res.json(updatedservice);

    let body = req.body;
    let idservice = parseInt(req.params.id);
    

    const updateservice = await prisma.service.update({
      where: {
        id: idservice,
      },
      data: {
        name: body.name,
        description: body.description,
        priceRate: body.priceRate,
        serviceTime: body.serviceTime,
        warranty: body.warranty,
        serviceTypeId: body.serviceTypeId,
        imageUrl: body.imageUrl
      },
    });
    res.json(updateservice);
  } catch (error) {
    next(error);
  }
};