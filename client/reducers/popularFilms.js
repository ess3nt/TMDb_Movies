import { combineReducers } from 'redux';

import { GOT_POPULAR } from '../constants';

const popularFilmsById = (state = {}, action) => {
    switch (action.type) {
        case GOT_POPULAR:
            return {
                ...state,
                ...action.data.entities.films
            };
        default:
            return state;
    }
};

const ids = (state = [], action) => {
    switch (action.type) {
        case GOT_POPULAR:
            return [
                ...state,
                ...action.data.result
            ];
        default:
            return state;
    }
};

const page = (state = 0, action) => {
    switch (action.type) {
        case GOT_POPULAR:
            return action.page;
        default:
            return state;
    }
};

const popularFilms = combineReducers({
    popularFilmsById,
    ids,
    page
});

export default popularFilms;
