
export const SET_JOKE = 'SET_JOKE';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export const setJoke = (joke: string) => {
    return {
        type: SET_JOKE,
        joke,
    };
};

export const setLoading = (loading: boolean) => {
    return {
        type: SET_LOADING,
        loading,
    };
};

export const setError = (error: boolean) => {
    return {
        type: SET_ERROR,
        error,
    };
};
