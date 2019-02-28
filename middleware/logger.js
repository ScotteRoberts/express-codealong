const moment = require('moment');

const logger = (req, res, next) => {
  console.log(`${req.url}: was requested at ${moment()}`);
  next();
};

module.exports = logger;
