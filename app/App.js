import React from 'react';
import './stylesheets/scss/base.scss';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
import Routes from './Routes';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }

  render() {

    let store = applyMiddleware(thunk)(createStore)(reducer, this.state);

    return (
    <Provider store={store}>
      <Routes />
    </Provider>

    );
  }
}
