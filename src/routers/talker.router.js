const express = require('express');
const { readProjectTalker, randonToken, validateLogin,
 addIdInProjectTalker, validateToken, validateName, validateAge } = require('../fsUtils');
 const { validateTalk, validateWtchedAt, validateRate } = require('../valids');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_MB_STATUS = 404;
const messageError = {
  message: 'Pessoa palestrante não encontrada',
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

router.post('/talker', 
validateToken,
validateName,
validateAge,
validateTalk,
validateWtchedAt,
validateRate,
 async (req, res) => {
  const newTalker = req.body;
  const nweTalkerWithId = await addIdInProjectTalker(newTalker);
  return res.status(201).json(nweTalkerWithId);
});

module.exports = router;