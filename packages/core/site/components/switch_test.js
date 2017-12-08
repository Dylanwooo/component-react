import React, {Component, PureComponent} from 'react';
import {Switch} from '../../src/index';

export default class App extends React.Component {
    state = {
        checked: true,
        unchecked:false
    }

    handleChange = (checked) => {
        this.setState({checked});
    }

    handleUncheckChange = (unchecked) => {
        this.setState({unchecked});
    }

    render() {
        return (
            <div>
                <Switch checked={this.state.checked} onChange={this.handleChange}/>
                <Switch checked={this.state.unchecked} onChange={this.handleUncheckChange}/>
                <Switch checked={true} disabled={true}/>
                <Switch checked={this.state.checked} size={"small"} onChange={this.handleChange}></Switch>
                <Switch checked={true} disabled={true} size={"small"}></Switch>
            </div>
        )
    }
}
