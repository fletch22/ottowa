import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';


class HomeIndex extends React.Component {
  render() {
    var router = this.context.router;

    return (
      <div className="app">
        <div>
          <Button bsStyle="success">Primary</Button>
        </div>
        <div>
          <Link to="about">About</Link>
        </div>
        <div>
          <Link to="visualComponents">Visual Components</Link>
        </div>
      </div>
    )
  }
}

HomeIndex.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default HomeIndex;