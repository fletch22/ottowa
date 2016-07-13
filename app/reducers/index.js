import { ACTIONS, actionRollbackToStateId } from '../actions/index.js';

const reducer = (state = {}, action) => {

  switch (action.type) {
    case ACTIONS.types.FOO: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
