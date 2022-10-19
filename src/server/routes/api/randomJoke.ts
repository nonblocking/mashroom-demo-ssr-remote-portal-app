
import logger from '../../logger';
import type { Request, Response } from 'express';


export default async (req: Request, res: Response) => {
    try {
        const result = await fetch('https://api.chucknorris.io/jokes/random');
        if (!result.ok) {
            logger.error(`Looking up a random joke failed. Status: ${result.status}`);
            res.sendStatus(500);
            return;
        }

        const data = await result.json();

        res.json({
            joke: data.value
        });
    } catch (e) {
        logger.error(e, 'Looking up a random joke failed');
        res.sendStatus(500);
    }
};
