import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip/Tooltip';
import { cloneElement } from 'react';
import Button from '../button';
import Icon from '../_icon';
import { GENERAL } from '../_util/text';

export default class Popconfirm extends (PureComponent || Component) {

    state = { visible: false };
    static propTypes = {
        prefix: PropTypes.string,
        title: PropTypes.string.isRequired,
        onCancel: PropTypes.func,
        onOk: PropTypes.func,
        okText: PropTypes.string,
        cancelText: PropTypes.string,
        /**
         * 弹出框位置，位置可选， 默认top
         * top left right bottom topLeft topRight bottomLeft
         * bottomRight leftTop leftBottom rightTop rightBottom
         */
        placement: PropTypes.string,
        animatedName: PropTypes.string,
        getContainer: PropTypes.func,
    };
    static defaultProps = {
        prefix: 'jd'
    };

    _getOverlay = () => {
        const { prefix } = this.props;
        return (
            <div className={`${prefix}-confirm__content`}>
                { this._getMessage() }
                { this._getFooter() }
            </div>
        )
    }

    _getMessage = () => {
        const { title,prefix } = this.props;
        return (
            <div className={`${prefix}-confirm__innerMessage`}>
                <Icon name={'info-circle'} className={`${prefix}-icon-warning-down-O`} />
                <div className={`${prefix}-confirm__msg`}>
                    { title }
                </div>
            </div>
        )
    }

    _getFooter = () => {
        const { okText, cancelText,prefix} = this.props;
        return (
            <div className={`${prefix}-confirm__footer`}>
                <Button
                    size="small"
                    onClick={this._cancelClose}>
                    {cancelText || GENERAL.CANCEL}
                </Button>
                <Button
                    size="small"
                    type="primary"
                    onClick={this._okClose}>
                    {okText || GENERAL.CONFIRM}
                </Button>
            </div>
        )
    }

    _onTooltipClose = () => {
        this.setState({
            visible: false
        });
    }

    _cancelClose = (e) => {
        this.setState({
            visible: false
        });
        const onCancel = this.props.onCancel;
        if (onCancel){
            onCancel();
        }
    }

    _okClose = (e) => {
        const onOk = this.props.onOk;
        let close = true;
        if (onOk) {
            close = onOk();
            close = close === undefined ? true : !!close;
        }
        close && this.setState({ visible: false });
    }

    _showPopconfirm = (event) => {
        event.stopPropagation();
        this.setState({
            visible: true
        })
    }

    render() {
        const { children, getContainer, prefix } = this.props;
        const newChildProps = {};
        newChildProps.onClick = this._showPopconfirm;
        return (
            <Tooltip 
              prefixCls={`${prefix}-popconfirm`}
              overlay={ this._getOverlay() }
              visible={ this.state.visible }
              placement={this.props.placement}
              animatedName={this.props.animatedName}
              onClose={this._onTooltipClose}
              getContainer={getContainer} >
                { cloneElement(children, newChildProps) }
            </Tooltip>
        );
    }
}


