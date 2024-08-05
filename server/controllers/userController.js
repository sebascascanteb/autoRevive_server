const { PrismaClient } = require('@prisma/client');
const { connect } = require('http2');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { response } = require('express');

//Register user
module.exports.register = async (req, res, next) => {
  const userData = req.body;
  userData.birthDate = new Date(userData.birthDate);
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hashSync(userData.password, salt);
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      phone: userData.phone.toString(),
      email: userData.email,
      exactAddress: userData.exactAddress,
      birthDate: userData.birthDate,
      password: hashedPassword,
    },
  });
  res.json(user);
  response.status(200).json({
    status: true,
    message: 'User created successfully',
    data: user,
  });
};

//Login user

module.exports.login = async (req, res, next) => {
  let userReq = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: userReq.email,
    },
  });
  if (!user) {
    return res.status(400).json({
      status: false,
      message: 'User not found',
    });
  }
  const validPassword = await bcrypt.compare(userReq.password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      status: false,
      message: 'Invalid password',
    });
  } else {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return res.status(200).json({
      status: true,
      message: 'User logged in successfully',
      token: token,
    });
  }
};

// Obtener listado
module.exports.get = async (req, res, next) => {
  try {
    const listado = await prisma.user.findMany({
      orderBy: { name: 'asc' },
      include: {
        branch: true,
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
        branch: true,
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
        branch: true,
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
