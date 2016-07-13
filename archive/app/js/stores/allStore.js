import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/index';
import thunk from 'redux-thunk';

class AllStore {

  getStore() {
    return new Promise((resolve, reject) => {
      const promise = Promise.resolve({});

      promise.then((state) => {
        const store = applyMiddleware(thunk)(createStore)(reducer, state);
        resolve(store);
      })
      .catch((error) => {
        reject(error);
      });

      return promise;
    });
  }
}

export default AllStore;

