import React, {Component, PureComponent} from 'react';
import {Checkbox} from '../../src/index';

const CheckboxGroup = Checkbox.Group
const ITEMS = ['Item 1', 'Item 2', 'Item 3']

export default class App extends Component {

    state = {
        checkedList: []
    }

    handleCheckedAll = (e) => {
        this.setState({
            checkedList: e.target.checked ? ITEMS.slice() : []
        })
    }

    handleChange(checkedList) {
        this.setState({checkedList})
    }

    render() {
        const {checkedList} = this.state
        const checkedAll = !!checkedList.length && (checkedList.length === ITEMS.length)
        const indeterminate = !!checkedList.length && (checkedList.length !== ITEMS.length)

        return (
            <div>
                <Checkbox
                    checked={checkedAll}
                    indeterminate={indeterminate}
                    onChange={this.handleCheckedAll}
                >全选</Checkbox>

                <hr/>

                <CheckboxGroup
                    value={checkedList}
                    onChange={this.handleChange.bind(this)}
                >
                    {ITEMS.map(item => {
                        return <Checkbox key={item} value={item}>{item}</Checkbox>
                    })}
                </CheckboxGroup>
            </div>
        )
    }
}
