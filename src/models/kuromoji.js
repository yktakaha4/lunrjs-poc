const kuromoji = require('kuromoji');

const createTokenizer = async (dictionaryDirectoryPath) => {
  return await new Promise((resolve, reject) => {
    kuromoji.builder({
      dicPath: dictionaryDirectoryPath || 'node_modules/kuromoji/dict',
    }).build((err, tokenizer) => {
      err ? reject(err) : resolve(tokenizer);
    });
  });
};

module.exports = {
  createTokenizer,
};
