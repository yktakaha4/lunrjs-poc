const {query} = require('../services/searching');

const lambdaHandler = async (event, _, callback) => {
  try {
    await query();

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
