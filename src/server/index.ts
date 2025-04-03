
import path from 'path';
import express from 'express';
import {PORT} from './constants';
import api from './routes/api';
import test_ssr from './routes/test_ssr';
import logger from './logger';

import 'cross-fetch/polyfill';

const app = express();

if (process.env.NODE_ENV === 'development') {
    const devMiddleware = require('./middleware/devMiddleware').default;
    app.use(devMiddleware);
}

// Api
app.use('/api', api);

// SSR Test Page
app.get('/test_ssr', test_ssr);

// Test page
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist/frontend/index.html'));
});

// Expose package.json for Mashroom Portal
app.get('/mashroom.json', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../mashroom.json'));
});
app.get('/package.json', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../package.json'));
});

// Client static resources
app.use(express.static(path.resolve(__dirname, '../../dist/frontend')));

app.listen(PORT, () => {
    logger.info('Server available at http://localhost:%s', PORT);
});
