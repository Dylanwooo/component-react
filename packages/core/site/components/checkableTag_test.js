/**
 * Created by Dylanwoo on 2017/12/5.
 */

import React, {Component, PureComponent} from 'react';
import {Tag} from '../../src/index';

const { CheckableTag } = Tag;

export default class Checkable_tag extends React.Component {
    constructor(){
        super();
        this.state = {
            checked: false
        };
    }

    handleChange = (checked)=>{
        this.setState({checked});
    };

    render(){
        return(
            <div>
                <CheckableTag checked={this.state.checked} onChange={this.handleChange}>checkableTag</CheckableTag>
            </div>
        )
    }

}