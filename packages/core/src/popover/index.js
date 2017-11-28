import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip/Tooltip';
import { cloneElement } from 'react';

class Popover extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        }
    }

    componentDidMount () {
        const newChildProps = this._handleTrigger();
        this.newChildProps = newChildProps;
        this.setState({
            visible: false
        })
    }

    render() {
        const { children, content, placement, getContainer } = this.props;
        const newChildProps = this.newChildProps;
        return (
            <Tooltip 
              prefixCls="jd-popover"
              overlay={ content }
              visible={ this.state.visible }
              placement={ placement }
              onClose={ this._hidePopover } 
              getContainer={ getContainer }>
                { cloneElement(children, newChildProps) }
            </Tooltip>
        );
    }

    _handleTrigger = () => {
        const { trigger } = this.props;
        const newChildProps = {};
 
        if ( trigger === 'click' ) {
            newChildProps.onClick = this._showPopover;

        } else if ( trigger === 'hover' ) {
            newChildProps.onMouseEnter = this._showPopover;
            newChildProps.onMouseOut = this._hidePopover;
        }
        return newChildProps;
    }

    _showPopover = (event) => {
    
        this.setState({
            visible: true
        })
    }

    _hidePopover = (event) => {
        this.setState({
            visible: false
        })
    }


}

Popover.defaultProps = {
    trigger: 'click',
}

Popover.propTypes = {
    /**
     * [content description]
     * @type {[string, element]}
     * 弹出内容
     */
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    /**
    * [content description]
    * @type {[string]}
    * 弹出框位置，位置可选， 默认top
    * top left right bottom topLeft topRight bottomLeft 
    * bottomRight leftTop leftBottom rightTop rightBottom
    */
    placement: PropTypes.string,
    /**
    * [trigger description]
    * @type {[string]}
    * 触发方式，click和hover，默认click
    */
    trigger: PropTypes.string,
    /**
    * [getContainer description]
    * @type {[function]}
    * 浮层渲染父节点，默认渲染到 body 上
    */ 
    getContainer: PropTypes.func,
};

export default Popover;
