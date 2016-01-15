/*
 * action types
 */

export var INIT_FLAG = 'INIT_FLAG';
export var RESET_FLAG = 'RESET_FLAG';
export var EDIT_FLAG_TYPE = 'EDIT_FLAG_TYPE';
export var EDIT_FLAG_VALUE = 'EDIT_FLAG_VALUE';

/*
 * action creators
 */

export function initFlag(concept) {
  // TODO: add validation
  return { type: INIT_FLAG, payload: { concept } };
}

export function resetFlag() {
  // TODO: add validation
  return { type: RESET_FLAG, payload: null };
}

export function editFlagType(type) {
  // TODO: add validation
  return { type: EDIT_FLAG_TYPE, payload: { type } };
}

export function editFlagValue(value) {
  // TODO: add validation
  return { type: EDIT_FLAG_VALUE, payload: { value } };
}
