import React, {Component, PureComponent} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import isNumber from 'lodash/isNumber';
import getWidth from '../_util/getWidth';
import Icon from '../_icon'

class Input extends (PureComponent || Component) {

    componentDidMount() {
        const {
            autoFocus,
            autoSelect,
            initSelectionStart,
            initSelectionEnd
        } = this.props;

        if (autoFocus) {
            this.input.focus();
        }
        if (autoSelect) {
            this.select(initSelectionStart, initSelectionEnd);
        }
    }

    focus() {
        this.input.focus();
    }

    select(selectioinStart, selectionEnd) {
        if (isNumber(selectioinStart) && isNumber(selectionEnd)) {
            this.input.setSelectionRange(selectioinStart, selectionEnd);
        } else {
            this.input.select();
        }
    }

    handleKeyDown = evt => {
        const {onKeyDown, onPressEnter} = this.props;
        if (onPressEnter && evt.keyCode === 13) {
            onPressEnter(evt);
        }

        if (onKeyDown) onKeyDown(evt);
    };

    render() {
        const {
            prefix,
            className,
            type,
            width,
            disabled,
            icon,
            readOnly
        } = this.props;
        const widthStyle = getWidth(width);
        const isTextarea = type.toLowerCase() === 'textarea';
        const editable = !(disabled || readOnly);

        console.log(icon)

        const wrapClass = classNames(
            {
                [`${prefix}-input-wrapper`]: true,
                [`${prefix}-input-wrapper__not-editable`]: !editable,
                [`${prefix}-textarea-wrapper`]: isTextarea
            },
            className
        );

        // 这些props不应该带入到Input上
        let inputProps = omit(this.props, [
            'className',
            'prefix',
            'addonBefore',
            'addonAfter',
            'onPressEnter',
            'width',
            'autoSelect',
            'initSelectionStart',
            'initSelectionEnd'
        ]);

        //文本
        if (isTextarea) {
            inputProps = omit(inputProps, ['type']);
            return (
                <div className={wrapClass} style={widthStyle}>
          <textarea
              ref={input => {
                  this.input = input;
              }}
              className={`${prefix}-textarea`}
              {...inputProps}
              onKeyDown={this.handleKeyDown}
          />
                </div>
            );
        }

        //带搜索图标
        if (icon == 'yes') {
            console.log('helo icon')
            return (
                <div className={wrapClass} style={widthStyle}>
                    <input
                        ref={input => {
                            this.input = input;
                        }}
                        className={`${prefix}-input`}
                        {...inputProps}
                        onKeyDown={this.handleKeyDown}
                    />
                    <span className={`${prefix}-input-suffix`}>
                        <Icon name={`search`}/>
                    </span>
                </div>
            );
        }

        //正常Input框
        return (
            <div className={wrapClass} style={widthStyle}>
                <input
                    ref={input => {
                        this.input = input;
                    }}
                    className={`${prefix}-input`}
                    {...inputProps}
                    onKeyDown={this.handleKeyDown}
                />
            </div>
        );

    }


}

Input.propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    icon: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    onPressEnter: PropTypes.func,
    onChange: PropTypes.func,
    autoFocus: PropTypes.bool,
    initSelectionStart: PropTypes.number,
    initSelectionEnd: PropTypes.number,
    autoSelect: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Input.defaultProps = {
    disabled: false,
    readOnly: false,
    prefix: 'jd',
    type: 'text',
    autoFocus: false,
    width: '220',
    autoSelect: false
};

export default Input