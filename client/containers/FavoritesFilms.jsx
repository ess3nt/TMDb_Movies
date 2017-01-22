import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Link } from 'react-router';

import { toggleFilmToFavorites } from '../actions';
import Films from '../components/Films';

const styles = {
    paper: {
        height: '540px',
        padding: '20px',
        width: '90%',
        minWidth: '800px',
        margin: '70px auto 0 auto',
        display: 'block',
        position: 'fixed',
        zIndex: 150,
        top: 0,
        left: '60px',
        overflowY: 'auto'
    },
    section: {
        display: 'inline-block',
        margin: 'auto',
        color: 'gray'
    },
    closeIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 100
    }
};

class FavoritesFilms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasMoreItems: true
        };
    }

    render() {
        const { filmsIds, films, genresById } = this.props;
        return (
            <Paper style={styles.paper} zDepth={5}>
                <Link to="/">
                    <IconButton style={styles.closeIcon} >
                        <NavigationClose style={styles.closeIcon} color="grey" />
                    </IconButton>
                </Link>
                <h2 style={styles.section}>Favorites</h2>
                <Films
                    imgSize="300"
                    filmsIds={filmsIds}
                    films={films}
                    genresById={genresById}
                    toggleFilmToFavorites={this.props.toggleFilmToFavorites}
                    favoritesFilmsIds={this.props.favoritesFilmsIds}
                />
            </Paper>
        );
    }
}

const mapStateToProps = state => ({
    filmsIds: state.favoritesFilms.ids,
    films: state.favoritesFilms.favoritesFilmsById,
    genresById: state.genres.genresById,
    favoritesFilmsIds: state.favoritesFilms.ids
});

export default connect(mapStateToProps, {
    toggleFilmToFavorites
})(FavoritesFilms);

FavoritesFilms.propTypes = {
    toggleFilmToFavorites: React.PropTypes.func.isRequired,
    filmsIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    films: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
    genresById: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
    favoritesFilmsIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
};
