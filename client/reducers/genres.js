import { combineReducers } from 'redux';

import { GOT_GENRES } from '../constants';

const genresById = (state = {}, action) => {
    switch (action.type) {
        case GOT_GENRES:
            return { ...action.data.entities.genres };
        default:
            return state;
    }
};

const ids = (state = [], action) => {
    switch (action.type) {
        case GOT_GENRES:
            return [
                ...action.data.result
            ];
        default:
            return state;
    }
};

const genres = combineReducers({
    genresById,
    ids
});

export default genres;
