const { PrismaClient } = require("@prisma/client");
const { connect } = require("http2");
const prisma = new PrismaClient();

// Obtener listado
module.exports.get = async (req, res, next) => {
  try {
    const listado = await prisma.reservation.findMany({
      orderBy: { date: "asc" },
    });
    res.json(listado);
  } catch (error) {
    next(error);
  }
};

// Obtener por Id
//localhost:3000/reservation/3
module.exports.getById = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const obj = await prisma.reservation.findFirst({
      where: { id: id },
      include: {
        client: true, 
        service: true, 
        branch: true,  
        status: true  

      }
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};

//localhost:3000/reservation/getByIdClient/2
module.exports.getByIdClient = async (req, res, next) => {
  try {
    const clientId = parseInt(req.params.id);

    // Obtener las facturas de la branch asociada al manager
    const reservations = await prisma.reservation.findMany({
      where: { clientId },
      orderBy: { date: "desc" },
      include: {
        client: true, 
        service: true, 
        branch: true,  
        status: true  

      }
    });

    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

module.exports.getByIdClientAndBranch = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    // Buscar el cliente con su branch asociada
    const client = await prisma.user.findUnique({
      where: { id: id },
      include: {
        branch: true,  // Incluye la relación branch
      }
    });

    if (!client || !client.branch) {
      return res.status(404).json({ message: 'Client or branch not found' });
    }

    // Obtener las reservas del branch asociado al cliente
    const reservations = await prisma.reservation.findMany({
      where: {
        clientId: id,
        branchId: client.branch.id
      },
      orderBy: { date: "desc" },
      include: {
        client: true, 
        service: true, 
        branch: true,  
        status: true  
      }
    });

    res.json(reservations);
  } catch (error) {
    next(error);
  }
};


module.exports.getByBranch = async (req, res, next) => {
  try {
    const branchId = parseInt(req.params.id);

    // Obtener las facturas de la branch asociada al manager
    const reservations = await prisma.reservation.findMany({
      where: { branchId :  branchId},
      orderBy: { date: "desc" },
      include: {
        client: true, 
        service: true, 
        branch: true,  
        status: true  

      }
    });

    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

//localhost:3000/reservation/listreservationsByManager/2
module.exports.listReservationsByManager = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    // Verificar si el usuario es un MANAGER
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
        branchId: true
      }
    });

    if (!user || user.role !== 'MANAGER') {
      return res.status(403).json({ error: 'User is not a manager or does not exist' });
    }

    const branchId = user.branchId;

    // Obtener las reservas de la branch asociada al manager
    const reservations = await prisma.reservation.findMany({
      where: { branchId },
      orderBy: { date: 'desc' },
      include: {
        client: true, // Incluye todos los campos del cliente
        service: true, // Incluye todos los campos del servicio
        branch: true,  // Incluye todos los campos de la branch
        status: true  // Incluye todos los campos de la branch
      }
    });

    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

// Crear
module.exports.create = async (req, res, next) => {
  try {
    let body = req.body;
    const newreservation = await prisma.reservation.create({
      data: {
        clientId: body.clientId,
        branchId: body.branchId,
        serviceId: body.serviceId,
        date: new Date(body.date),
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
        statusId: body.statusId,
        answer1: body.answer1,
        answer2: body.answer2,
        answer3: body.answer3

      },
    });
    res.json(newreservation);
  } catch (error) {
    next(error);
  }
};

// cancel reservation
module.exports.cancel = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const obj = await prisma.reservation.update({
      where: { id },
      data: {
        statusId: 5
      },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};

// Confirm reservation
module.exports.confirm = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const obj = await prisma.reservation.update({
      where: { id },
      data: {
        statusId: 2
      },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};




module.exports.update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    let body = req.body;
    const obj = await prisma.reservation.update({
      where: { id },
      data: {
        clientId: body.clientId,
        branchId: body.branchId,
        serviceId: body.serviceId,
        date: new Date(body.date),
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
        statusId: body.statusId,
        answer1: body.answer1,
        answer2: body.answer2,
        answer3: body.answer3

      },
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
};