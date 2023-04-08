import { getTerminal, isAICommand, clearLine } from './terminal';
import { SESSION_USER_DATA, UPDATE_USER_INPUT, SUBMIT_USER_INPUT, SEND_AI_REQUEST } from './constants';
import { sendRequest } from './ai';

/**
 * Middleware that intercepts and processes actions before they reach the reducer.
 *
 * @param {Object} store - The Redux store.
 * @returns {Function} - A function that accepts a `next` function as its parameter which processes the next action in the chain of responsibility.
 */
export const middleware = (store) => (next) => (action) => {
  const state = store.getState();
  const term = getTerminal();

  /**
   * If the action type is SESSION_USER_DATA, it checks if the input data contains '\r' or '\n'.
   * If the input contains either character, it dispatches a SUBMIT_USER_INPUT action with the input value.
   * If the input matches an AI command, it returns SESSION_USER_DATA with custom data.
   * If the input does not contain either character, it dispatches an UPDATE_USER_INPUT action with the input value.
   */
  if (SESSION_USER_DATA === action.type) {
    const input = action.data;
    if (['\r', '\n'].includes(input)) {
      store.dispatch({ type: SUBMIT_USER_INPUT, payload: state.ui.inputValue });
      if (isAICommand(state.ui.inputValue)) {
        return { type: 'SESSION_USER_DATA', data: 'Custom data' };
      }
    } else {
      store.dispatch({ type: UPDATE_USER_INPUT, payload: input });
    }
  }

  /**
   * If the action type is SUBMIT_USER_INPUT, it checks if the payload matches an AI command.
   * If it does, it dispatches a SEND_AI_REQUEST action with the payload.
   */
  if (SUBMIT_USER_INPUT === action.type) {
    if (isAICommand(action.payload)) {
      store.dispatch({ type: SEND_AI_REQUEST, payload: action.payload });
    }
  }

  /**
   * If the action type is SEND_AI_REQUEST, it logs a message to the console with the payload.
   */
  if (SEND_AI_REQUEST === action.type) {
    console.log('SEND AI REQUEST', action.payload);
    console.log('TERMINAL', term);
    clearLine();
    term.write('> ');
    sendRequest(action.payload);
  }

  next(action);
};
