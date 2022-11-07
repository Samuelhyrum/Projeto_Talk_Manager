const validateTalk = (req, res, next) => {
    const talker = req.body;
    if (!talker.talk) {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório',
          });
    } 
   return next();
};

const validateWtchedAt = (req, res, next) => {
    const talker = req.body;
    const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    if (!talker.talk.watchedAt) {
        return res.status(400).json({
            message: 'O campo "watchedAt" é obrigatório',
          });
    } 
    if (regex.test(talker.talk.watchedAt)) {
        return next();
        }
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
              });
    };

    const validateRate = (req, res, next) => {
        const talker = req.body;
        const rateNumber = talker.talk.rate >= 1 && talker.talk.rate <= 5;
        if (!talker.talk.rate) {
            return res.status(400).json({
                message: 'O campo "rate" é obrigatório',
              });
        } 
        if (Number.isInteger(talker.talk.rate) && rateNumber) {
            return next();
            }
            return res.status(400).json({
                message: 'O campo "rate" deve ser um inteiro de 1 à 5',
              });
        };

module.exports = {
    validateTalk,
    validateWtchedAt,
    validateRate,
};