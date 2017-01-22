import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Link } from 'react-router';

import Search from './Search';

export default class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lol: true
        };
    }

    render() {
        return (
            <Toolbar className="toolbar">
                <ToolbarGroup>
                    <ToolbarTitle text="Test Task" />
                </ToolbarGroup>
                <ToolbarGroup firstChild={true}>
                    <Search />
                </ToolbarGroup>
                <ToolbarGroup>
                    <FontIcon className="muidocs-icon-custom-sort" />
                    <ToolbarSeparator />
                    <Link to="favorites">
                        <RaisedButton label="Favorites" primary={true} />
                    </Link>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
