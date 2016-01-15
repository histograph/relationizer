import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import api from '../utils/api';

import Detail from '../components/Detail';
import ConceptList from '../components/ConceptList';
import FlagModal from '../components/FlagModal';
import Search from '../components/Search';

import './MainView.css';

function loadConcepts(props, state) {
  const { query } = props;
  const { q } = state;

  const params = Object.assign({}, query, { q });

  props.fetchConcepts(params);
}

function loadConcept(props) {
  props.fetchConcept({
    id: props.hash,
  });
}

const MainView = React.createClass({
  componentWillMount() {
    loadConcepts(this.props, this.state);
    loadConcept(this.props);
  },

  getInitialState() {
    return {
      q: '*',
    };
  },

  componentWillReceiveProps(nextProps) {
    const { concept, query } = nextProps;

    if (!_.isEqual(this.props.query, query)) {
      loadConcepts(nextProps, this.state);
    }

    if ((this.props.concept && this.props.concept.id) !== (concept && concept.id)) {
      if (concept.type === 'tnl:Person') {
        this.props.fetchOrgsFromPerson({ id: concept.id });
      } else {
        this.props.fetchPeopleFromOrg({ id: concept.id });
      }
    }

    if (this.props.hash !== nextProps.hash) {
      loadConcept(nextProps);
    }
  },

  render() {
    const { concepts, concept, conceptRelations, flag } = this.props;

    return (
      <div className="MainView">
        <div className="MainView-list">
          <div className="MainView-listSearch">
            <Search onChangeQuery={this._onSearchChange} />
          </div>
          <ConceptList
            concepts={concepts}
            selected={concept}
          />
        </div>
        <div className="MainView-detail">
          {concept ? <Detail concept={concept} conceptRelations={conceptRelations}/> : null}
        </div>
        {flag ? <FlagModal flag={flag} /> : null}
      </div>
    );
  },

  _onSearchChange(text) {
    const q = text.trim() + '*';
    this.setState({ q }, () => loadConcepts(this.props, this.state));
  },
});

export default connect(
  (state) => {
    const {
      flag,
      router: {
        params: { type, dataset }, location,
      },
      data: { concepts, concept, orgsFromPerson, peopleFromOrg },
    } = state;
    const conceptRelations = (concept.data && concept.data.type) === 'tnl:Person' ? orgsFromPerson : peopleFromOrg;
    const query = {};

    const hash = location.state && location.state.hash;

    if (type) {
      query.type = type;
    }

    if (dataset) {
      query.dataset = dataset;
    }

    return {
      hash,
      query,
      flag,
      concepts: concepts.data,
      concept: concept.data,
      conceptRelations: conceptRelations.data,
    };
  },
  {
    fetchConcepts: api.actions.concepts,
    fetchConcept: api.actions.concept,
    fetchOrgsFromPerson: api.actions.orgsFromPerson,
    fetchPeopleFromOrg: api.actions.peopleFromOrg,
  }
)(MainView);
