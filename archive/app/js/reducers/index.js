import { ACTIONS, actionRollbackToStateId } from '../actions/index.js';
import defaultState from '../state/defaultState';

const reducer = (state = defaultState.getInstance(), action) => {

  switch (action.type) {
    case ACTIONS.types.ADD_APP: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
