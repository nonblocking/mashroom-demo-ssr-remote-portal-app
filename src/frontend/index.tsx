
import React from 'react';
import {hydrate, render, unmountComponentAtNode} from 'react-dom';
import {Provider} from 'react-redux';
import storeFactory from './store';
import App from './components/App';

import type { MashroomPortalAppPluginBootstrapFunction } from '@mashroom/mashroom-portal/type-definitions';
import type {ClientState} from '../type-definitions';

export const bootstrap: MashroomPortalAppPluginBootstrapFunction = (
    portalAppHostElement,
    portalAppSetup
) => {
    const { appId, restProxyPaths, appConfig: {standalone} } = portalAppSetup;
    const restProxyPath = restProxyPaths.bff;

    const preloadedStateStr = (global as any)[`__PRELOADED_STATE_${appId}__`];
    const ssrHost = portalAppHostElement.querySelector('[data-ssr-host="true"]');

    if (ssrHost && preloadedStateStr) {
        // SSR
        console.info('SSR content found, hydrating App!');
        const preloadedState: ClientState = JSON.parse(preloadedStateStr);
        const store = storeFactory(preloadedState);

        hydrate(
            <Provider store={store}>
                <App standalone={!!standalone} restProxyPath={restProxyPath}/>
            </Provider>,
            ssrHost,
        );

        return {
            willBeRemoved: () => {
                unmountComponentAtNode(ssrHost);
            },
        };
    }

    console.info('!!!!!', portalAppSetup);

    // CSR

    const store = storeFactory();

    render(
        <Provider store={store}>
            <App standalone={!!standalone} restProxyPath={restProxyPath}/>
        </Provider>,
        portalAppHostElement,
    );

    return {
        willBeRemoved: () => {
            unmountComponentAtNode(portalAppHostElement);
        },
    };
};

(global as any).startupDemoSSRRemotePortalApp = bootstrap;
