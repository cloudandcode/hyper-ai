"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceUI = void 0;
const constants_1 = require("./constants");
/**
 * Reducer for handling changes to the UI state.
 *
 * @param {UIState} state - The previous state of the UI.
 * @param {Action} action - The action that occurred.
 * @returns {UIState} - The updated UI state based on the given action.
 */
const reduceUI = (state, action) => {
    switch (action.type) {
        case constants_1.SUBMIT_USER_INPUT:
            return Object.assign(Object.assign({}, state), { inputLast: action.payload, inputHistory: [
                    ...(state.inputHistory ? [state.inputHistory] : []),
                    action.payload,
                ], inputValue: '' });
        case constants_1.UPDATE_USER_INPUT:
            return Object.assign(Object.assign({}, state), { inputValue: (state.inputValue || '') + action.payload });
        default:
            return state;
    }
};
exports.reduceUI = reduceUI;
