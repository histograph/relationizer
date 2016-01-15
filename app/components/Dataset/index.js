import './index.css';
import React, { PropTypes } from 'react';

const Dataset = (props) => {
  const dataset = [].concat([props.dataset]);

  return (
    <span className="Dataset">
      {dataset.join(', ')}
    </span>
  );
};

Dataset.propTypes = {
  dataset: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

export default Dataset;
