const express = require('express');
const bodyParser = require('body-parser').json();
require('dotenv').config();

const userController = require('./controllers/user.controller');

const app = express();
const PORT = process.env.PORT || 3000;
const STATUS_FAIL = 500;

app.use(bodyParser);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use('/user', userController);

const errorMiddleware = async (err, _req, res, _next) => {
  const [message, status] = err.message.split(';');
  res.status(status || STATUS_FAIL).json({ message });
};

app.use(errorMiddleware);
