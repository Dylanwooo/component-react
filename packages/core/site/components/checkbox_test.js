import React, {Component, PureComponent} from 'react';
import {Checkbox} from '../../src/index';

export default class App extends React.Component {
    state = {
        checked: false
    };

    handleChange = (e) => {
        this.setState({
            checked: e.target.checked
        })
    };

    render() {
        const { checked } = this.state;
        return (
            <div style={{margin: 20}}>
                <Checkbox checked={checked} onChange={this.handleChange}>Checkbox</Checkbox>
            </div>
        )
    }
}
