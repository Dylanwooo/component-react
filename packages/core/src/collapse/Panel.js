import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../_icon';

export default class CollapsePanel extends (PureComponent || Component) {

    constructor(props) {
        super(props);
        this.expandHeight = 0;
    }

    static propTypes = {
        prefix: PropTypes.string,
        /**
         * [id description]
         * @type {[number,string]}
         * 折叠框id
         */
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * [renderHeader description]
         * @type {[string,func]}
         * 折叠框头部
         */
        renderHeader: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        /**
         * [accordion description]
         * @type {[bool]}
         * 手风琴
         */
        accordion: PropTypes.bool,
        /**
         * [active description]
         * @type {[bool]}
         * 折叠框激活
         */
        active: PropTypes.bool,
        /**
         * [style description]
         * @type {[object]}
         * 样式
         */
        style: PropTypes.object,
        /**
         * [prefixStyle description]
         * @type {[object]}
         * 样式
         */
        prefixStyle: PropTypes.object,
        /**
         * [disabled description]
         * @type {[bool]}
         * 折叠框禁用
         */
        disabled: PropTypes.bool,
        /**
         * [children description]
         * @type {[element,string]}
         *
         */
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        /**
         * [onItemClick description]
         * @type {[function]}
         * 点击折叠框回调函数
         */
        _onItemClick: PropTypes.func,
        /**
         * [onClick description]
         * @type {[function]}
         * 点击折叠框回调函数
         */
        onClick: PropTypes.func,
    };

    static defaultProps = {
        prefix: 'jd'
    };

    componentWillReceiveProps(nextProps){

        // 手风琴状态下需要设置动画高度
        if (nextProps.accordion && !nextProps.active && this.props.active) {
            this._animatedHeight()
        }
    }

    _handleClick = (active) => {
        const { onClick, _onItemClick, id } = this.props;
        this._animatedHeight();
        _onItemClick(id);
        onClick && onClick(id, !active);
    }

    // 嵌套情况下自适应高度
    _removeHeight = () => {
        this.content.style={};
    }

    _animatedHeight = () => {
        const height = this.box.offsetHeight;
        this.expandHeight = height;

        this.content.style.height = this.expandHeight + "px";

        if (this.props.active){
            setTimeout(() => {
                this.content.style.height = '0px';
            }, 0);
        }
    }

    render() {
        let { active, renderHeader, children, prefixStyle, style, disabled,prefix } = this.props;
        active = !disabled && active;

        const itemCls = cx(`${prefix}-collapse__item`, {
            "jd-collapse__item--active": active,
            "jd-collapse__item--disabled": disabled,
        });

        const headerCls = cx(`${prefix}-collapse__header`, {
            "jd-collapse__header--disabled": disabled,
        });

        const contentCls = cx(`${prefix}-collapse__content`, {
            "jd-collapse__content--active": active,
            "jd-collapse__content--inactive": !active
        });

        const itemStyle = prefixStyle ? prefixStyle : style;
        return (
            <div className={itemCls} style={itemStyle}>

                <div className={headerCls} onClick={()=>{this._handleClick(active)}}>

                    <Icon
                        className={`${prefix}-collapse__icon`}
                        name={ active ? "arrow-down" : "arrow-right"}
                    />

                    { typeof renderHeader === 'function' ? renderHeader() : renderHeader }
                </div>

                <div
                    className={contentCls}

                    onTransitionEnd={this._removeHeight}

                    ref={(content)=>{this.content=content}}
                >

                    <div className={`${prefix}-collapse__content-box`}  ref={(box)=>{this.box=box}}>
                        { children }
                    </div>

                </div>

            </div>
        );
    }

}


