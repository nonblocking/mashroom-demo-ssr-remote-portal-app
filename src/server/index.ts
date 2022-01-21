
import express from 'express';
import path from 'path';
import {PORT} from './constants';
import api from './routes/api';
import test_ssr from './routes/test_ssr';
import logger from './logger';

import 'cross-fetch/polyfill';

const app = express();

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const devMiddleware = require('./middleware/devMiddleware').default;
    app.use(devMiddleware);
}

// Api
app.use('/api', api);

// SSR Test Page
app.get('/test_ssr', test_ssr);

// Client
app.use(express.static(path.resolve(__dirname, '../../dist/frontend')));

// Expose package.json for Mashroom Portal
app.use('/mashroom.json', express.static(path.resolve(__dirname, '..', '..', 'mashroom.json')));
app.use('/package.json', express.static(path.resolve(__dirname, '..', '..', 'package.json')));

app.listen(PORT, () => {
    logger.info('Server available at http://localhost:%s', PORT);
});
