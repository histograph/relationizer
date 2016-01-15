import './index.css';
import React, { PropTypes } from 'react';

const Name = ({ name }) =>
  <span className="Name">
    {name}
  </span>;

Name.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Name;
