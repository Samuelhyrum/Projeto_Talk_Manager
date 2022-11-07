const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const talkerJson = './talker.json';

const LOGIN_ERROR = 400;

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

async function readProjectTalker() {
    try {
        const data = await fs.readFile(path.resolve(__dirname, talkerJson));
        const talkers = JSON.parse(data);
        return talkers;
    } catch (error) {
        console.error(`Erro na leitura do arquivo: ${error}`);
    }
}

async function writeProjectTalker(newTalker) {
    try {
        await fs.writeFile(path.resolve(__dirname, talkerJson), JSON.stringify(newTalker));
    } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error}`);
    }
}
const addIdInProjectTalker = async (data) => {
    const oldTalker = await readProjectTalker();
    const newIdProjectTalker = oldTalker[oldTalker.length - 1].id + 1;
    const newTalkerJson = { id: newIdProjectTalker, ...data };
    const newTalker = [...oldTalker, newTalkerJson];
    await writeProjectTalker(newTalker);
    return newTalkerJson;
};

function randonToken() {
    const token = crypto.randomBytes(8).toString('hex');
    return token;
}
const tokenVerify = (token) => token.length === 16 && typeof token === 'string';

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
function validatePassword(password) {
    if (password.length < 6) {
        return false;
    } return true;
}
function validName(name) {
    if (name.length < 3) {
        return false;
    } return true;
}
function validAge(age) {
    if (age < 18) {
        return false;
    } return true;
}

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
  
const validateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            message: 'Token não encontrado',
        });
    } 
    const returnVerify = tokenVerify(token);
    if (returnVerify) {
        return next();
    }
    return res.status(401).json({
        message: 'Token inválido',
      });
};
const validateName = (req, res, next) => {
    const talker = req.body;
    if (!talker.name) {
        return res.status(400).json({
            message: 'O campo "name" é obrigatório',
          });
    } 
    if (!validName(talker.name)) {
        return res.status(400).json({
            message: 'O "name" deve ter pelo menos 3 caracteres',
          });
    }
   return next();
};
const validateAge = (req, res, next) => {
    const talker = req.body;
    if (!talker.age) {
        return res.status(400).json({
            message: 'O campo "age" é obrigatório',
          });
    } 
    if (!validAge(talker.age)) {
        return res.status(400).json({
            message: 'A pessoa palestrante deve ser maior de idade',
          });
    }
   return next();
};
module.exports = {
    readProjectTalker,
    randonToken,
    validateEmail,
    validatePassword,
    writeProjectTalker,
    addIdInProjectTalker,
    validateLogin,
    validateToken,
    validateName,
    validateAge,
};