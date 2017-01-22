import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Card from '../components/Card';
import { toggleFilmToFavorites, getFilmCard } from '../actions';
import { getSevenMovies } from '../reducers';

class FilmCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendations: [],
            film: {}
        };
    }

    componentDidMount() {
        this.props.getFilmCard(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            this.props.getFilmCard(nextProps.id);
        }
    }

    render() {
        const { film, favoritesFilmsIds, recommendations } = this.props;

        return (
            <Card
                film={film}
                favoritesFilmsIds={favoritesFilmsIds}
                toggleFilmToFavorites={this.props.toggleFilmToFavorites}
                recommendations={recommendations}
            />
        );
    }
}

const mapStateToProps = (state, { params }) => ({
    id: params.id,
    favoritesFilmsIds: state.favoritesFilms.ids,
    film: state.filmCard.film,
    recommendations: getSevenMovies(state)
});

export default withRouter(connect(mapStateToProps, {
    toggleFilmToFavorites,
    getFilmCard
})(FilmCard));

FilmCard.propTypes = {
    toggleFilmToFavorites: React.PropTypes.func.isRequired,
    getFilmCard: React.PropTypes.func.isRequired,
    favoritesFilmsIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    id: React.PropTypes.string.isRequired,
    film: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
    recommendations: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};
