import './index.css';
import React, { PropTypes } from 'react';

import Name from './../Name';
import Type from './../Type';
import Dataset from './../Dataset';

const ConceptTile = ({ concept }) =>
  <div className="ConceptTile">
    <div className="ConceptTile-heading">
      <Name name={concept.name}/>
    </div>
    <div className="ConceptTile-body">
      <Type type={concept.type}/>
      <Dataset dataset={concept.datasets}/>
    </div>
  </div>;

ConceptTile.propTypes = {
  concept: PropTypes.object.isRequired,
};

export default ConceptTile;
