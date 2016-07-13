import React from 'react';
import { Link } from 'react-router';


class HomeIndex extends React.Component {
  render() {
    var router = this.context.router;

    return (
      <div className="app">
        <div>
          Foo
        </div>
        <Link to="about">About</Link>
      </div>
    )
  }
}

HomeIndex.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default HomeIndex;