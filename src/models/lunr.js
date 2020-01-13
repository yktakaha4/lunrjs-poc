const lunr = require('lunr');
const kuromoji = require('./kuromoji');
const {clean} = require('./utils');

// require('lunr-languages/lunr.stemmer.support.js')(lunr);
// require('lunr-languages/tinyseg.js')(lunr);
// require('lunr-languages/lunr.ja.js')(lunr);

const createMusicIndex = async (callback) => {
  const kuromojiTokenizer = await kuromoji.createTokenizer();
  const isValidPos = (t) => ['名詞', '動詞', '形容詞'].includes(t.pos);

  const plugin = (builder) => {
    const tokenizer = (input, meta) => {
      const cleaned = clean(input);

      if (meta.fields.includes('kuromojiTokens')) {
        const strings = kuromojiTokenizer
            .tokenize(cleaned)
            .filter(isValidPos)
            .map((token) => {
              const strings = [token.surface_form];
              if (token.basic_form !== '*') strings.push(token.basic_form);
              if (token.reading !== '*') strings.push(token.reading);
              return strings;
            })
            .reduce((array, tokens) => array.concat(tokens), [])
            .filter((string) => {
              if (typeof string === 'string') {
                if (/^\w+$/g.test(string)) {
                  return string.length > 2;
                } else if (/^[ァ-ヴー・]+$/g.test(string)) {
                  return string.length > 1;
                } else {
                  return true;
                }
              } else {
                return false;
              }
            });

        return Array
            .from(strings)
            .map((string) => new lunr.Token(string));
      } else {
        return [new lunr.Token(cleaned)];
      }
    };

    builder.tokenizer = tokenizer;
    builder.pipeline.reset();
    builder.searchPipeline.reset();
  };

  return lunr((index) => {
    index.ref('id');

    index.field('title', {boost: 8});
    index.field('album', {boost: 16});
    index.field('artist', {boost: 32});
    index.field('artistReading', {boost: 2});
    index.field('albumArtist', {boost: 16});
    index.field('albumArtistReading', {boost: 2});
    index.field('year', {boost: 4});
    index.field('genre', {boost: 4});
    index.field('kuromojiTokens');

    index.use(plugin);

    callback(index);
  });
};


module.exports = {
  lunr,
  createMusicIndex,
};
