import React from 'react';
import { Link } from 'react-router';

const HashLink = ({ hash, children }) =>
  <Link
    to={window.location.pathname}
    hash={'#' + hash}
    state={{ hash }}
  >
    {children}
  </Link>;

HashLink.propTypes = {
  hash: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};

export default HashLink;
