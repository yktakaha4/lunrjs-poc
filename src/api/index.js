const {create} = require('../services/indexing');

const lambdaHandler = async (event, _, callback) => {
  try {
    await create();

    callback(null, {
      result: 'ok',
    });
  } catch (error) {
    logger.error(event);
    logger.error(error);

    callback(error);
  }
};

module.exports = {
  lambdaHandler,
};
