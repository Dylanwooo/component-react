import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import domAlign from 'dom-align';
import contains from 'rc-util/lib/Dom/contains';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import getPlacements from './Placements';
import Mask from '../_mask';
import cx from 'classnames';

function buffer(fn, ms) {
  let timer;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function bufferFn() {
    clear();
    timer = setTimeout(fn, ms);
  }

  bufferFn.clear = clear;

  return bufferFn;
}

class TipInner extends React.PureComponent {
    constructor(props) {
        super(props);
        const { animatedName } = props;
        this.animatedIn = animatedName + 'In';
        this.animatedOut = animatedName + 'Out';
        this.state = {
            animatedOut: '',
            placementCls: 'top',
        }
    }

    componentDidMount() {
        const props = this.props;
        // 绑定窗口resize事件
        // if parent ref not attached .... use document.getElementById
        if ( props.monitorWindowResize ) {
            this._startMonitorWindowResize();
        }
    }

    componentWillReceiveProps (nextProps) { 

        if (!nextProps.visible) {
            this.setState({
                animatedOut: this.animatedOut
            });
        } else {
            if(this.props.visible !== nextProps.visible) {
                this._forceAlign();
                this.setState({
                    animatedOut: '',
                });
            }
        }
    }

    componentDidUpdate() {
        const props = this.props;
        
        if ( props.visible ) {
            
            // 点击页面其他位置 tooltip消失
            if ( !this.clickOutsideHandler ) {
                const currentDocument = window.document;
                this.clickOutsideHandler = addEventListener(currentDocument,
                    'mousedown', this._onDocumentClick);
            }
            
            // 窗口resize后重新计算弹出位置
            if ( props.monitorWindowResize ) {
                this._startMonitorWindowResize();
            } else {
                this._stopMonitorWindowResize();
            }
            
            // 绑定滚动事件
            if ( !this.scrollHandler ){
                let container = props.tooltipRef._container;
                this.scrollHandler = addEventListener(container.parentNode,
                    'scroll', this._forceAlign);
            }   
            return 
        }

        this._stopMonitorWindowResize()
        this._clearOutsideHandler();
        this._clearScrollHander();
    }

    componentWillUnmount() {
        this._clearOutsideHandler();
        this._stopMonitorWindowResize();
        this._clearScrollHander();
    }

    render() {

        const { prefixCls, visible, mask } = this.props;
        const { placementCls } = this.state;
        
        const contentCls = cx(`${prefixCls}__content`, {
            'animated': true,
            [`${this.animatedIn}`]:  visible,
            [`${this.state.animatedOut}`]: true,
            [`${prefixCls}__content--${placementCls}`]: placementCls,
            [`${prefixCls}--hidden`]: !visible
        });
                
        return (
             
                <div>
                    {
                        mask 
                        ? <Mask 
                            className={`${prefixCls}__mask`} 
                            onClick={this._tooltipHidden} /> 
                        : null
                    }
                    <div 
                        className={contentCls}  
                        onAnimationEnd={ this._animatedEnd }
                        ref={(tip)=>{this.tip=tip}}>

                            <div className={`${prefixCls}__arrow ${prefixCls}__arrow--${placementCls}`}>
                            </div>

                            <div className={`${prefixCls}__inner`}>
                                { this._getInnerContent() }
                            </div>

                    </div>
                </div> 
        );
    }

    _startMonitorWindowResize = () => {
        if (!this.resizeHandler) {
            this.bufferMonitor = buffer(this._forceAlign, this.props.monitorBufferTime);
            this.resizeHandler = addEventListener(window, 'resize', this.bufferMonitor);
        }
    }

    _stopMonitorWindowResize = () => {
        if (this.resizeHandler) {
            this.bufferMonitor.clear();
            this.resizeHandler.remove();
            this.resizeHandler = null;
        }
    }

    _onDocumentClick = (event) => {
        const { mask, tooltipDom } = this.props
        if ( mask ) {
            return;
        }
        const target = event.target;
        const root = tooltipDom;
        const popupNode = findDOMNode(this.tip);
        if (!contains(root, target) && !contains(popupNode, target)) {
            this._tooltipHidden();
        }
    }

    _clearOutsideHandler = () => {
        if (this.clickOutsideHandler) {
            this.clickOutsideHandler.remove();
            this.clickOutsideHandler = null;
        }
    }

    _clearScrollHander = () => {
        if (this.scrollHandler) {
            this.scrollHandler.remove();
            this.scrollHandler = null;
        }
    }

    _domAlignPlace = () => {
        const { placement } = this.props;
        const placements = this._getPlacements();
        const keys = Object.keys(placements);
        return !!~keys.indexOf(placement) 
            ? placements[placement] 
            : placements['top'] 
    }

    _getPlacements() {
        const { builtinPlacements } = this.props;
        return builtinPlacements || getPlacements();
    }

    _getInnerContent = () => {
        const { title, overlay } = this.props;
        if (overlay) {
            return typeof overlay === 'function' ? overlay() : overlay;
        } else {
            return title;
        }
    }

    _getPopupClassNameFromAlign = () => {
        const placements = this._getPlacements();
        const source = findDOMNode(this.tip);

        const align = domAlign(source, this.props.tooltipDom, this._domAlignPlace());

        const points = align.points;
        for (const placement in placements) {
            
            if (placements.hasOwnProperty(placement)) {
                
                if (this._isPointsEq(placements[placement].points, points)) {
                    
                    this._setTransformOrigin(placement, align);
                    return placement;
                }
            }
        }
    }

    _forceAlign = () => {
        const placementCls = this._getPopupClassNameFromAlign();
        this.setState({
            placementCls: placementCls
        });
    }

    _setTransformOrigin = (placement, align) => {
        // 根据当前坐标设置动画点
        const domNode = findDOMNode(this.tip);
        const rect = domNode.getBoundingClientRect();
        const transformOrigin = {
            top: '50%',
            left: '50%',
        };
        if (placement.indexOf('top') >= 0 || placement.indexOf('Bottom') >= 0) {

            transformOrigin.top = `${rect.height - align.offset[1]}px`;

        } else if (placement.indexOf('Top') >= 0 || placement.indexOf('bottom') >= 0) {

            transformOrigin.top = `${-align.offset[1]}px`;
        }

        if (placement.indexOf('left') >= 0 || placement.indexOf('Right') >= 0) {

            transformOrigin.left = `${rect.width - align.offset[0]}px`;

        } else if (placement.indexOf('right') >= 0 || placement.indexOf('Left') >= 0) {

            transformOrigin.left = `${-align.offset[0]}px`;
        }

        domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
    }
    
    _isPointsEq(a1, a2) {
        return a1[0] === a2[0] && a1[1] === a2[1];
    }

    _animatedEnd = (e) => {
        if (e.target.className.indexOf(this.animatedOut) > -1){
            const { onClose } = this.props;
            const domNode = findDOMNode(this.tip);

            this.setState({
                animatedOut: ''
            });
            
            domNode.style.left = '';
            domNode.style.top = '';


            onClose && onClose();
        }
    }

    _tooltipHidden = () => {
        this.setState({
            animatedOut: this.animatedOut
        });
    }
}


TipInner.defaultProps = {
    animatedName: 'zoom',
    monitorBufferTime: 50,
    monitorWindowResize: true,    
}

TipInner.propTypes = {
   /**
    * 固定类名
    */
    prefixCls: PropTypes.string.isRequired, 
    /**
    * 提示文字
    */
    title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), 
    /**
    * 复杂的提示内容
    */
    overlay: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]), 
    /**
    * 提示样式
    */
    style: PropTypes.object,
    /**
    * 控制显隐
    */
    visible: PropTypes.bool,
    /**
     * 关闭的回调函数
     */
    onClose: PropTypes.func,
    /**
    * 动画名称
    */ 
    animatedName: PropTypes.string
}



export default TipInner;
