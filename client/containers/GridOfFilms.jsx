import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import { withRouter } from 'react-router';

import { getPopular, toggleFilmToFavorites } from '../actions';
import Films from '../components/Films';

class GridOfFilms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasMoreItems: true
        };
        this.loadItemsHandler = this.loadItemsHandler.bind(this);
    }

    loadItemsHandler() {
        this.props.getPopular(this.props.page + 1);
    }

    render() {
        const { filmsIds, films, genresById, isSearch } = this.props;
        return (<div className="wrapper">
            {isSearch ? <h2>&nbsp;&nbsp;Search Result</h2> : null}
            <InfiniteScroll
                pageStart={0}
                threshold={200}
                loadMore={this.loadItemsHandler}
                hasMore={this.state.hasMoreItems}
                loader={isSearch ? null : <CircularProgress
                    size={80}
                    thickness={5}
                    style={{
                        margin: 'auto',
                        display: 'block'
                    }}
                />}
            >
                <Films
                    imgSize="500"
                    filmsIds={filmsIds}
                    films={films}
                    genresById={genresById}
                    toggleFilmToFavorites={this.props.toggleFilmToFavorites}
                    favoritesFilmsIds={this.props.favoritesFilmsIds}
                    isSearch={isSearch}
                />
            </InfiniteScroll>
        </div>
        );
    }
}

const mapStateToProps = (state, { location }) => {
    const isSearch = location.pathname.substr(0, 7) === '/search';
    return {
        filmsIds: isSearch ? state.searchFilms.ids : state.popularFilms.ids,
        films: isSearch ? state.searchFilms.searchFilmsById : state.popularFilms.popularFilmsById,
        page: isSearch ? state.searchFilms.page : state.popularFilms.page,
        isSearch,
        genresById: state.genres.genresById,
        favoritesFilmsIds: state.favoritesFilms.ids
    };
};

export default withRouter(connect(mapStateToProps, {
    getPopular,
    toggleFilmToFavorites
})(GridOfFilms));

GridOfFilms.propTypes = {
    getPopular: React.PropTypes.func.isRequired,
    toggleFilmToFavorites: React.PropTypes.func.isRequired,
    filmsIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    films: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
    page: React.PropTypes.number.isRequired,
    genresById: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
    favoritesFilmsIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    isSearch: React.PropTypes.bool.isRequired
};
