import React, { PropTypes } from 'react';

import ConceptTile from '../../ConceptTile';

const ConfirmStep = React.createClass({
  propTypes: {
    flag: PropTypes.object.isRequired,
  },

  render() {
    const { flag } = this.props;

    return (
      <div>
        <ConceptTile concept={flag.concept}/>
        {flag.type} ({flag.value.type})
        <ConceptTile concept={flag.value.concept}/>
      </div>
    );
  },
});

export default ConfirmStep;
