const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener listado
module.exports.get = async (req, res, next) => {
    try {
        const listado = await prisma.productCategory.findMany({
            orderBy: { name: 'asc' }
        });
        res.json(listado);
    } catch (error) {
        next(error);
    }
};

// Obtener por Id
module.exports.getById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const obj = await prisma.productCategory.findFirst({
            where: { id }
        });
        res.json(obj);
    } catch (error) {
        next(error);
    }
};

// Crear
module.exports.create = async (req, res, next) => {
    try {
        const { name } = req.body;
        const newProductCategory = await prisma.productCategory.create({
            data: { name }
        });
        res.json(newProductCategory);
    } catch (error) {
        next(error);
    }
};

// Actualizar
module.exports.update = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const updatedProductCategory = await prisma.productCategory.update({
            where: { id },
            data: { name }
        });
        res.json(updatedProductCategory);
    } catch (error) {
        next(error);
    }
};
