import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';

import { getSearch } from '../actions';
import { getLastFiveMovies } from '../reducers';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        };
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.handleNewRequest = this.handleNewRequest.bind(this);
    }

    handleUpdateInput(searchText) {
        this.setState({
            searchText
        });
        this.props.getSearch(searchText);
    }

    handleNewRequest() {
        browserHistory.push(`/search?${this.state.searchText}`);
        this.setState({
            searchText: ''
        });
    }
    matchGenres = (genres) => {
        const genresById = this.props.genresById;
        const setOfGenres = [];
        if (genres.length > 0) {
            genres.forEach((id) => {
                if (genresById[id] !== undefined) {
                    setOfGenres.push(genresById[id].name);
                }
            });
        }
        return (
            <p
                style={{
                    color: 'grey',
                    fontSize: '12px',
                    position: 'absolute',
                    right: '10px',
                    top: '-4px'
                }}
            >
                {setOfGenres.join(', ')}
            </p>
        );
    };

    render() {
        const filmsToShowSearch = this.props.show.map(film => ({
            text: film.original_title,
            value: (
                <MenuItem
                    primaryText={film.release_date ?
                        `${film.original_title} (${film.release_date.substring(0, 4)})` :
                        film.original_title
                    }
                    leftIcon={<img
                        className="search_bar_icon"
                        src={film.poster_path ?
                            `https://image.tmdb.org/t/p/w75/${film.poster_path}` :
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Question_mark.svg/120px-Question_mark.svg.png'}
                        alt={film.original_title}
                    />}
                    secondaryText={this.matchGenres(film.genre_ids)}
                />
            )
        }
        ));
        return (
            <AutoComplete
                className="Nav_Bar_Search"
                hintText="Search"
                searchText={this.state.searchText}
                onUpdateInput={this.handleUpdateInput}
                onNewRequest={this.handleNewRequest}
                dataSource={this.state.searchText.length >= 3 ? filmsToShowSearch : []}
                filter={AutoComplete.noFilter}
                disableFocusRipple={false}
                listStyle={{
                    minWidth: '500px'
                }}
            />
        );
    }
}

const mapStateToProps = state => ({
    show: getLastFiveMovies(state),
    genresById: state.genres.genresById
});

export default connect(mapStateToProps, { getSearch })(Search);

Search.propTypes = {
    getSearch: React.PropTypes.func.isRequired,
    show: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    genresById: React.PropTypes.objectOf(React.PropTypes.any).isRequired
};
