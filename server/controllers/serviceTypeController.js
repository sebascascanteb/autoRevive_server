const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener listado
module.exports.get = async (req, res, next) => {
    try {
        const listado = await prisma.serviceType.findMany({
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
        const obj = await prisma.serviceType.findFirst({
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
        const newserviceType = await prisma.serviceType.create({
            data: { name }
        });
        res.json(newserviceType);
    } catch (error) {
        next(error);
    }
};

// Actualizar
module.exports.update = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const updatedserviceType = await prisma.serviceType.update({
            where: { id },
            data: { name }
        });
        res.json(updatedserviceType);
    } catch (error) {
        next(error);
    }
};