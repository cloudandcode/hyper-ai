import { Store } from 'redux';
import { Terminal } from './classes/terminal.class';

/**
 * Handles app startup event
 *
 * @param {Object} options - The app config options
 * @param {Object} options.config - The app configuration object
 */
export const onApp = (app) => {
  console.log('HYPER-AI ON APP STARTUP');
  console.log('CONFIG', app.config);
};

/**
 * Opens dev tools for a window instance.
 *
 * @param {Object} win - The window instance.
 */
export const onWindow = (win) => {
  win.webContents.openDevTools();
};

export const decorateTerm = (Term, { React }) => {
  return class extends React.Component {
    uid: string;
    terminal: Terminal;
    store: Store;
    shell: string;

    constructor(props, context) {
      super(props, context);
      this._onTerminal = this._onTerminal.bind(this);
      this._onDecorated = this._onDecorated.bind(this);
      console.log('DECORATE TERM PROPS', props);
    }

    _onTerminal(term) {
      if (this.props.onTerminal) this.props.onTerminal(term);
      console.log('TERM TERMINAL', term);
    }

    _onDecorated(term) {
      if (this.props.onDecorated) this.props.onDecorated(term);
      console.log('TERM DECORATED', term);
      this._init(term);
    }

    _init(term) {
      this.store = (window as any).store;
      this.uid = term.props.uid;
      this.shell = this.store.getState().sessions.sessions[this.uid].shell;
      this.terminal = new Terminal(term.term, this.shell);
    }

    render() {
      return React.createElement(Term, Object.assign({}, this.props, {
        onDecorated: this._onDecorated,
        onTerminal: this._onTerminal
      }));
    }
  };
}