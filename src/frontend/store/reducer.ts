
import {SET_JOKE, SET_LOADING, SET_ERROR} from './actions';
import type {Reducer, AnyAction} from 'redux';
import type {ClientState} from '../../type-definitions';

const reducer: Reducer<ClientState> = (state, action: AnyAction) => {
    if (typeof (state) === 'undefined') {
        return {
            joke: null,
            loading: false,
            error: false,
        };
    }

    switch (action.type) {
        case SET_JOKE:
            return {
                ...state,
                joke: action.joke,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

export default reducer;
