const fs = require('fs').promises;
const path = require('path');

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

module.exports = {
    readProjectTalker,
};