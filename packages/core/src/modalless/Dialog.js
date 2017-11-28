import React  from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import Icon from '../_icon';


let offsetX;
let offsetY;

class Dialog extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            left: '',
            top: ''
        }
    }

    render(){  
        const { prefixCls, style, renderFooter } = this.props;   
        return (
            <Draggable handle={`.${prefixCls}__header`}>
                <div 
                    className={`${prefixCls}__dialog`}
                    style={{...style, ...this.state }} >

                        <div className={`${prefixCls}__content`} >
                            { this._getheader() }

                            <div className={`${prefixCls}__body`}>
                                {this.props.children}
                            </div>

                            { renderFooter ? renderFooter() : null}

                        </div>
                </div>
            </Draggable>
        )
    }

    _getheader = () => {
        const { prefixCls, title, renderHeader } = this.props;
        if (renderHeader) {
            return renderHeader();
        }
        
        let header;
        header = (
            <div className={`${prefixCls}__header`}>
                 { this._getCloser() }
                <div className={`${prefixCls}__title`}>
                    {title}
                </div>
            </div>
        );
        return header;
    }

    _getCloser = () => {
        const { prefixCls, closable, onClose } = this.props;
        let closer;
        if (closable) {
            closer = (
                <a className={`${prefixCls}__close`} onClick={onClose}>
                    <Icon name="close" />
                </a>
            );
        }
        return closer; 
    }
}

Dialog.propTypes = {
    /**
    * 类名前缀
    */ 
    prefixCls: PropTypes.string,
     /**
    * 是否显示右上角的关闭按钮
    */ 
    closable: PropTypes.bool,
     /**
    * 关闭模态框
    */ 
    onClose: PropTypes.func,
    /**
    * 头部内容
    */ 
    renderHeader: PropTypes.func,
    /**
    * 底部内容
    */ 
    renderFooter: PropTypes.func,

};

export default Dialog;