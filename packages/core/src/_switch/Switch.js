import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Switch extends (PureComponent || Component) {
    static propTypes = {
        size: PropTypes.oneOf(['default', 'small']),
        prefix: PropTypes.string,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        checked: PropTypes.bool,
        onChange: PropTypes.func,
        checkedText: PropTypes.any,
        uncheckedText: PropTypes.any
    };

    static defaultProps = {
        size: 'default',
        prefix: 'jd',
        className: '',
        disabled: false,
        checked: false,
        onChange() {},
        checkedText: '开',
        uncheckedText: '关'
    };

    toggle = () => {
        const {onChange, checked} = this.props;
        onChange(!checked);
    };

    getInnerText() {
        return this.props.checked
            ? this.props.checkedText
            : this.props.uncheckedText;
    }

    render() {
        const {className, size, disabled, prefix, checked} = this.props;

        const classNames = classnames(
            {
                [`${prefix}-switch-${size}`]: size,
                [`${prefix}-switch-disabled`]: disabled,
                [`${prefix}-switch-checked`]: checked
            },
            `${prefix}-switch`,
            className
        );

        return (
            <span className={classNames} onClick={disabled ? null : this.toggle}>
                 <span className={`${prefix}-switch-inner`}>{this.getInnerText()}</span>
              </span>
        );

    }
}
