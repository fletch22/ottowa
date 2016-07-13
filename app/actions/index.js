export const ACTIONS = {
  types: {
    FOO: 'FOO'
  }
};

export const actionFoo = (value) => {
  return {
    type: ACTIONS.types.FOO,
    value: value
  };
};




