"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAICommand = exports.clearLine = exports.getTerminal = exports.getTermProps = void 0;
// The current xterm instance.
let term;
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
const getTerminal = () => term;
exports.getTerminal = getTerminal;
const clearLine = () => {
    term.write('\x1b[2K\r');
};
exports.clearLine = clearLine;
/**
 * Checks if the given input is an AI command.
 *
 * @param {string} input - The user input to check.
 * @returns {boolean} - `true` if the input is an AI command, `false` otherwise.
 */
const isAICommand = (input) => {
    return input[0] === '#';
};
exports.isAICommand = isAICommand;
