import React, { PropTypes } from 'react';

import './index.css';

const Search = React.createClass({
  propTypes: {
    onChangeQuery: PropTypes.func.isRequired,
  },

  render() {
    return (
      <div className="Search">
        <input
          type="search"
          placeholder="Search"
          className="Search-input"
          onChange={(event) => this.props.onChangeQuery(event.target.value)}
        />
      </div>
    );
  },
});

export default Search;
