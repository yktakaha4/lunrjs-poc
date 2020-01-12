const lunr = require('lunr');

require('lunr-languages/lunr.stemmer.support.js')(lunr);
require('lunr-languages/tinyseg.js')(lunr);
require('lunr-languages/lunr.multi.js')(lunr);
require('lunr-languages/lunr.ja.js')(lunr);

const createMusicIndex = (callback) => {
  return lunr((index) => {
    index.ref('id');

    index.field('title');

    index.field('artist');
    index.field('artistReading');
    index.field('albumArtist');
    index.field('albumArtistReading');
    index.field('year');
    index.field('genre');

    index.use(lunr.multiLanguage('ja', 'en'));

    callback(index);
  });
};


module.exports = {
  lunr,
  createMusicIndex,
};
