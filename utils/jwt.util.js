const jwt = require('jsonwebtoken');
require('dotenv').config();

const config = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const SECRET = process.env.SECRET || 'trybe-lindona';

const createToken = (payload) => jwt.sign({ payload }, SECRET, config);
const digestToken = (token) => jwt.verify(token, SECRET);

module.exports = {
  createToken,
  digestToken,
};
