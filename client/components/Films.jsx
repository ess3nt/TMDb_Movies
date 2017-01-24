import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { Link } from 'react-router';

const styles = {
    root: {
        display: 'block',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: '100%'
    },
    gridList: {
        overflowY: 'auto',
        minWith: '300px'
    }
};

const Films = ({
    filmsIds,
    films,
    genresById,
    toggleFilmToFavorites,
    favoritesFilmsIds,
    imgSize,
    isSearch
}) => {
    const matchGenres = (genres) => {
        const setOfGenres = [];
        if (genres.length > 0) {
            genres.forEach((id) => {
                if (genresById[id] !== undefined) {
                    setOfGenres.push(genresById[id].name);
                }
            });
        }
        return setOfGenres.join(', ');
    };

    const toggleFilmToFavoritesHandler = (e, id) => {
        e.preventDefault();
        toggleFilmToFavorites(id);
    };

    return (<div style={styles.root}>
        <GridList
            cellHeight={imgSize === '500' ? 400 : 280}
            style={styles.gridList}
            cols={imgSize === '500' ? 5 : 6}
        >
            {filmsIds.map(id => (
                <Link to={isSearch ? `/search/film/${id}` : `/film/${id}`} key={id}>
                    <GridTile
                        style={{ width: '100%' }}
                        title={films[id].release_date ?
                            `${films[id].original_title} (${films[id].release_date.substring(0, 4)})` :
                            films[id].original_title
                        }
                        subtitle={matchGenres(films[id].genre_ids)}
                        actionIcon={
                            <IconButton
                                onClick={e => toggleFilmToFavoritesHandler(e, films[id])}
                            >
                                <StarBorder color={favoritesFilmsIds.indexOf(id) >= 0 ? 'yellow' : 'white'} />
                            </IconButton>
                        }
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w${imgSize}/${films[id].poster_path}`}
                            alt={films[id].original_title}
                        />
                    </GridTile>
                </Link>
            ))}
        </GridList>
    </div>);
};

export default Films;

Films.propTypes = {
    filmsIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    films: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
    genresById: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
    toggleFilmToFavorites: React.PropTypes.func.isRequired,
    favoritesFilmsIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    imgSize: React.PropTypes.string.isRequired,
    isSearch: React.PropTypes.bool.isRequired
};
