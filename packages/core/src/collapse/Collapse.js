import React, {Children} from 'react';
import PropTypes from 'prop-types';
import CollapsePanel from './Panel';
import classNames from 'classnames';


class Collapse extends React.PureComponent {

    constructor(props) {
        super(props);
        const { activeKey, defaultActiveKey } = this.props;
        let currentActiveKey = defaultActiveKey;

        if ('activeKey' in this.props) {
            currentActiveKey = activeKey;
        }

        this.state = {
            activeKey: this._toArray(currentActiveKey),
        };
    }

    componentWillReceiveProps(nextProps) {

        if ('activeKey' in nextProps) {
            this.setState({
                activeKey: this._toArray(nextProps.activeKey),
            });
        }
    }


    render() {
        const { prefixCls, className } = this.props;
        const collapseClassName = classNames({
            [prefixCls]: true,
            [className]: !!className,
        });

        return (
            <div className={collapseClassName}>
                {this._getItems()}
            </div>
        );
    }

    _toArray = (activeKey) => {
        let currentActiveKey = activeKey;
        if (!Array.isArray(currentActiveKey)) {
            currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
        }
        return currentActiveKey;
    }

    _getItems = () => {
        const activeKey = this.state.activeKey;
        const { accordion, style } = this.props;
        const newChildren = [];
        Children.forEach(this.props.children, (child, index) => {

            if (!child) return;

            // If there is no key provide, use the panel order as default key
            const key = child.key || String(index);
            const id = key;
            const { title, disabled } = child.props;
            let active = false;
            if (accordion) {
                active = activeKey[0] === key;
            } else {
                active = activeKey.indexOf(key) > -1;
            }

            const props = {
                key,
                id,
                accordion,
                title,
                active,
                style,
                disabled,
                children: child.props.children,
                _onItemClick: disabled ? null : () => this._onClickItem(key),
            };

            newChildren.push(React.cloneElement(child, props));
        });

        return newChildren;
    }

    _onClickItem(key) {
        let activeKey = this.state.activeKey;
        if (this.props.accordion) {
            activeKey = activeKey[0] === key ? [] : [key];
        } else {
            activeKey = [...activeKey];
            const index = activeKey.indexOf(key);
            const isActive = index > -1;
            if (isActive) {
                // remove active state
                activeKey.splice(index, 1);
            } else {
                activeKey.push(key);
            }
        }
        this._setActiveKey(activeKey);
    }

    _setActiveKey(activeKey) {

        if ( !('activeKey' in this.props) ) {
            this.setState({ activeKey });
        }

        this.props.onChange(this.props.accordion ? activeKey[0] : activeKey);
    }

}

Collapse.defaultProps = {
    prefixCls: 'jd-collapse',
    onChange() {},
    accordion: false
}

Collapse.propTypes = {
    /**
     * [defaultActiveKey description]
     * @type {[array, string]}
     * 初始化选中面板的 key
     */
    defaultActiveKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    /**
     * [activeKey description]
     * @type {[array, string]}
     * 当前激活 tab 面板的 key
     */
    activeKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    /**
     * [onChange description]
     * @type {[function]}
     * 切换面板的回调
     */
    onChange: PropTypes.func,
    /**
     * [style description]
     * @type {[object]}
     * 样式
     */
    style: PropTypes.object,
    /**
     * [className description]
     * @type {[string]}
     * class名
     */
    className: PropTypes.string,
    /**
     * [accordion description]
     * @type {[bool]}
     * 手风琴
     */
    accordion: PropTypes.bool,
};

Collapse.Panel = CollapsePanel;
export const Panel = Collapse.Panel;
export default Collapse;
