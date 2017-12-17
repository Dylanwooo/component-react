/**
 * Created by Dylanwoo on 2017/12/13.
 */
import React, {Component, PureComponent} from 'react';
import {Dropdown} from '../../src/index'


const Divider = Dropdown.divider;
const options = [{
        iconName: "menu",
        value: 'China',
        label: 'China',
    }, {
        iconName: "check",
        value: 'Brazil',
        label: 'Brazil',
    }, {
        value: 'America',
        label: 'Americsa',
    }];

export default class App extends Component{
    render(){

        return(
            <div>
                <Dropdown
                    options={options}
                    placeholder="请选择"
                >
                </Dropdown>
            </div>
        )
    }
}