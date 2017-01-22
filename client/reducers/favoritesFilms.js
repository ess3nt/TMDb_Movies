import { combineReducers } from 'redux';
import { TOGGLE_FILM_FAVORITES } from '../constants';

const toggleFavoritesFilm = (state, film) => {
    if (state[film.id] !== undefined) {
        const newState = { ...state };
        delete newState[film.id];
        return newState;
    }
    return { ...state, [film.id]: film };
};

const toggleFavoritesFilmIds = (state, film) => {
    if (state.indexOf(film.id) >= 0) {
        return state.filter(id => id !== film.id);
    }
    return [film.id, ...state];
};

const favoritesFilmsById = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_FILM_FAVORITES:
            return toggleFavoritesFilm(state, action.film);
        default:
            return state;
    }
};

const ids = (state = [], action) => {
    switch (action.type) {
        case TOGGLE_FILM_FAVORITES:
            return toggleFavoritesFilmIds(state, action.film);
        default:
            return state;
    }
};

const favoritesFilms = combineReducers({
    favoritesFilmsById,
    ids
});

export default favoritesFilms;
