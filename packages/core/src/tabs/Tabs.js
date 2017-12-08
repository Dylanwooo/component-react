import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';


export default class Tabs extends (PureComponent || Component) {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: props.activeKey
        };
    }

    static propTypes = {
        activeKey: PropTypes.number,
        className: PropTypes.string,
        onChange: PropTypes.func,
        onBeforeChange: PropTypes.func,
        style: PropTypes.object,
        type: PropTypes.string
    };

    static defaultProps = {
        activeKey: 0,
        type: 'item'
    };

    render() {

        const classNames = cx('jd-tabs', this.props.className);
        return (
            <div className={classNames}>
                { this._getTabBar() }
                { this._getTabContent() }
            </div>
        );
    }

    _getTabBar() {
        const { style,type } = this.props;

        const items = [];
        React.Children.forEach(this.props.children, (child, idx) => {
            const classNames = cx(this.props.type === 'item'?'jd-tabbar__item':`jd-tabbar__${type}`
                ,idx === this.state.activeKey ? `jd-tabbar__${type}--active`:'' );

            items.push(
                <li
                    className={classNames}
                    style={style}
                    key={idx}
                    onClick={this._onTabClick.bind(this, idx, child.props.name)}>
                    {child.props.name}
                </li>
            );
        });

        return <ul className="jd-tabbar">{items}</ul>;
    }

    _getTabContent() {
        const items = [];
        React.Children.forEach(this.props.children, (child, idx) => {
            items.push(React.cloneElement(child, {
                active: idx == this.state.activeKey,
                key: idx
            }));
        });
        return items;
    }

    _onTabClick(key, name) {
        const { onBeforeChange } = this.props;

        if(onBeforeChange) {
            onBeforeChange({key, name}, this._activateTab);
        } else {
            this._activateTab(key)
        }
    }

    _activateTab = (key) => {
        this.setState({ activeKey: key });
        if (this.props.onChange) this.props.onChange(key);
    }
}
export { default as TabPane } from './TabPane'

