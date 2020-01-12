const fs = require('fs-extra');
const path = require('path');
const zlib = require('zlib');
const {createMusicIndex} = require('./models/lunr');


const walk = async (rootPath) => {
  const filePaths = [];
  const w = async (parentPath) => {
    await (await fs.readdir(parentPath))
        .map((file) => path.join(parentPath, file))
        .reduce(async (lock, filePath) => {
          await lock;
          if ((await fs.stat(filePath)).isDirectory()) {
            await w(filePath);
          } else {
            filePaths.push(filePath);
          }
        }, Promise.resolve());
  };

  await w(rootPath);

  return filePaths;
};

const create = async (jsonDirectoryPath, indexDirectoryPath) => {
  console.info('walking directories...');
  const filePaths = await walk(jsonDirectoryPath);
  console.info(`found ${filePaths.length} files...`);

  console.info('creating index...');
  const index = createMusicIndex((index) => {
    for (filePath of filePaths) {
      const json = fs.readJsonSync(filePath);
      index.add({
        id: json.format.filename,
        title: json.format.tags.title,
        artist: json.format.tags.artist,
        artistReading: json.format.tags.TSP,
        albumArtist: json.format.tags.album_artist,
        albumArtistReading: json.format.tags.TS2,
        year: json.format.tags.date,
        genre: json.format.tags.genre,
      });
    }
  });

  await fs.writeFile(
      path.join(indexDirectoryPath, 'music.index.gz'),
      await new Promise((resolve, reject) => {
        zlib.gzip(JSON.stringify(index),
            (err, result) => err ? reject(err) : resolve(result));
      }));
  console.info('done.');
};


module.exports = {
  create,
};

(async () => await create(
    'data/json/',
    'data/index/'))();
