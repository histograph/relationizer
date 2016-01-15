import './index.css';
import React, { PropTypes } from 'react';

import HashLink from './../HashLink';
import ConceptTile from './../ConceptTile';

const ConceptList = ({ concepts }) =>
  <ul className="List">
    {concepts.map((concept) =>
      <li className="List-item" key={concept.id}>
        <HashLink hash={concept.id}>
          <ConceptTile concept={concept}/>
        </HashLink>
      </li>
    )}
  </ul>;

ConceptList.propTypes = {
  concepts: PropTypes.array.isRequired,
};

export default ConceptList;
