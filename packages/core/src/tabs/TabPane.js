import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class TabPane extends React.PureComponent {
    render() {
        const { active } = this.props;
        const classNames = cx('tab-pane', {
            'tab-pane--active': active
        });

        return (
            <div className={classNames}>
                {
                    active
                        ? this.props.children
                        : null

                }
            </div>
        );
    }
}

TabPane.propTypes = {
    name: PropTypes.string.isRequired
};

export default TabPane;
