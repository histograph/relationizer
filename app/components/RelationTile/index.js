import React, { PropTypes } from 'react';

import HashLink from '../HashLink';
import Name from '../Name';

const RelationTile = ({ relation: { concept, type } }) =>
  <div>
    <HashLink hash={concept.id}>
      <Name name={concept.name}/>
    </HashLink>
    <div>
      {type}
    </div>
  </div>;

RelationTile.propTypes = {
  relation: PropTypes.object.isRequired,
};

export default RelationTile;
