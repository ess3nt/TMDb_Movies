import { combineReducers } from 'redux';

import popularFilms from './popularFilms';
import favoritesFilms from './favoritesFilms';
import searchFilms, * as fromSearch from './search';
import genres from './genres';
import filmCard, * as fromFilmCard from './filmCard';

const rootReducer = combineReducers({
    popularFilms,
    searchFilms,
    favoritesFilms,
    genres,
    filmCard
});

export default rootReducer;

export const getLastFiveMovies = state => fromSearch.getLastFiveMovies(state.searchFilms);

export const getSevenMovies = state => fromFilmCard.getSevenMovies(state.filmCard);
