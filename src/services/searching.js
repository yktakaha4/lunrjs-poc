const fs = require('fs-extra');
const {lunr} = require('../models/lunr');

const indexFilePath = 'data/index/music.json';

const query = async (term) => {
  const data = await fs.readFile(indexFilePath);
  const index = lunr.Index.load(JSON.parse(data));

  return index.search(term).slice(0, 3);
};

module.exports = {
  query,
};

(async () => console.info(JSON.stringify(await query(process.argv[2] || 'test'))))();
