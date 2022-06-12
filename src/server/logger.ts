import pino from 'pino';

const isDev = process.env.NODE_ENV === 'development';

const logger = pino({
    level: isDev ? 'debug' : 'info',
    transport: {
        target: 'pino-pretty',
    },
});

export default logger;
