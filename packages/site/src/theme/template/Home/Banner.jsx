import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import SvgMorphPlugin from 'rc-tween-one/lib/plugin/SvgMorphPlugin';
import { Link } from 'react-router';
import { Icon } from 'antd';

TweenOne.plugins.push(SvgMorphPlugin);

export default class Banner extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'banner',
  };

  render() {
    return (
      <div id="banner" className={`${this.props.className}-wrapper`}>
        <div className={this.props.className}>
          <div className={`${this.props.className}-demo`}>
          </div>
        </div>
      </div>);
  }
}

