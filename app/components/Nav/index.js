import React from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';

import api from '../../utils/api';

import Type from '../Type';

import './index.css';

function loadData(props) {
  props.fetchTypes();
  props.fetchDatasets();
}

const Nav = React.createClass({
  componentWillMount() {
    loadData(this.props);
  },

  render() {
    const { datasets, types } = this.props;

    return (
      <div className="Nav">
        <div className="Nav-brand">Transparant Nederland</div>
        <ul className="Nav-menu">
          <li className="Nav-menuItem">
            <IndexLink
              to="/"
              className="Nav-menuItemLink"
              activeClassName="Nav-menuItemLink--active"
            >
              All
            </IndexLink>
            <Link
              to="/flags"
              className="Nav-menuItemLink"
              activeClassName="Nav-menuItemLink--active"
            >
              Flags
            </Link>
          </li>
          <li className="Nav-menuHeading">Types</li>
          {types.map((type) =>
            <li className="Nav-menuItem" key={type}>
              <Link
                to={['/type', type].join('/')}
                className="Nav-menuItemLink"
                activeClassName="Nav-menuItemLink--active"
              >
                <Type type={type}/>
              </Link>
            </li>
          )}
          <li className="Nav-menuHeading">Sources</li>
          {datasets.map((dataset) =>
            <li className="Nav-menuItem" key={dataset.id}>
              <Link
                to={['/dataset', dataset.id].join('/')}
                className="Nav-menuItemLink"
                activeClassName="Nav-menuItemLink--active"
              >
                {dataset.title}
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  },
});

export default connect(
  (state) => ({
    router: state.router,
    types: state.data.types.data,
    datasets: state.data.datasets.data,
  }),
  {
    fetchTypes: api.actions.types,
    fetchDatasets: api.actions.datasets,
  }
)(Nav);
