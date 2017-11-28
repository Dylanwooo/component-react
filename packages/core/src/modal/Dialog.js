import React  from 'react';
import PropTypes from 'prop-types';

import Icon from '../_icon';

class Dialog extends React.PureComponent{

    constructor(props){
        super(props);
    }

    render(){  
        const { style, renderFooter } = this.props;   
        return (
            <div className="jd-dialog" style={style}>
                <div className="jd-content">
                    { this._getheader() }

                    <div className="jd-content__body">
                       {this.props.children}
                    </div>

                    { renderFooter ? renderFooter(): null}
                </div>
            </div>
        )
    }   

    _getheader = () => {
        const { title } = this.props;
        let header;
        header = (
            <div className="jd-content__header">
                 { this._getCloser() }
                <div className="jd-content__title">
                    {title}
                </div>
            </div>
        );
        return header;
    }

    _getCloser = () => {
        const { closable, onClose } = this.props;
        let closer;
        if (closable) {
            closer = (
                <a className="jd-content__close" onClick={onClose}>
                    <Icon name="close" />
                </a>
            );
        }
        return closer; 
    }
}

Dialog.propTypes = {
     /**
    * 是否显示右上角的关闭按钮
    */ 
    closable: PropTypes.bool,
     /**
    * 关闭模态框
    */ 
    onClose: PropTypes.func,    

    /**
    * 底部内容
    */ 
    renderFooter: PropTypes.func,

};

export default Dialog;