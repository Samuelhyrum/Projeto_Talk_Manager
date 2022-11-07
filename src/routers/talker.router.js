const express = require('express');
const { readProjectTalker, randonToken, validateEmail,
validatePassword } = require('../fsUtils');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_MB_STATUS = 404;
const LOGIN_ERROR = 400;
const messageError = {
    message: 'Pessoa palestrante não encontrada',
  };
const emailError = {
  message: 'O campo "email" é obrigatório',
};
const emailValid = {
  message: 'O "email" deve ter o formato "email@email.com"',
};
const passwordError = {
  message: 'O campo "password" é obrigatório',
};
const passwordValid = {
  message: 'O "password" deve ter pelo menos 6 caracteres',
};

const validateLogin = (req, res, next) => {
  const login = { ...req.body };
    if (!login.email) {
      return res.status(LOGIN_ERROR).json(emailError);
    }
    if (!login.password) {
      return res.status(LOGIN_ERROR).json(passwordError);
    } if (!validateEmail(login.email)) {
      return res.status(LOGIN_ERROR).json(emailValid);
    } if (!validatePassword(login.password)) {
      return res.status(LOGIN_ERROR).json(passwordValid);
    }
    next();
};

router.get('/talker', async (req, res) => {
    const allTalkers = await readProjectTalker();
    
   return res.status(HTTP_OK_STATUS).json(allTalkers);
});

router.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await readProjectTalker();

    const foundTalker = talkers.find((t) => t.id === Number(id));

    if (!foundTalker) {
      return res.status(HTTP_MB_STATUS).json(messageError);
    }
    
   return res.status(HTTP_OK_STATUS).json(foundTalker);
});

router.post('/login', validateLogin, (req, res) => {
  const token = randonToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;