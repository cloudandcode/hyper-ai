"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAICommand = void 0;
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
