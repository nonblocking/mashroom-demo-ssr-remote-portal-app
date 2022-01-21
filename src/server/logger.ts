import pino from 'pino';

const isDev = process.env.NODE_ENV === 'development';

const logger = pino({
    level: isDev ? 'debug' : 'info',
    prettyPrint: isDev,
});

export default logger;
