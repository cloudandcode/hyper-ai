"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTerminal = exports.getTerm = exports.getTermProps = void 0;
// The current xterm instance.
let term;
let terminal;
/**
 * Returns the props for a terminal using the given uid, parentProps, and props.
 * The term variable is set to the props.term value.
 * @param {string} uid - The unique identifier for the terminal.
 * @param {Object} parentProps - The props of the terminal's parent component.
 * @param {Object} props - The current props of the terminal.
 * @returns {Object} - The props of the terminal.
 */
const getTermProps = (uid, parentProps, props) => {
    term = props.term;
    return props;
};
exports.getTermProps = getTermProps;
/**
 * Returns the current terminal object.
 * @returns {Object} - The current terminal object.
 */
const getTerm = () => term;
exports.getTerm = getTerm;
const getTerminal = () => terminal;
exports.getTerminal = getTerminal;
