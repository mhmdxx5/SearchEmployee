import winston from "winston";

const infoLogger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss A ZZ'
        }),
        winston.format.json()
      ),
      level: 'info',
      filename: './logger/info.log',
      json: true,
    }),
    new winston.transports.Console(),
  ],
});

const errorLogger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss A ZZ'
        }),
        winston.format.json()
      ),
      level: 'error',
      filename: './logger/errors.log',
      json: true,
    }),
    new winston.transports.Console(),
  ],
});

export  { infoLogger, errorLogger };
