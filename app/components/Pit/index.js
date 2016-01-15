import './index.css';
import React, { PropTypes } from 'react';

import Name from './../Name';
import Type from './../Type';
import Dataset from './../Dataset';

const PitCard = ({ pit }) =>
  <div className="PitCard">
    <div className="PitCard-heading">
      <Name name={pit.name}/>
    </div>
    <div className="PitCard-body">
      <Type type={pit.type}/>
      <Dataset dataset={pit.dataset}/>

      {pit.data ?
        <dl className="PitCard-data">
          {Object.keys(pit.data).map((key) =>
            [
              <dt>{key}</dt>,
              <dd>{pit.data[key]}</dd>,
            ]
          )}
        </dl> : null
      }
    </div>
  </div>;

PitCard.propTypes = {
  pit: PropTypes.object.isRequired,
};

export default PitCard;
