import React  from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getContainer } from '../_util/common';
import cx from 'classnames';
import Dialog from './Dialog';

import Mask from '../_mask';

let ins;
let container;
const animatedIn = 'fadeIn';
const animatedOut = 'fadeOut';

class Modal extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            animatedOut: '',
            visible: true,
        }
    }

    getChildContext() {
        return {dragDropManager: Modal.dragDropManager};
    }

    render(){
        const props = this.props;
        const { maskClosable, prefixCls } = props;
        const classNames = cx('jd-modal',{
            "animated": true,
            [`${prefixCls}-modal`]: !!prefixCls,
            [`${animatedIn}`]: true,
            [`${this.state.animatedOut}`]: true,
        });

        const displayStyle = {};
        if (this.state.visible) {
            displayStyle.display = 'block';
        }else{
            displayStyle.display = 'none';
        }
        
        return (

            <div className={classNames} 
                style={displayStyle}
                onAnimationEnd={this._animatedOut}>
                <Mask style={{ backgroundColor: "rgba(55, 55, 55, 0.6)"}}
                    className="jd-modal__mask" />
                <div 
                  className="jd-modal__wrap"
                  onClick={maskClosable ? this._onMaskClick: undefined}
                  >
                    <Dialog 
                        {...props} 
                        onClose={this._close}
                    />
                </div>
            </div>
        )
    }

    _onMaskClick = (e) => {  
        if (e.target === e.currentTarget) {
            this._close();
        }   
    }

    _show = () => {
        this.setState({
            visible: true,
        })
    }

    _close = () => {
        this.setState({
             animatedOut: animatedOut,
        });

        const { onCancel } = this.props;
        onCancel && onCancel();
    } 

    _animatedOut = (e) =>{
        if (e.target.className.indexOf(animatedOut) > -1 ){
            this.setState({
                animatedOut: '',
                visible: false
            })
        }
    } 
}

Modal.show = (properties, callback) => {
    container = getContainer('Modal', properties);
    ReactDOM.render(
        <Modal 
            {...properties} 
            ref={(modal)=>{
                modal&&modal._show();
                ins = modal;
                callback && callback(ins);
            }}/>,
            container
    );
}

Modal.close = () => {
    ins && ins._close();
}

Modal.destroy = () => {
    if (container) {
        const unmounted = ReactDOM.unmountComponentAtNode(container);   
        unmounted && document.body.removeChild(container);
    }
}

Modal.defaultProps = {
    maskClosable: true,
    closable: true,
    style: {
        width: '520px'
    }
}

Modal.childContextTypes = {
  dragDropManager: PropTypes.object
};

Modal.propTypes = {
    /**
    * 标题
    */   
    title: PropTypes.string,
    /**
    * 类名前缀
    */   
    prefixCls: PropTypes.string,
    /**
    * 点击关闭回调
    */   
    onCancel: PropTypes.func, 
    /**
    * 点击蒙层是否允许关闭
    */ 
    maskClosable:  PropTypes.bool,
    /**
    * 是否显示右上角的关闭按钮
    */ 
    closable: PropTypes.bool,
    /**
    * 浮层的样式
    */ 
    style: PropTypes.object,
    /**
    * 底部内容
    */ 
    renderFooter: PropTypes.func,
};



export default Modal;