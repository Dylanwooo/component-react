import React  from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getContainer } from '../_util/common';

import Modal from '../modal';
import Button from '../button';

let ins;
const animatedOut = 'fadeOut';

class Confirm extends React.PureComponent{}

function getFooter(props) {
    const { onCancel, onOk, cancelText, okText} = props;
    let footer = (
            <div className="jd-content__footer">
                <Button
                  type="primary"
                  onClick={() => {okClose(onOk)}}
                 >
                    { okText || '确认'}
                </Button>
                <Button onClick={() => { cancelClose(onCancel) }} >
                    { cancelText || '取消'}
                </Button>
            </div>
        );
    return footer;
}

function cancelClose(onCancel)  {
    ins.setState({
        animatedOut: animatedOut,
    });

    onCancel && onCancel();
}

function okClose (onOk) {
    let close = true;
    if (onOk) {
        close = onOk();
        close = close === undefined ? true : !!close;
    }
    close && ins.setState({ animatedOut: animatedOut });
}

Confirm.show = (properties, callback) => {
    let container = getContainer('Confirm', properties);
    ReactDOM.render(
        <Modal
            ref={(modal)=>{
                if(modal) {
                    modal._show();
                    ins = modal;
                    callback && callback(ins);
                }
            }}
            renderFooter={() => {return getFooter(properties)}}
            {...properties} />,
        container
    );
}

Confirm.propTypes = {
    /**
    * 标题
    */
    title: PropTypes.string,
    /**
    * 确认按钮文字
    */
    okText: PropTypes.string,
    /**
    * 取消按钮文字
    */
    cancelText: PropTypes.string,
    /**
    * 点击确认回调
    */
    onOk: PropTypes.func,
    /**
    * 点击取消回调
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
};

export default Confirm;