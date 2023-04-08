console.log('LOADING HYPER-AI PLUGIN');

// References:
// https://github.com/daltonmenezes/hyper-init/blob/master/index.js
// https://github.com/vercel/hyperpower/blob/master/index.js
// https://github.com/KeeTraxx/hyper-letters

// Action that includes user entered data.
const SESSION_USER_DATA = 'SESSION_USER_DATA';

// Action that accumulates user input.
const UPDATE_USER_INPUT = 'UPDATE_USER_INPUT';

// Action that indicates user input has been submitted.
const SUBMIT_USER_INPUT = 'SUBMIT_USER_INPUT';

// Action that dispatches an AI request.
const SEND_AI_REQUEST = 'SEND_AI_REQUEST';

// An xterm instance.
let term;

/**
 * Handles app startup event
 *
 * @param {Object} options - The app config options
 * @param {Object} options.config - The app configuration object
 */
exports.onApp = ({ config }) => {
  console.log('HYPER-AI ON APP STARTUP');
  console.log('CONFIG', config);
};

/**
 * Opens dev tools for a window instance.
 *
 * @param {Object} win - The window instance.
 */
exports.onWindow = (win) => {
  win.webContents.openDevTools();
};

/**
 * Middleware that intercepts and processes actions before they reach the reducer.
 *
 * @param {Object} store - The Redux store.
 * @returns {Function} - A function that accepts a `next` function as its parameter which processes the next action in the chain of responsibility.
 */
exports.middleware = (store) => (next) => (action) => {
  const state = store.getState();

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
    term.write('1234');
    clearLine();
  }

  next(action);
};

function clearLine() {
  term.write('\x1b[2K\r');
}

/**
 * Checks if the given input is an AI command.
 *
 * @param {string} input - The user input to check.
 * @returns {boolean} - `true` if the input is an AI command, `false` otherwise.
 */
function isAICommand(input) {
  return input[0] === '#';
}

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

exports.mapTermsState = (state, map) => {
  console.log('MAP TERMS STATE', state, map);
  return map;
};

exports.getTermProps = (uid, parentProps, props) => {
  console.log('GET TERM PROPS', uid, parentProps, props);
  term = props.term;
  return props;
};

exports.decorateTerms = (Terms, { React }) => {
  return class extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.terms = null;
      this.onDecorated = this.onDecorated.bind(this);
    }

    onDecorated(terms) {
      this.terms = terms;
      // Don't forget to propagate it to HOC chain
      if (this.props.onDecorated) this.props.onDecorated(terms);
      console.log('TERMS', terms);
    }

    render() {
      return React.createElement(
        Terms,
        Object.assign({}, this.props, {
          onDecorated: this.onDecorated,
        })
      );
    }
  };
};

exports.decorateTerm = (Term, { React }) => {
  console.log('DECORATE TERM', Term, React);
  return class extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.term = null;
      this.onDecorated = this.onDecorated.bind(this);
    }

    onDecorated(term) {
      this.term = term;
      // Don't forget to propagate it to HOC chain
      if (this.props.onDecorated) this.props.onDecorated(term);
      console.log('TERM', term);
    }

    render() {
      return React.createElement(
        Term,
        Object.assign({}, this.props, {
          onDecorated: this.onDecorated,
        })
      );
    }
  };
};
