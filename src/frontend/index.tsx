
import React from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import storeFactory from './store';
import App from './components/App';

import type { MashroomPortalAppPluginBootstrapFunction } from '@mashroom/mashroom-portal/type-definitions';
import type {ClientState} from '../type-definitions';

export const bootstrap: MashroomPortalAppPluginBootstrapFunction = (
    portalAppHostElement,
    portalAppSetup
) => {
    const { appId, proxyPaths, serverSideRendered, appConfig: {standalone} } = portalAppSetup;
    const bffBasePath = proxyPaths.bff;

    const preloadedStateStr = (global as any)[`__PRELOADED_STATE_${appId}__`];

    if (serverSideRendered && preloadedStateStr) {
        // SSR
        console.info('SSR content found, hydrating App!');
        const preloadedState: ClientState = JSON.parse(preloadedStateStr);
        const store = storeFactory(preloadedState);

        const root = hydrateRoot(portalAppHostElement,
            <Provider store={store}>
                <App standalone={!!standalone} bffBasePath={bffBasePath}/>
            </Provider>,
        );

        return {
            willBeRemoved: () => {
                root.unmount();
            },
        };
    }

    // CSR
    const store = storeFactory();

    const root = createRoot(portalAppHostElement);
    root.render(
        <Provider store={store}>
            <App standalone={!!standalone} bffBasePath={bffBasePath}/>
        </Provider>
    );

    return {
        willBeRemoved: () => {
            root.unmount();
        },
    };
};

(global as any).startupDemoSSRRemotePortalApp = bootstrap;
