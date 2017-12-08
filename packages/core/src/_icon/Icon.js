import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Icon extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        className: PropTypes.string,
        style: PropTypes.any
    };

    static defaultProps = {
        className: '',
    };

    render() {
        const baseName = 'jd-icon';
        const {name, className, style} = this.props;
        const classNames = cx(baseName, {
            [`${baseName}-${name}`]: name,
        }, className);

        return <i
            {...this.props}
            className={classNames} style={style}/>
    }
}

