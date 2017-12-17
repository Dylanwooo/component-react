import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import { cloneElement } from 'react';
import arrayTreeFilter from 'array-tree-filter';
import Trigger from './Trigger';

import Icon from '../_icon';

const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1,
    },
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1,
    },
  },
  bottomRight: {
    points: ['tr', 'br'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1,
    },
  },
  topRight: {
    points: ['br', 'tr'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1,
    },
  },
};

export default class Dropdown extends (PureComponent || Component) {

    constructor(props) {
        super(props);
        this.cachedOptions = [];
    }
    state = {
        value: this.props.value || this.props.defaultValue || [],
        inputValue: '',
        popupVisible: false,
    };

    static defaultProps = {
        builtinPlacements: BUILT_IN_PLACEMENTS,
        placement: 'bottomLeft',
        prefix: 'jd'
    }

    static propTypes = {
        iconName: PropTypes.string,
        //type: PropTypes.oneOf(['default','nowrap']),
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
         * [defaultValue description]
         * @type {[array]}
         * 默认选中项
         */
        defaultValue: PropTypes.array,
        /**
         * [value description]
         * @type {[array]}
         * 指定选中项
         */
        value: PropTypes.array,
        /**
         * [onChange description]
         * @type {[function]}
         * 选择完成后的回调
         */
        onChange: PropTypes.func,
        /**
         * [style description]
         * @type {[object]}
         * 输入框样式
         */
        style: PropTypes.object,
        /**
         * [menuStyle description]
         * @type {[object]}
         * 下拉框菜单样式
         */
        menuStyle: PropTypes.object,
        /**
         * [placement description]
         * @type {[string]}
         * 浮层预设位置：bottomLeft bottomRight topLeft topRight
         */
        placement: PropTypes.string,
        /**
         * [loadData description]
         * @type {[function]}
         * 用于动态加载选项
         */
        loadData: PropTypes.func,
        /**
         * [placeholder description]
         * @type {[string]}
         * 输入框自定义placeholder
         */
        placeholder: PropTypes.string,
        /**
         * [getContainer description]
         * @type {[function]}
         * 浮层渲染父节点，默认渲染到 body 上
         */
        getContainer: PropTypes.func,
    };

    componentWillReceiveProps(nextProps) {

        this.setState({
            value: nextProps.value || nextProps.defaultValue || []
        });
    }

    _getInput = () => {
        const { placeholder,prefix,type } = this.props;
        //const prefixCls = `${prefix}-dropdown-${type}`;
        const { value, popupVisible, inputValue } = this.state;
        console.log(value);
        const clearIcon = ( value.length > 0) || inputValue ? (
            <Icon
                name="close-O"
                className={`${prefix}-dropdown-picker--clear`}
                onClick={this._clearSelection}
            />
        ) : null;

        const label = this._getLabel();
        const input = (
            <span className={`${prefix}-dropdown-picker`}  style={this.props.style}>
                <span className={`${prefix}-dropdown-picker__label`}>
                    { label }
                </span>
                <input
                    type="text"
                    readOnly={true}
                    className={`${prefix}-dropdown-picker__input`}
                    autoComplete="off"
                    placeholder={ value.length === 0 || !label ? placeholder : ""}
                    onClick={this._onIputClick} />
                { clearIcon }

                <Icon
                    name={ popupVisible ? "arrow-up" : "arrow-down"}
                    className={`${prefix}-dropdown-picker--arrow`} />
            </span>
        )

        return input;
    }

    _handleChange = (value, selectedOptions) => {
        this.setState({ inputValue: '' });

        this._setValue(value, selectedOptions);
    }

    _setValue = (value, selectedOptions = []) => {
        console.log(value)
        if (!('value' in this.props)) {
            this.setState({ value });
        }
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(value, selectedOptions);
        }
    }

    //返回menu选择的内容
    _getLabel = () => {
        const { options } = this.props;
        const value = this.state.value;
        const unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
        const selectedOptions = arrayTreeFilter(options, (o, level) => o.value == unwrappedValue[level]);
        const label = selectedOptions.map(o => o.label);
        return label;
    }

    _onIputClick = () => {
        const prePopupVisible = this.state.popupVisible;
        this.setState({
            popupVisible: !prePopupVisible
        })
    }

    _onTooltipClose = () => {
        this.setState({
            popupVisible: false
        })
    }

    _clearSelection = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const { defaultValue } = this.props;

        if (!this.state.inputValue) {
            const value = defaultValue? defaultValue: []
            this._setValue(defaultValue);
            this.setState({ popupVisible: false });
        } else {
            this.setState({ inputValue: '' });
        }
        // if(!this.state.inputValue) {
        //     this._setValue([]);
        //     this._handlePopupVisibleChange(false)
        // }
        // else {
        //     this.setState({ inputValue: '' })
        // }
    };

    render() {
        const props = this.props;
        let { children, options, placement,iconName } = props;
        const newChildProps = {};
        newChildProps.onClick = this._showdropdown;

        const input = children 
                       ? cloneElement(children, newChildProps)
                       : this._getInput();

        // Dropdown menu should keep previous status until it is fully closed.
        if (!this.state.popupVisible) {
            options = this.cachedOptions;
        } else {
            this.cachedOptions = options;
        }
        return (
                <Trigger
                    {...props}
                    iconName={iconName}
                    options={options}
                    placement={placement}
                    popupVisible={this.state.popupVisible}
                    value={this.state.value}
                    onChange={this._handleChange}
                    onClick={this._onTooltipClose}
                >
                { input }
            </Trigger>
        );
    }
}

