import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

function Footer(props) {
  return (<footer className={props.className}>

  </footer>);
}
Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: 'footer',
};
export default Footer;
