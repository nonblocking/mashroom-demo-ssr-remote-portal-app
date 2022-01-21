
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import fetchJoke from '../fetchJoke';
import {setJoke, setLoading, setError} from '../store/actions';
import styles from './App.scss';
import type {ClientState} from '../../type-definitions';

type Props = {
    restProxyPath: string;
}

export default ({restProxyPath}: Props) => {
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
        </div>
    );
};
