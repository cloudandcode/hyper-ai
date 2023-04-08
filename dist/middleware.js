"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const terminal_1 = require("./terminal");
const constants_1 = require("./constants");
const ai_1 = require("./ai");
/**
 * Middleware that intercepts and processes actions before they reach the reducer.
 *
 * @param {Object} store - The Redux store.
 * @returns {Function} - A function that accepts a `next` function as its parameter which processes the next action in the chain of responsibility.
 */
const middleware = (store) => (next) => (action) => __awaiter(void 0, void 0, void 0, function* () {
    const state = store.getState();
    const term = terminal_1.getTerminal();
    /**
     * If the action type is SESSION_USER_DATA, it checks if the input data contains '\r' or '\n'.
     * If the input contains either character, it dispatches a SUBMIT_USER_INPUT action with the input value.
     * If the input matches an AI command, it returns SESSION_USER_DATA with custom data.
     * If the input does not contain either character, it dispatches an UPDATE_USER_INPUT action with the input value.
     */
    if (constants_1.SESSION_USER_DATA === action.type) {
        const input = action.data;
        if (['\r', '\n'].includes(input)) {
            store.dispatch({ type: constants_1.SUBMIT_USER_INPUT, payload: state.ui.inputValue });
        }
        else {
            store.dispatch({ type: constants_1.UPDATE_USER_INPUT, payload: input });
        }
    }
    /**
     * If the action type is SUBMIT_USER_INPUT, it checks if the payload matches an AI command.
     * If it does, it dispatches a SEND_AI_REQUEST action with the payload.
     */
    if (constants_1.SUBMIT_USER_INPUT === action.type) {
        if (terminal_1.isAICommand(action.payload)) {
            store.dispatch({ type: constants_1.SEND_AI_REQUEST, payload: action.payload });
        }
    }
    /**
     * If the action type is SEND_AI_REQUEST, it logs a message to the console with the payload.
     */
    if (constants_1.SEND_AI_REQUEST === action.type) {
        console.log('SEND AI REQUEST', action.payload);
        console.log('TERMINAL', term);
        const result = yield ai_1.sendRequest(action.payload);
        term.paste(result.command);
    }
    next(action);
});
exports.middleware = middleware;
