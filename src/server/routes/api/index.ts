import {Router} from 'express';
import bodyParser from 'body-parser';
import randomJoke from './randomJoke';
import ssr from './ssr';

const api = Router();

api.use(bodyParser.json());

api.get('/randomJoke', randomJoke);
api.post('/ssr', ssr);

export default api;
