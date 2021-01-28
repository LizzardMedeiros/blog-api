const Joi = require('@hapi/joi');
const { digestToken } = require('../utils/jwt.util');

const NAME_MIN = 8;
const PASS_MIN = 6;

const USER_BASE = {
  email: Joi.string().email().required(),
  password: Joi.string().min(PASS_MIN).messages(
    { 'string.min': `"password" length must be ${PASS_MIN} characters long` },
  ).required(),
};

const LOGIN_SCHEMA = Joi.object(USER_BASE);

const REGISTER_SCHEMA = Joi.object({
  ...USER_BASE,
  displayName: Joi.string().min(NAME_MIN).required(),
  image: Joi.string(),
});

const validateAuth = ({ headers }) => (errMessage) => {
  console.log('token');
  try {
    const { authorization: token } = headers;
    const { payload } = digestToken(token);
    return payload;
  } catch ({ message }) {
    switch (message) {
      case 'jwt must be provided':
        throw new Error('Token não encontrado;401');
      case 'jwt malformed':
        throw new Error('Token expirado ou inválido;401');
      default:
        console.error(message);
        throw new Error(errMessage || 'Erro desconhecido;500');
    }
  }
}

const validate = (schema) => (data) => {
  const { error } = schema.validate(data || {});
  if (error) throw new Error(`${error};400`.replace('ValidationError: ', ''));
};

module.exports = {
  REGISTER_SCHEMA,
  LOGIN_SCHEMA,
  validate,
  validateAuth,
};
