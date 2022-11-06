const express = require('express');
const { readProjectTalker } = require('../fsUtils');

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

module.exports = router;