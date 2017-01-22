// import shortid from 'shortid'
import { normalize } from 'normalizr';

import { GOT_POPULAR,
    GETTING_POPULAR,
    GETTING_SEARCH,
    GOT_SEARCH,
    GETTING_GENRES,
    GOT_GENRES,
    TOGGLE_FILM_FAVORITES,
    GOT_FILM_CARD,
    GETTING_FILM_CARD
} from '../constants';

import getData from '../api';
import { normalizeFilms, normalizeGenres } from '../misc/normalizrSchema';

const getPopular = page => (dispatch) => {
    dispatch({
        type: GETTING_POPULAR
    });
    return getData({
        type: 'getPopular',
        page
    })
        .then(res => dispatch({
            type: GOT_POPULAR,
            page: res.data.page,
            data: normalize(res.data.results, normalizeFilms)
        })
    );
};

const getSearch = input => (dispatch) => {
    dispatch({
        type: GETTING_SEARCH
    });
    return getData({
        type: 'getSearch',
        input
    })
        .then(res => dispatch({
            type: GOT_SEARCH,
            page: res.data.page,
            data: normalize(res.data.results, normalizeFilms)
        })
        );
};

const getGenres = () => (dispatch) => {
    dispatch({
        type: GETTING_GENRES
    });
    return getData({
        type: 'getGenres'
    })
        .then(res => dispatch({
            type: GOT_GENRES,
            data: normalize(res.data.genres, normalizeGenres)
        })
        );
};

const toggleFilmToFavorites = film => ({
    type: TOGGLE_FILM_FAVORITES,
    film
});

const getFilmCard = id => (dispatch) => {
    dispatch({
        type: GETTING_FILM_CARD
    });
    return Promise.all([getData({ type: 'getFilmData', id }), getData({ type: 'getRecommendations', id })])
        .then(res => dispatch({
            type: GOT_FILM_CARD,
            filmData: res[0].data,
            recommendationsData: normalize(res[1].data.results, normalizeFilms)
        })
        );
};

export { getPopular, getSearch, getGenres, toggleFilmToFavorites, getFilmCard };
