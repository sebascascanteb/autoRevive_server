const { PrismaClient } = require("@prisma/client");
const { connect } = require("http2");
const prisma = new PrismaClient();

// Obtener listado
module.exports.get = async (req, res, next) => {
  try {
    const listado = await prisma.product.findMany({
      orderBy: { name: "asc" },
    });
    res.json(listado);
  } catch (error) {
    next(error);
  }
};

// Obtener por Id
//localhost:3000/product/3
module.exports.getById = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const obj = await prisma.product.findFirst({
      where: { id: id },
      include: {
        category: {
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
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        warranty: body.warranty,
        compatibility: body.compatibility,
        categoryId: body.categoryId,
      },
    });
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

// Actualizar
module.exports.update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, price, warranty, compatibility, categoryId } =
      req.body;
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, price, warranty, compatibility, categoryId },
    });
    res.json(updatedProduct);

    let body = req.body;
    let idProduct = parseInt(req.params.id);
    

    const updateProduct = await prisma.product.update({
      where: {
        id: idProduct,
      },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        warranty: body.warranty,
        compatibility: body.compatibility,
        categoryId: body.categoryId,
      },
    });
    res.json(updateProduct);
  } catch (error) {
    next(error);
  }
};
