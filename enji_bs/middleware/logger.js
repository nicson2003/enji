/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
const winston = require('winston');
const { format } = require('date-fns');

const fileName = './logs/' + format(new Date(), 'yyyyMMdd').toString() + '.log';

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: fileName,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false,
            handleExceptions: true
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            handleExceptions: true
        }),
        new winston.transports.Http({
          level: 'warn',
          format: winston.format.json(),
          handleExceptions: true
        }),
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
      logger.info(message);
    }
};
