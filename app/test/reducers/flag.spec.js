import expect from 'expect';
import flag from '../../reducers/flag';
import * as types from '../../actions/flag';

describe('flag reducer', () => {
  it('should handle initial state', () => {
    expect(
      flag(undefined, {})
    ).toEqual(null);
  });

  it('should handle INIT_FLAG', () => {
    expect(
      flag(undefined, {
        type: types.INIT_FLAG,
        payload: {
          concept: {},
        },
      })
    ).toEqual({
      concept: {},
      type: null,
      value: null,
    });
  });

  it('should handle RESET_FLAG', () => {
    expect(
      flag({
        concept: {},
        type: 'duplicate',
        value: {},
      }, {
        type: types.RESET_FLAG,
        payload: null,
      })
    ).toEqual(null);
  });

  it('should handle EDIT_FLAG_TYPE', () => {
    expect(
      flag(undefined, {
        type: types.EDIT_FLAG_TYPE,
        payload: {
          type: 'missing-relation',
        },
      })
    ).toEqual({
      concept: null,
      type: 'missing-relation',
      value: {},
    });

    expect(
      flag(undefined, {
        type: types.EDIT_FLAG_TYPE,
        payload: {
          type: 'duplicate',
        },
      })
    ).toEqual({
      concept: null,
      type: 'duplicate',
      value: {
        type: 'tnl:same',
      },
    });
  });

  it('should handle EDIT_FLAG_VALUE', () => {
    expect(
      flag(undefined, {
        type: types.EDIT_FLAG_VALUE,
        payload: {
          value: {},
        },
      })
    ).toEqual({
      concept: null,
      type: null,
      value: {},
    });
  });
});
