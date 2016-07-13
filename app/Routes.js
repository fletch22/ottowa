import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import HomeIndex from './components/home/HomeIndex';
import About from './components/About';

class Routes extends React.Component {

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={HomeIndex} />
        <Route path="/about" component={About} />
      </Router>
    )
  }
}

export default Routes;