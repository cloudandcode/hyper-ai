const { UPDATE_USER_INPUT, SUBMIT_USER_INPUT } = require('./constants');

/**
 * Reducer for handling changes to the UI state.
 *
 * @param {Object} state - The previous state of the UI.
 * @param {Object} action - The action that occurred.
 * @returns {Object} - The updated UI state based on the given action.
 */
exports.reduceUI = (state, action) => {
  switch (action.type) {
    case SUBMIT_USER_INPUT:
      return {
        ...state,
        inputLast: action.payload,
        inputHistory: [
          ...(state.inputHistory ? [state.inputHistory] : []),
          action.payload,
        ],
        inputValue: '',
      };
    case UPDATE_USER_INPUT:
      return {
        ...state,
        inputValue: (state.inputValue || '') + action.payload,
      };
    default:
      return state;
  }
};