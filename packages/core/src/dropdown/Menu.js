import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import { cloneElement } from 'react';
import arrayTreeFilter from 'array-tree-filter';
import cx from 'classnames';

import Icon from '../_icon';

export default class Menu extends (PureComponent || Component) {

    static defaultProps = {
        prefix: 'jd'
    };

    static propTypes = {
        iconName: PropTypes.string,
        prefix: PropTypes.string,
        /**
         * [options description]
         * @type {[array]}
         * 级联框可选项数据源
         *      @param {String} value
         *      @param {String} label
         *      @param {array} children
         *      @param {bool} disabled
         *      @param {bool} isLeaf
         */
        options: PropTypes.array,
        /**
         * [activeValue description]
         * @type {[array]}
         * 已经被选中的可选项
         */
        activeValue: PropTypes.array,
        /**
         * [onSelect description]
         * @type {[func]}
         * 选择可选项的后的回调
         */
        onSelect: PropTypes.func,
        /**
         * [menuStyle description]
         * @type {[object]}
         * 级联框菜单样式
         */
        menuStyle: PropTypes.object,
    };


    _getItem = (option, index) => {
        const { prefix,onSelect, activeValue,iconName } = this.props;
        const hasChildren = option.children && option.children.length > 0;

        const cls = cx(`${prefix}-dropdown-menu__item`, {
            "jd-dropdown-menu__item--active": activeValue.indexOf(option.value) > -1,
            "jd-dropdown-menu__item--disabled": option.disabled,
            "jd-dropdown-menu__item--icon": option.iconName,
            "jd-dropdown-menu__item--expand": hasChildren
        });

        let title = '';
        if (option.title) {
            title = option.title;
        }
        else if (typeof option.label === 'string') {
            title = option.label;
        }


        const loadingIcon = option.iconName ? (
            <Icon name={`${option.iconName}`} className={`${prefix}-dropdown__item-icon`} />
        ) : null;

        return (
            <li
                key={option.value}
                className={cls}
                title={title}
                onClick={onSelect.bind(this, option, index)} >
                { option.label }
                { loadingIcon }
            </li>
        )
    }

    _getActiveOptions = (values) => {
        const activeValue = values || this.props.activeValue;
        const options = this.props.options;
        return arrayTreeFilter(options, (o, level) => o.value === activeValue[level]);
    }

    _getShowOptions = () => {
        const { options } = this.props;

        const result = this._getActiveOptions()
            .map(activeOption => activeOption.children)
            .filter(activeOption => !!activeOption);
        result.unshift(options);
        return result;
    }

    render() {
        const { menuStyle,prefix } = this.props;
        return (
            <div className={`${prefix}-dropdown-menus`}>
                { 
                    this._getShowOptions().map((options,index) => {
                        return (
                            <ul className={`${prefix}-dropdown-menu`} key={index} style={menuStyle}>
                                {
                                    options.map((option) => this._getItem(option,index) )
                                }
                            </ul>
                        )
                    }) 
                }
            </div>
        );
    }

}

