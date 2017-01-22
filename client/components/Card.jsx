import React from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { GridList, GridTile } from 'material-ui/GridList';
import { Link, browserHistory } from 'react-router';

const style = {
    paper: {
        height: '540px',
        width: '90%',
        minWidth: '800px',
        margin: '70px auto 0 auto',
        display: 'block',
        position: 'fixed',
        zIndex: 150,
        top: 0,
        left: '60px'
    },
    closeIcon: {
        position: 'absolute',
        right: 0,
        zIndex: 100
    },
    wrapper: {
        height: '350px',
        position: 'relative',
        display: 'block'
    },
    mainPoster: {
        height: '300px',
        width: '200px',
        margin: '25px',
        display: 'inline-block',
        float: 'left',
        backgroundSize: 'contain'
    },
    poster: {
        height: '100%',
        width: '100%'
    },
    star: {
        height: '50px',
        width: '50px',
        position: 'absolute',
        left: '175px',
        top: '275px',
        zIndex: 100
    },
    title: {
        display: 'inline-block'
    },
    genres: {
        display: 'block',
        color: 'gray',
        marginTop: 0
    },
    description: {
        display: 'inline-block',
        marginTop: 0,
        maxWidth: '500px'
    },
    adults: {
        height: '50px',
        width: '50px',
        display: 'block',
        position: 'absolute',
        bottom: '25px',
        left: '245px'
    }
};

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '95%',
        margin: 'auto'
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'hidden'
    },
    titleStyle: {
        color: 'white',
        fontSize: '10px'
    }
};

const Card = ({ film, toggleFilmToFavorites, favoritesFilmsIds, recommendations }) => {
    const matchGenres = (genres) => {
        const setOfGenres = [];
        if (genres && genres.length > 0) {
            genres.forEach((genre) => {
                setOfGenres.push(genre.name);
            });
        }
        return setOfGenres.join(', ');
    };

    const toggleFilmToFavoritesHandler = (e, id) => {
        e.preventDefault();
        toggleFilmToFavorites(id);
    };

    return (
        <Paper style={style.paper} zDepth={5}>
            <IconButton style={style.closeIcon} onClick={() => browserHistory.goBack()}>
                <NavigationClose style={style.closeIcon} color="grey" />
            </IconButton>
            <div style={style.wrapper}>
                <div style={style.mainPoster}>
                    <img style={style.poster} src={`https://image.tmdb.org/t/p/w300/${film.poster_path}`} alt={film.title} />
                    <IconButton style={style.star} onClick={() => toggleFilmToFavorites(film)}>
                        <StarBorder style={style.star} color={favoritesFilmsIds.indexOf(film.id) >= 0 ? 'yellow' : 'white'} />
                    </IconButton>
                </div>
                <h3 style={style.title}>
                    {film.release_date ?
                    `${film.original_title} (${film.release_date.substring(0, 4)})` :
                    film.original_title}
                </h3>
                <p style={style.genres}>{matchGenres(film.genres)}</p>
                <p style={style.description}>{film.overview}</p>
                {film.adult ? <img style={style.adults} src="http://sfera3d.net/upload/18.png" alt="adults only" /> : null }
            </div>
            <div style={styles.root}>
                <GridList style={styles.gridList} cols={1}>
                    {recommendations.map(filmRecommended => (
                        <Link to={`/film/${filmRecommended.id}`} key={filmRecommended.id}>
                            <GridTile
                                title={filmRecommended.original_title}
                                actionIcon={
                                    <IconButton
                                        onClick={e =>
                                            toggleFilmToFavoritesHandler(e, filmRecommended)}
                                    >
                                        <StarBorder color={favoritesFilmsIds.indexOf(filmRecommended.id) >= 0 ? 'yellow' : 'white'} />
                                    </IconButton>}
                                titleStyle={styles.titleStyle}
                                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w300/${filmRecommended.poster_path}`}
                                    alt={filmRecommended.original_title}
                                />
                            </GridTile>
                        </Link>
                    ))}
                </GridList>
            </div>
        </Paper>
    );
};

export default Card;

Card.propTypes = {
    film: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
    toggleFilmToFavorites: React.PropTypes.func.isRequired,
    favoritesFilmsIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    recommendations: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};
