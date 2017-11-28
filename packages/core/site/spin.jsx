import React from 'react';
import './index.css'
import { Spin } from '../src'
import { Alert } from'../src'
import { Switch } from '../src'

class SpinComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: false
        }
    }
    toggle = (value)=>{
        this.setState({ loading:value })
    }

    render(){
        return(
            <div>
                <p>loading</p>
                <Spin spinning={this.state.loading}>
                    <Alert  message="alert"
                            description="describtion"
                            type="info"/>
                </Spin>
                <div style={{marginTop: 16}}>
                    loading state: <Switch on={this.state.loading} onChange={this.toggle}/>
                </div>
            </div>
        )
    }
}
export default SpinComponent;