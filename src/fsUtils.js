const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const talkerJson = './talker.json';

async function readProjectTalker() {
    try {
        const data = await fs.readFile(path.resolve(__dirname, talkerJson));
        const talkers = JSON.parse(data);
        return talkers;
    } catch (error) {
        console.error(`Erro na leitura do arquivo: ${error}`);
    }
}

function randonToken() {
    const token = crypto.randomBytes(8).toString('hex');
    return token;
}
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
function validatePassword(password) {
    if (password.length < 6) {
        return false;
    } return true;
}
module.exports = {
    readProjectTalker,
    randonToken,
    validateEmail,
    validatePassword,
};