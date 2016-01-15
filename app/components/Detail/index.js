import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Name from '../Name';
import Type from '../Type';
import Dataset from '../Dataset';
import RelationTile from '../RelationTile';
import Pit from '../Pit';

import { initFlag } from '../../actions/flag';

import './index.css';

const Detail = React.createClass({
  propTypes: {
    concept: PropTypes.object.isRequired,
    conceptRelations: PropTypes.array.isRequired,
  },

  getInitialState() {
    return {
      showPits: false,
    };
  },

  render() {
    const { concept, conceptRelations } = this.props;
    const { showPits } = this.state;

    return (
      <div className="Detail">
        <div className="Detail-heading">
          <Name name={concept.name}/>
        </div>
        <div className="Detail-subheading">
          <Type type={concept.type}/>
          <Dataset dataset={concept.datasets}/>
        </div>

        <button onClick={this.handleFlag}>Flag</button>

        <button onClick={this.handlePitsToggle}>{showPits ? 'Hide' : 'Show'} pit details</button>

        {showPits ?
          <div>
            {concept.pits.map((pit) =>
              <div key={pit.id}>
                <Pit pit={pit}/>
              </div>
            )}
          </div> : null
        }

        <div className="Detail-header">Relations</div>
        {conceptRelations.length ?
          <ul>
            {conceptRelations.map((relation) =>
              <li key={relation.concept.id}>
                <RelationTile relation={relation} />
              </li>
            )}
          </ul> : null}
      </div>
    );
  },
  handlePitsToggle() {
    this.setState({
      showPits: !this.state.showPits,
    });
  },
  handleFlag() {
    this.props.dispatch(initFlag(this.props.concept));
  },
});

export default connect(
  (state) => (state)
)(Detail);
