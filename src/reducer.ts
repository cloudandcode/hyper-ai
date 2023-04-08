import { UPDATE_USER_INPUT, SUBMIT_USER_INPUT } from './constants';

/**
 * Reducer for handling changes to the UI state.
 *
 * @param {UIState} state - The previous state of the UI.
 * @param {Action} action - The action that occurred.
 * @returns {UIState} - The updated UI state based on the given action.
 */
export const reduceUI = (state, action) => {
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
