import React from 'react';
import '../index.css'
import {Alert, Spin, Switch} from '../../src';

export default class App extends React.Component {

    state = {loading: false};

    toggle = (value) => {
        this.setState({loading: value})
    };
    render() {
        return (
            <div className="content-border">
                <p>loading</p>
                <Spin spinning={this.state.loading}>
                    <Alert message="alert"
                           description="describtion"
                           type="info"/>
                </Spin>
                <div style={{marginTop: 16}}>
                    loading state: <Switch checked={this.state.loading} onChange={this.toggle}/>
                </div>
            </div>
        )
    }
}