/**
 * Checks if the given input is an AI command.
 *
 * @param {string} input - The user input to check.
 * @returns {boolean} - `true` if the input is an AI command, `false` otherwise.
 */
export const isAICommand = (input: string): boolean => {
  return input[0] === '#';
};
