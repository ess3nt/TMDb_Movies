import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import configureStore from './store';
import routes from './routes';
import { saveStore } from './store/localStorage';

/* global document */
const store = configureStore();

store.subscribe(() => {
    saveStore({
        favoritesFilms: store.getState().favoritesFilms
    });
});

const rootEl = document.getElementById('root');

render(
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={browserHistory} routes={routes} />
        </Provider>
    </MuiThemeProvider>,
    rootEl
);
