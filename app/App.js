import React from 'react';
import NavBar from './NavBar';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <NavBar />
        {this.props.children}
      </div>
    )
  }
}

export default App;