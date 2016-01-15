import expect from 'expect';

import * as actions from '../../actions/flag';

describe('relations actions', () => {
  it('initFlag should create INIT_FLAG action', () => {
    expect(actions.initFlag({})).toEqual({
      type: actions.INIT_FLAG,
      payload: {
        concept: {},
      },
    });
  });
  it('resetFlag should create RESET_FLAG action', () => {
    expect(actions.resetFlag({})).toEqual({
      type: actions.RESET_FLAG,
      payload: null,
    });
  });
  it('editFlagType should create EDIT_FLAG_TYPE action', () => {
    expect(actions.editFlagType('duplicate')).toEqual({
      type: actions.EDIT_FLAG_TYPE,
      payload: {
        type: 'duplicate',
      },
    });
  });
  it('editFlagValue should create EDIT_FLAG_VALUE action', () => {
    expect(actions.editFlagValue({})).toEqual({
      type: actions.EDIT_FLAG_VALUE,
      payload: {
        value: {},
      },
    });
  });
});
