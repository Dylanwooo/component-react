import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class TabPane extends (PureComponent || Component) {
    static propTypes = {
        name: PropTypes.string.isRequired,
        style: PropTypes.object
    };

    render() {
        const { active, style } = this.props;
        const classNames = cx('jd-tab-pane', {
            'jd-tab-pane--active': active
        });

        return (
            <div className={classNames}
                 style={style}>
                {
                    active
                        ? this.props.children
                        : null
                }
            </div>
        );
    }
}