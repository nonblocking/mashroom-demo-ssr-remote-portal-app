
import logger from '../../logger';
import ssr from '../../ssr';

import type { Request, Response } from 'express';
import type {MashroomPortalAppSetup} from '@mashroom/mashroom-portal/type-definitions';

type SSRData = {
    portalAppSetup: MashroomPortalAppSetup;
}

export default async (req: Request, res: Response) => {
    try {
        const ssrData: SSRData = req.body;
        if (!ssrData?.portalAppSetup) {
            res.sendStatus(400);
            return;
        }

        const html = await ssr(ssrData.portalAppSetup);

        res.setHeader('Content-Type', 'text/html');
        res.send(html);

    } catch (e: any) {
        logger.error(e, 'SSR failed');
        res.sendStatus(500);
    }
};
