const fs = require('fs-extra');
const {lunr} = require('../models/lunr');
const {clean} = require('../models/utils');

const indexFilePath = 'data/index/music.json';

const query = async (term) => {
  const data = await fs.readFile(indexFilePath);
  const index = lunr.Index.load(JSON.parse(data));

  const q = clean(term)
      .replace(/[*:~^+\-]/g, (m) => `\\${m}`)
      .split(' ')
      .reduce((prev, _, ind, src) => {
        return prev.concat([...new Array(src.length)]
            .map((_, i) => src.slice(ind, src.length - i).join('\\ '))
            .filter((s) => s.length > 0));
      }, [])
      .map((t) => (t.length >= 5) ? `${t}~${Math.floor(t.length / 3.5)}` : t)
      .join(' ');

  return index.search(q).slice(0, 5);
};

module.exports = {
  query,
};

(async () => console.info(JSON.stringify(await query(process.argv[2] || 'test'))))();
