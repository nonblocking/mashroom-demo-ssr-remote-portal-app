import {createStore} from 'redux';
import reducer from './reducer';
import type {ClientState, Store} from '../../type-definitions';

let storeEnhancer: any = undefined;
if (process.env.NODE_ENV !== 'production') {
    storeEnhancer = (global as any).__REDUX_DEVTOOLS_EXTENSION__ && (global as any).__REDUX_DEVTOOLS_EXTENSION__();
}

const storeFactory: (preloadedState?: ClientState | undefined) => Store = (preloadedState) => createStore(reducer, preloadedState, storeEnhancer);

export default storeFactory;
