/**
 * Created by Dylanwoo on 2017/12/5.
 */

import React, {Component, PureComponent} from 'react';
import {Tag,Input,Icon,Tooltip} from '../../src/index';
import Checkable_tag from './checkableTag_test';

export default class App extends React.Component{
    constructor(){
        super();
        this.state = {
            tags: ['我不能动！', 'Tag 2', 'Tag 3'],
            inputVisible: false,
            inputValue: '',
        };
    }

    handleClose = (removeTag)=>{
        const tags = this.state.tags.filter(tag=>tag!==removeTag);
        this.setState({tags})
    }

    //input框聚焦
    showInput = ()=>{
        this.setState({ inputVisible:true },()=>{this.input.focus()});
        console.log('click')
    };


    handleInputChange(e){
        this.setState({ inputValue:e.target.value })
    }

    handleInputConfirm=()=>{
        const inputValue = this.state.inputValue;
        let tags = this.state.tags;
        //判断输入内容不重复后插入到tags数组中
        if(inputValue&&tags.indexOf(inputValue)===-1)
            tags = [...tags,inputValue];

        this.setState({
            tags,
            inputValue: '',
            inputVisible: false
        })
    };

    saveInputRef = input => this.input = input;
    render(){
        const { tags, inputVisible, inputValue } = this.state;
        return(
            <div>
                <Checkable_tag />
                <Tag color="pink">pink</Tag>
                <Tag color="red">red</Tag>
                <Tag color="orange">orange</Tag>
                <Tag color="blue">blue</Tag>
                {tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}


                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 100 }}
                        value={inputValue}
                        onChange={this.handleInputChange.bind(this)}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff' }}
                    >
                        <Icon name="plus">Add New Tag</Icon>
                    </Tag>
                )}
            </div>
        )
    }
}