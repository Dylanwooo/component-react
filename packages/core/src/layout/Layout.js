import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Sider from './Sider';


function generator(props) {
  return (Basic) => {
    return class Adapter extends React.PureComponent{
      static Header;
      static Footer;
      static Content;
      static Sider;
      render() {
        const { prefixCls } = props;
        return <Basic prefixCls={prefixCls} {...this.props}/>;
      }
    };
  };
}

class Basic extends React.PureComponent{
  render() {
    const { prefixCls, className, children } = this.props;
    let hasSider;
    React.Children.forEach(children, (element) => {
      if (element && element.type && element.type.__JD_LAYOUT_SIDER) {
        hasSider = true;
      }
    });
    const divCls = classNames(className, prefixCls, {
      [`${prefixCls}__has-sider`]: hasSider,
    });
    return (
      <div className={divCls}>{children}</div>
    );
  }
}

const basename = 'jd';
const Layout = generator({
  prefixCls: `${basename}-layout`,
})(Basic);

const Header = generator({
  prefixCls: `${basename}-layout__header`,
})(Basic);

const Footer = generator({
  prefixCls: `${basename}-layout__footer`,
})(Basic);

const Content = generator({
  prefixCls: `${basename}-layout__content`,
})(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;

Layout.propTypes = {
    /**
     * [style description]
     * @type {[object]}
     * 指定样式
     */
    style: PropTypes.object,
    /**
     * [className description]
     * @type {[string]}
     * 容器 className
     */
    className: PropTypes.string,

}

export default Layout;

