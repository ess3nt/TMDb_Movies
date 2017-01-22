import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/';
import { getLocalStore } from './localStorage';

const configureStore = () => {
    const middlewares = [thunk];
    const favoritesFilms = getLocalStore();
    if (process.env.NODE_ENV !== 'production') {
        const logger = createLogger();
        middlewares.push(logger);
    }

    return createStore(
        rootReducer,
        favoritesFilms,
        applyMiddleware(...middlewares)
    );
};

export default configureStore;
