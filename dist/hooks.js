"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorateTerm = exports.onWindow = exports.onApp = void 0;
const terminal_class_1 = require("./classes/terminal.class");
/**
 * Handles app startup event
 *
 * @param {Object} options - The app config options
 * @param {Object} options.config - The app configuration object
 */
const onApp = (app) => {
    console.log('HYPER-AI ON APP STARTUP');
    console.log('CONFIG', app.config);
};
exports.onApp = onApp;
/**
 * Opens dev tools for a window instance.
 *
 * @param {Object} win - The window instance.
 */
const onWindow = (win) => {
    win.webContents.openDevTools();
};
exports.onWindow = onWindow;
const decorateTerm = (Term, { React }) => {
    return class extends React.Component {
        constructor(props, context) {
            super(props, context);
            this._onTerminal = this._onTerminal.bind(this);
            this._onDecorated = this._onDecorated.bind(this);
            console.log('DECORATE TERM PROPS', props);
        }
        _onTerminal(term) {
            if (this.props.onTerminal)
                this.props.onTerminal(term);
            console.log('TERM TERMINAL', term);
        }
        _onDecorated(term) {
            if (this.props.onDecorated)
                this.props.onDecorated(term);
            console.log('TERM DECORATED', term);
            this._init(term);
        }
        _init(term) {
            this.store = window.store;
            this.uid = term.props.uid;
            this.shell = this.store.getState().sessions.sessions[this.uid].shell;
            this.terminal = new terminal_class_1.Terminal(term.term, this.shell);
        }
        render() {
            return React.createElement(Term, Object.assign({}, this.props, {
                onDecorated: this._onDecorated,
                onTerminal: this._onTerminal
            }));
        }
    };
};
exports.decorateTerm = decorateTerm;
