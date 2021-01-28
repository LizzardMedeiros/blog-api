const { Op } = require('sequelize');
const rescue = require('express-rescue');
const { Post, User } = require('../models');

const {
  validate,
  validateAuth,
  POST_SCHEMA,
} = require('../utils/validation.util');

const registerPost = rescue(async (req, _res, next) => {
  const userId = validateAuth(req)();
  validate(POST_SCHEMA)(req.body);
  const published = new Date();
  const updated = new Date();
  await Post.create({ ...req.body, published, updated, userId });
  req.data = { ...req.body, userId };
  next();
});

const editPost = rescue(async (req, _res, next) => {
  const userId = validateAuth(req)();
  validate(POST_SCHEMA)(req.body);
  const { id } = req.params;
  if (!await Post.findByPk(id)) throw new Error('Post não existe;404');
  const [response] = await Post.update(
    { ...req.body, updated: new Date() },
    { where: { id, userId } },
  );
  if (!response) throw new Error('Usuário não autorizado;401');
  req.data = { ...req.body, userId };
  next();
});

const deletePost = rescue(async (req, _res, next) => {
  const userId = validateAuth(req)();
  const { id } = req.params;
  if (!await Post.findByPk(id)) throw new Error('Post não existe;404');
  if (!await Post.destroy({ where: { id, userId } })) {
    throw new Error('Usuário não autorizado;401');
  }
  next();
});

const getPost = rescue(async (req, _res, next) => {
  validateAuth(req)();
  const { id } = req.params;
  const exclude = ['password', 'createdAt', 'updatedAt'];
  const post = await Post.findByPk(id, {
    include: { model: User, as: 'user', attributes: { exclude } },
  });
  if (!post) throw new Error('Post não existe;404');
  req.data = post;
  next();
});

const getAllPosts = rescue(async (req, _res, next) => {
  validateAuth(req)();
  const { q = '' } = req.query;
  const exclude = ['password', 'createdAt', 'updatedAt'];
  const postList = await Post.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: { model: User, as: 'user', attributes: { exclude } },
  });
  req.data = postList;
  next();
});

module.exports = {
  registerPost,
  editPost,
  getAllPosts,
  getPost,
  deletePost,
};
