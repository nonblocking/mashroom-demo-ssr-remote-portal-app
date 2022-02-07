
import logger from '../logger';
import ssr from '../ssr';

import type { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
    try {
        const portalAppSetup: any = {
            pluginName: 'Test',
            appConfig: {
            }
        };

        const html = await ssr(portalAppSetup, req);

        const page = `
            <html>
                <head>
                    <title>SSR Test Page</title>
                    <script src="index.js"></script>
                    <script>
                      document.addEventListener('DOMContentLoaded', function () {
                        var portalAppSetup = {
                          pluginName: 'Test',
                          user: {},
                          restProxyPaths: {
                            bff: '/api'
                          },
                          appConfig: {}
                        };

                        var hostEl = document.getElementById('appHost');
                        window.startupDemoRemotePortalApp(hostEl, portalAppSetup, {});
                      });
                    </script>
                </head>
                <body>
                    <div id="appHost">
                        ${html}
                    </div>
                </body>
            </html>
        `;

        res.setHeader('Content-Type', 'text/html');
        res.send(page);

    } catch (e) {
        logger.error(e, 'SSR failed');
        res.sendStatus(500);
    }
};
