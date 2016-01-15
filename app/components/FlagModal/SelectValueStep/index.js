import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Typeahead } from 'react-typeahead';

import TypeaheadList from './../../TypeaheadList';

import api from './../../../utils/api';

const { actions } = api;

const SelectValueStep = React.createClass({
  propTypes: {
    flag: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
  },

  componentWillMount() {
    this.props.dispatch(actions.relationTypes());
  },

  componentWillUnmount() {
    this.props.dispatch(actions.relationTypes.reset());
  },

  getInitialState() {
    return {
      value: this.props.flag.value,
      canEditType: this.props.flag.type !== 'duplicate',
    };
  },

  render() {
    const { flag, options, relationTypes } = this.props;
    const { canEditType } = this.state;

    return (
      <div>
        <label>
          <select
            value={flag.value.type}
            disabled={!canEditType}
            onChange={this.handleTypeChange}
          >
            <option key="">-- select a relation type --</option>
            {relationTypes.map((relationType) =>
              <option key={relationType} value={relationType}>{relationType}</option>
            )}
          </select>
        </label>
        <label>
          <Typeahead
            placeholder="Search for a politician"
            options={options}
            filterOption="name"
            displayOption="name"
            onKeyUp={this.handleKeyUp}
            maxVisible={20}
            customListComponent={TypeaheadList}
            onOptionSelected={this.handleConceptSelect}
          />
        </label>
      </div>
    );
  },
  handleTypeChange(event) {
    const type = event.target.value;

    this.setState({
      value: Object.assign({}, this.state.value, { type }),
    }, this.handleSelect);
  },
  handleConceptSelect(concept) {
    this.setState({
      value: Object.assign({}, this.state.value, { concept }),
    }, this.handleSelect);
  },
  handleSelect() {
    const { value } = this.state;

    if (value.type && value.concept) {
      this.props.onSelect(value);
    }
  },
  handleKeyUp(event) {
    const value = event.target.value.trim();
    const params = {
      q: [value, '*'].join(''),
    };
    if (this.state.value.type === 'tnl:same') {
      params.type = this.props.flag.concept.type;
    }

    if (value) {
      this.props.dispatch(actions.search(params));
    } else {
      this.props.dispatch(actions.search.reset());
    }
  },
});

export default connect(
  (state) => {
    const { concept, conceptRelations } = state.data;

    // Extract relation ids from concept pits and relations
    const relationIds = ((concept.data && concept.data.pits) || [])
      // .concat((conceptRelations.data || []).map((relation) => relation.concept))
      .map((pit) => pit.id);

    return {
      options: state.data.search.data.filter((option) => {
        return relationIds.indexOf(option.id) === -1;
      }),
      relationTypes: state.data.relationTypes.data,
    };
  }
)(SelectValueStep);
