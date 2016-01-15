import React from 'react';

import Nav from './../components/Nav';

import './app.css';

const App = React.createClass({
  render() {
    return (
      <div className="App">
        <Nav/>
        {this.props.children}
      </div>
    );
  },
});

export default App;
