import React from 'react';
import { Route } from 'react-router';
import App from '../containers/App';
import FilmCard from '../containers/FilmCard';
import FavoritesFilms from '../containers/FavoritesFilms';

const routes = (
    <Route path="/" component={App}>
        <Route path="/favorites" component={FavoritesFilms} />
        <Route path="/search(:id)" />
        <Route path="/film/(:id)" component={FilmCard} />
    </Route>
);

export default routes;
