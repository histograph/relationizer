import * as actions from './../actions/flag';

const initialState = {
  concept: null,
  type: null,
  value: null,
};

const defaultValues = {
  'duplicate': {
    type: 'tnl:same',
  },
  'missing-relation': {},
};

function relations(state = null, action) {
  switch (action.type) {
    case actions.INIT_FLAG:
      return Object.assign({}, initialState, {
        concept: action.payload.concept,
      });
    case actions.RESET_FLAG:
      return null;
    case actions.EDIT_FLAG_TYPE:
      return Object.assign({}, initialState, state, {
        type: action.payload.type,
        value: defaultValues[action.payload.type],
      });
    case actions.EDIT_FLAG_VALUE:
      return Object.assign({}, initialState, state, {
        value: action.payload.value,
      });
    default:
      return state;
  }
}

export default relations;
