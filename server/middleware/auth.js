const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

module.exports.verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  let token;
  if (typeof bearerHeader !== 'undefined') {
    token = bearerHeader.split(' ')[1].trim().toString();
  } else {
    return res.status(403).json({
      status: false,
      message: 'Forbidden',
    });
  }
  if (token) {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await prisma.user.findUnique({
      where: {
        email: verifyToken.email,
      },
    });
    req.user = verifyToken;
    next();
  }
};

exports.grantRole = function (roles) {
  return async (req, res, next) => {
    try {
      const bearerHeader = req.headers['authorization'];
      let token;
      if (typeof bearerHeader !== 'undefined') {
        token = bearerHeader.split(' ')[1].trim().toString();
      } else {
        return res.status(403).json({
          status: false,
          message: 'Forbidden',
        });
      }
      if (token) {
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // ['CLIENT', 'ADMIN', 'MANAGER']
        if (roles.length && roles.indexOf(verifyToken.role) === -1) {
          return res.status(403).json({
            status: false,
            message: 'Forbidden',
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };
};
