const rescue = require('express-rescue');
const { User } = require('../models');

// Utilidades
const {
  REGISTER_SCHEMA,
  LOGIN_SCHEMA,
  validate,
  validateAuth,
} = require('../utils/validation.util');
const { createToken } = require('../utils/jwt.util');

const registerUser = rescue(async (req, _res, next) => {
  validate(REGISTER_SCHEMA)(req.body);
  try {
    const createdAt = new Date();
    const updatedAt = new Date();
    const { id } = await User.create({ ...req.body, createdAt, updatedAt });
    req.data = { token: createToken(id) };
    next();
  } catch {
    throw new Error('Usuário já existe;409');
  }
});

const loginUser = rescue(async (req, _res, next) => {
  validate(LOGIN_SCHEMA)(req.body);
  try {
    const { id } = await User.findOne({ where: { ...req.body } });
    req.data = { token: createToken(id) };
    next();
  } catch {
    throw new Error('Campos inválidos;400');
  }
});

const getUser = rescue(async (req, _res, next) => {
  validateAuth(req)();
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuário não existe;404');
  const { displayName, email, image } = user;
  req.data = { id: Number(id), displayName, email, image };
  next();
});

const deleteUser = rescue(async (req, _res, next) => {
  const id = await validateAuth(req)();
  await User.destroy({ where: { id } });
  next();
});

const getAllUsers = rescue(async (req, _res, next) => {
  validateAuth(req)();
  const userList = await User.findAll();
  req.data = userList.map(
    ({ id, displayName, email, image }) => ({ id, displayName, email, image }),
  );
  next();
});

module.exports = {
  deleteUser,
  loginUser,
  registerUser,
  getAllUsers,
  getUser,
};
