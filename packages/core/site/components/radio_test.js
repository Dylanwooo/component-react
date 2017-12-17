import React, {Component, PureComponent} from 'react';
import {Radio} from '../../src';

const RadioGroup = Radio.Group;

export default class App extends Component {

    state = {
        value: 'male',
        valuefruit: 'pears'
    }


    onChange = (e) => {
        this.setState({value: e.target.value});
    }

    onChangeCopy = (e) => {
        this.setState({valuefruit: e.target.value});
    }

    render() {
        return (
            <div>
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                    <Radio value="male">男</Radio>
                    <Radio value="female">女</Radio>
                </RadioGroup>
                <br/>

                <RadioGroup value={'male'} disabled>
                    <Radio value="male">男</Radio>
                    <Radio value="female">女</Radio>
                </RadioGroup>
                <br/>

                <RadioGroup onChange={this.onChangeCopy} value={this.state.valuefruit}>
                    <Radio value="apple">苹果</Radio>
                    <Radio value="pears">梨</Radio>
                    <Radio value="cucumber" disabled>黄瓜</Radio>
                </RadioGroup>
            </div>
        )
    }
}