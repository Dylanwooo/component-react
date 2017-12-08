import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import assign from 'lodash/assign';
import getWidth from '../_util/getWidth';

export default class Checkbox extends (PureComponent || Component) {
    static propTypes = {
        checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        indeterminate: PropTypes.bool, // 多选情况
        onChange: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.object,
        prefix: PropTypes.string,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    };

    static defaultProps = {
        prefix: 'jd',
        className: '',
        style: {},
        onChange() {}
    };

    render() {
        const {
            checked,
            className,
            style,
            prefix,
            disabled,
            readOnly,
            children,
            indeterminate,
            width,
            ...others
        } = this.props;

        const classString = classNames({
            [className]: !!className,
            [`${prefix}-checkbox-wrapper`]: true,
            [`${prefix}-checkbox-checked`]: !!checked,
            [`${prefix}-checkbox-disabled`]: disabled || readOnly,
            [`${prefix}-checkbox-indeterminate`]: indeterminate
        });

        const wrapStyle = assign({}, style,  getWidth(width));

        return (
            <label className={classString} style={wrapStyle}>
        <span className={`${prefix}-checkbox`}>
          <span className={`${prefix}-checkbox-inner`} />
          <input
              {...others}
              type="checkbox"
              checked={checked && !indeterminate}
              disabled={disabled}
              readOnly={readOnly}
              onChange={this.onChange}
          />
        </span>
                {children !== undefined ? <span>{children}</span> : null}
            </label>
        );
    }

    onChange = evt => {
        const props = this.props;

        props.onChange({
            target: {
                ...props,
                type: 'checkbox',
                checked: evt.target.checked
            },

            preventDefault() {
                evt.preventDefault();
            },

            stopPropagation() {
                evt.stopPropagation();
            }
        });
    };
}
