import { combineReducers } from 'redux';

import { GOT_FILM_CARD } from '../constants';

const recommendedFilmsById = (state = {}, action) => {
    switch (action.type) {
        case GOT_FILM_CARD:
            return { ...action.recommendationsData.entities.films };
        default:
            return state;
    }
};

const ids = (state = [], action) => {
    switch (action.type) {
        case GOT_FILM_CARD:
            return [...action.recommendationsData.result];
        default:
            return state;
    }
};

const film = (state = {}, action) => {
    switch (action.type) {
        case GOT_FILM_CARD:
            return action.filmData;
        default:
            return state;
    }
};

const filmCard = combineReducers({
    recommendedFilmsById,
    ids,
    film
});

export default filmCard;

export const getSevenMovies = (state) => {
    const arrOfMovies = [];
    let i;
    const count = state.ids.length < 7 ? state.ids.length : 7;

    for (i = 0; i < count; i += 1) {
        arrOfMovies.push(state.recommendedFilmsById[state.ids[i]]);
    }
    return arrOfMovies;
};
