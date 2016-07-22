import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
import Routes from './Routes';
import { Link } from 'react-router';

class AppStarter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }

  render() {

    let store = applyMiddleware(thunk)(createStore)(reducer, this.state);

    return (
    <Provider store={store}>
      <div className="container">
        <Routes />
      </div>
    </Provider>

    );
  }
}

export default AppStarter;
