import React, { PropTypes } from 'react';

const Type = ({ type }) =>
  <span>
    {type
      .replace('tnl:', '') // remove tnl: namespace
      .replace(/([A-Z])/g, ' $1') // convert CamelCase to Camel Case
    }
  </span>;

Type.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Type;
