import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { scrollTo } from '../utils';

import Banner from './Banner';


class Home extends React.PureComponent {
  static propTypes = {
    pageData: PropTypes.object,
    utils: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.tweenAnim = {
      y: 30, opacity: 0, type: 'from', ease: 'easeOutQuad',
    };
  }

  scrollToTop = () => {
    scrollTo(0);
  };

  render() {
    return (
      <DocumentTitle title="Jdesign - 一个 React 的动效设计解决方案">
        <div className="home-wrapper">
          <div className="nav-wrapper">
          </div>
          <div className="banner"></div>
          <Banner/>
        </div>
      </DocumentTitle>
    );
  }
}

export default Home;
