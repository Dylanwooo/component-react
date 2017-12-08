import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '../_icon';

export default class Button extends (PureComponent || Component) {
    static propTypes = {
        type: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'link','ghost']),
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        style: PropTypes.object,
        icon: PropTypes.string,
        htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
        className: PropTypes.string,
        disabled: PropTypes.bool,
        prefix: PropTypes.string,
        onClick: PropTypes.func
    };

    static defaultProps = {
        prefix: 'jd',
        type: 'default',
        size: 'small',
        htmlType: 'button',
        className: '',
        disabled: false
    };

    render() {
        const {type, size, icon, children, htmlType, style, disabled} = this.props;
        const baseName = 'jd-button';
        const classNames = classnames(baseName, {
            [`${baseName}--${type}`]: type,
            [`${baseName}--${size}`]: size,
            [`${baseName}--disabled`]: disabled,
        });

        const iconNode = icon ? <Icon name={icon}/> : null;

        return (
            <button
                {...(htmlType ? {type: htmlType} : {})}
                style={style}
                className={classNames}
                onClick={this._onClick.bind(this)}
                disabled={disabled}>
                {iconNode} {children}
            </button>
        );
    }

    _onClick(e) {
        if (this.props.onClick)
            this.props.onClick(e);
    }
}
