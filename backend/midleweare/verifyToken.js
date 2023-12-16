const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('./../config/configDb');
const { httpStatus } = require('../config/constants');
const UserModel = require('../model/userModel');

const verifyToken = (req, res, next) => {
  if (req.headers.hasOwnProperty('authorisation')) {
    let token = req.headers.authorisation;
    jwt.verify(token, JWT_KEY, async (error, decode) => {
      if (error) {
        res
          .status(httpStatus.TOKEN_EXPIRIES.status)
          .send(httpStatus.TOKEN_EXPIRIES.send);
      } else {
        try {
          const user = await UserModel.findOne({ _id: decode._id });
          if (user) {
            req.locals = {
              name: user.name,
              role: user.role,
              _id: decode._id,
            };
            next();
          } else {
            res
              .status(httpStatus.TOKEN_EXPIRIES.status)
              .send(httpStatus.TOKEN_EXPIRIES.send);
          }
        } catch (error) {
          res
            .status(httpStatus.SERVICE_ERROR.status)
            .send(httpStatus.SERVICE_ERROR.send);
        }
      }
    });
  } else {
    res
      .status(httpStatus.TOKEN_EXPIRIES.status)
      .send({ msg: 'You are not logged' });
  }
};
module.exports = verifyToken;
