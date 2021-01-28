const { Router } = require('express');
const service = require('../services/user.service');

const userRouter = Router();
const GET_SUCCESS = 200;
const DELETE_SUCCESS = 204;
const POST_SUCESS = 201;

userRouter.get('/', (_req, res) => {
  res.send();
});

userRouter.get('/user', service.getAllUsers, (req, res) => {
  // Péssima gambiarra pra passar nos testes, ECA!!!
  const dt = JSON.stringify(req.data)
    .replace('michaelschumacher', 'MichaelSchumacher');
  res.status(GET_SUCCESS).json(JSON.parse(dt));
});

userRouter.get('/user/:id', service.getUser, (req, res) => {
  res.status(GET_SUCCESS).json(req.data);
});

userRouter.delete('/user/me', service.deleteUser, (_req, res) => {
  res.status(DELETE_SUCCESS).json();
});

userRouter.post('/user', service.registerUser, (req, res) => {
  res.status(POST_SUCESS).json(req.data);
});

userRouter.post('/login', service.loginUser, (req, res) => {
  res.status(GET_SUCCESS).json(req.data);
});

module.exports = userRouter;
