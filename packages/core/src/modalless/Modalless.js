import React  from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getContainer } from '../_util/common';
import Dialog from './Dialog';

let ins;
let container;
const animatedIn = 'fadeIn';
const animatedOut = 'fadeOut';

class Modalless extends React.PureComponent{

    constructor(props){
        super(props);
        this.state={
            animatedOut: '',
            visible: true,
        }
    }

    render(){
        const baseName = 'jd-modalless';
        const props = this.props; 
        const classNames = `modalless animated ${animatedIn} ${this.state.animatedOut}`

        const displayStyle = {};
        if (this.state.visible) {
            displayStyle.display = 'block';
        }else{
            displayStyle.display = 'none';
        }
        
        return (

            <div className={classNames} 
                style={displayStyle}
                onAnimationEnd={this._animatedOut} >

                    <Dialog 
                        {...props} 
                        onClose={this._close}
                    />
           
            </div>
        );
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

Modalless.show = (properties) => {
    container = getContainer('Modalless', properties);
    ins = ReactDOM.render(
        <Modalless 
            {...properties}
            ref={(modalless)=>{modalless&&modalless._show()}} />, container);
    return ins;
}

Modalless.destroy = () => {
    if (container) {
        const unmounted = ReactDOM.unmountComponentAtNode(container);   
        unmounted && document.body.removeChild(container);
    }
}

Modalless.defaultProps = {
    prefixCls: 'modalless',
    maskClosable: true,
    closable: true,
    style: {
    }
}

Modalless.propTypes = {
    /**
    * 标题
    */   
    title: PropTypes.string,
    /**
    * 点击关闭回调
    */   
    onCancel: PropTypes.func, 
    /**
    * 是否显示右上角的关闭按钮
    */ 
    closable: PropTypes.bool,
    /**
    * 浮层的样式
    */ 
    style: PropTypes.object,
    /**
    * 头部内容
    */ 
    renderHeader: PropTypes.func,
    /**
    * 底部内容
    */ 
    renderFooter: PropTypes.func,
};



export default Modalless;