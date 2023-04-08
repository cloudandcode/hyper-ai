import { Terminal } from 'xterm';

// The current xterm instance.
let term: Terminal;

/**
 * Returns the props for a terminal using the given uid, parentProps, and props.
 * The term variable is set to the props.term value.
 * @param {string} uid - The unique identifier for the terminal.
 * @param {Object} parentProps - The props of the terminal's parent component.
 * @param {Object} props - The current props of the terminal.
 * @returns {Object} - The props of the terminal.
 */
export const getTermProps = (uid, parentProps, props) => {
  term = props.term;
  return props;
};

/**
 * Returns the current terminal object.
 * @returns {Object} - The current terminal object.
 */
export const getTerminal = (): Terminal => term;

export const clearLine = (): void => {
  term.write('\x1b[2K\r');
}

/**
 * Checks if the given input is an AI command.
 *
 * @param {string} input - The user input to check.
 * @returns {boolean} - `true` if the input is an AI command, `false` otherwise.
 */
export const isAICommand = (input): boolean => {
  return input[0] === '#';
}
