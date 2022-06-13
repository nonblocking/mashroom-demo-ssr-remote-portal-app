
import {createElement} from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {PORT} from './constants';
import storeFactory from '../frontend/store';
import App from '../frontend/components/App';
import fetchJoke from '../frontend/fetchJoke';
import type {MashroomPortalAppPluginSSRBootstrapFunction} from '@mashroom/mashroom-portal/type-definitions';
import type {ClientState} from '../type-definitions';

const ssrBootstrap: MashroomPortalAppPluginSSRBootstrapFunction = async (portalAppSetup) => {
    const { appId, appConfig: {standalone} } = portalAppSetup;

    // Prefetch data and setup Redux store
    const bffBasePath = `http://localhost:${PORT}/api`;
    const joke = await fetchJoke(bffBasePath);
    const preloadedState: ClientState = { joke, error: false, loading: false };
    const store = storeFactory(preloadedState);

    // Render App with preloaded State
    const appHtml = renderToString(
        createElement(
            // @ts-ignore
            Provider, { store },
            createElement(App, { bffBasePath, standalone })
        )
    );

    return `
        <div>
            <script>
                 window['__PRELOADED_STATE_${appId}__'] = "${JSON.stringify(preloadedState).replace(/"/g, '\\"')}";
            </script>
            <div data-ssr-host="true">${appHtml}</div>
        </div>
    `;
};

export default ssrBootstrap;
