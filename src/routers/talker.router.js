const express = require('express');
const { readProjectTalker, randonToken, validateLogin,
 addIdInProjectTalker, validateToken, validateName, 
 validateAge, 
 writeProjectTalker } = require('../fsUtils');
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

router.put('/talker/:id', 
validateToken,
validateName,
validateAge,
validateTalk,
validateWtchedAt,
validateRate,
 async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await readProjectTalker();
  const uptTalker = talkers.find((talker) => talker.id === Number(id));

  if (!uptTalker) {
    res.status(404).json({ message: 'Talker not found' });
  }
  uptTalker.name = name;
  uptTalker.age = age;
  uptTalker.talk = talk;
  await addIdInProjectTalker(uptTalker);
  return res.status(200).json(uptTalker);
});

router.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await readProjectTalker();
  const arrayPosition = talkers.findIndex((talker) => talker.id === Number(id));
  talkers.splice(arrayPosition, 1);
  await writeProjectTalker(talkers);

  res.status(204).end();
});
module.exports = router;