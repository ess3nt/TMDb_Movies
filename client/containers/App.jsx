import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import GridOfFilms from './GridOfFilms';

import NavigationBar from './NavigationBar';
import { getGenres } from '../actions';

import './App.scss';

injectTapEventPlugin();

class App extends Component {
    componentDidMount() {
        this.props.getGenres();
    }

    render() {
        return (
            <div className="App">
                <NavigationBar />
                <GridOfFilms />
                {this.props.children}
            </div>
        );
    }
}

export default connect(null, { getGenres })(App);
/* eslint-disable */
App.propTypes = {
    getGenres: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
};
/* eslint-enable */
