import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import HomeIndex from './components/home/HomeIndex';
import About from './components/About';
import VisualComponents from './components/VisualComponents';

class Routes extends React.Component {

  render() {
    return (
      <Router history={hashHistory}>
        <Route component={App}>
          <Route path="/" component={HomeIndex} />
          <Route path="/about" component={About} />
          <Route path="/visualComponents" component={VisualComponents} />
        </Route>
      </Router>
    )
  }
}

export default Routes;