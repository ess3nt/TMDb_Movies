import { combineReducers } from 'redux';

import { GOT_SEARCH, GETTING_SEARCH } from '../constants';

const searchFilmsById = (state = {}, action) => {
    switch (action.type) {
        case GOT_SEARCH:
            return { ...action.data.entities.films };
        case GETTING_SEARCH:
            return {};
        default:
            return state;
    }
};

const ids = (state = [], action) => {
    switch (action.type) {
        case GOT_SEARCH:
            return [...action.data.result];
        case GETTING_SEARCH:
            return [];
        default:
            return state;
    }
};

const page = (state = 0, action) => {
    switch (action.type) {
        case GOT_SEARCH:
            return action.page;
        default:
            return state;
    }
};

const searchFilms = combineReducers({
    searchFilmsById,
    ids,
    page
});

export default searchFilms;

export const getLastFiveMovies = (state) => {
    const arrOfFirstFiveMovies = [];
    let i;
    const count = state.ids.length < 5 ? state.ids.length : 5;

    for (i = 0; i < count; i += 1) {
        arrOfFirstFiveMovies.push(state.searchFilmsById[state.ids[i]]);
    }
    return arrOfFirstFiveMovies;
};
