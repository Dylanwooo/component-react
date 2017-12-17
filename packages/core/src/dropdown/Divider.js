/**
 * Created by Dylanwoo on 2017/12/17.
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class Divider extends (PureComponent || Component){

    static propTypes = {
        className: PropTypes.string,
        rootPrefixCls: PropTypes.string,
    };

    render() {
        const { className = '', rootPrefixCls } = this.props;
        return <li className={`${className} ${rootPrefixCls}-item-divider`}/>;
    }
}
