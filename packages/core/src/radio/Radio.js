import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import assign from 'lodash/assign';
import getWidth from '../_util/getWidth';

export default class Radio extends (PureComponent || Component) {
    static propTypes = {
        checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        value: PropTypes.any,
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,

        // radioGroup进行复写
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
        onChange() {
        }
    };

    handleChange = evt => {
        const props = this.props;

        props.onChange({
            target: {
                ...props,
                type: 'radio',
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

    render() {
        const {
            checked,
            onChange,
            className,
            style,
            prefix,
            disabled,
            readOnly,
            children,
            value,
            width,
            ...others
        } = this.props;

        const classString = classNames({
            [className]: !!className,
            [`${prefix}-radio-wrap`]: true,
            [`${prefix}-radio-checked`]: !!checked,
            [`${prefix}-radio-disabled`]: disabled || readOnly
        });
        const wrapStyle = assign({}, style, getWidth(width));
        return (
            <label className={classString} style={wrapStyle}>
        <span className={`${prefix}-radio`}>
          <span className={`${prefix}-radio-inner`}/>
          <input
              {...others}
              type="radio"
              checked={!!checked}
              disabled={disabled}
              readOnly={readOnly}
              onChange={this.handleChange}
          />
        </span>
                {children !== undefined ? <span>{children}</span> : null}
            </label>
        );
    }
}
