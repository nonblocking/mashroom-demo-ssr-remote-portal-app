
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import fetchJoke from '../fetchJoke';
import {setJoke, setLoading, setError} from '../store/actions';
import styles from './App.scss';
import type {ClientState} from '../../type-definitions';

type Props = {
    standalone: boolean;
    restProxyPath: string;
}

const RemoteAppInfoBox = () => (
    <div className={styles.RemoteAppInfoBox}>
        <span className={styles.InfoIcon}/>
        <div>
            This App runs on a remote server and supports hybrid rendering (server-side + client-side).
            <br />
            Check out <a href="/mashroom/admin/ext/remote-portal-apps" target="_blank">/mashroom/admin/ext/remote-portal-apps</a>
            {' '}
            to see where it comes from.
            <br />
            The source code of this App is available
            {' '}
            <a href="https://github.com/nonblocking/mashroom-demo-ssr-remote-portal-app" target="_blank" rel="noreferrer">on github</a>.
        </div>
    </div>
);

export default ({standalone, restProxyPath}: Props) => {
    const dispatch = useDispatch();
    const joke = useSelector<ClientState, string | null | undefined>(s => s.joke);
    const loading = useSelector<ClientState, boolean>(s => s.loading);
    const error = useSelector<ClientState, boolean>(s => s.error);

    const loadJoke = useCallback(() => {
        dispatch(setLoading(true));
        dispatch(setError(false));
        fetchJoke(restProxyPath).then(
            (joke) => {
                dispatch(setJoke(joke));
                dispatch(setLoading(false));
            }
        ).catch((error) => {
            console.error(error);
            dispatch(setError(true));
            dispatch(setLoading(false));
        });
    }, []);
    useEffect(() => {
        if (!joke) {
            loadJoke();
        }
    }, []);

    if (error) {
        return (
            <div className={styles.App}>
                <div className={styles.Error}>Error loading</div>
                <button className={styles.Button} onClick={loadJoke}>Retry</button>
            </div>
        )
    } else if (!joke) {
        return (
            <div className={styles.App}>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div className={styles.App}>
            <h4>Random Chuck Norris Joke</h4>
            <div dangerouslySetInnerHTML={{ __html: joke }}/>
            <button className={styles.Button} onClick={loadJoke} disabled={loading}>Next Joke</button>
            {!standalone && <RemoteAppInfoBox />}
        </div>
    );
};
