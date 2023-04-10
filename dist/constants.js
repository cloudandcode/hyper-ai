"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEND_AI_REQUEST = exports.TRIGGER_AI_REQUEST = exports.SUBMIT_USER_INPUT = exports.UPDATE_USER_INPUT = exports.SESSION_ADD = exports.SESSION_ADD_DATA = exports.SESSION_USER_DATA = exports.OPEN_AI_MODEL = exports.OPEN_AI_KEY = void 0;
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
dotenv.config({
    path: path.resolve(__dirname, '../.env'),
});
// OpenAI constants
exports.OPEN_AI_KEY = process.env.OPEN_AI_KEY;
exports.OPEN_AI_MODEL = 'text-davinci-003';
// Action that includes user entered data.
exports.SESSION_USER_DATA = 'SESSION_USER_DATA';
exports.SESSION_ADD_DATA = 'SESSION_ADD_DATA';
exports.SESSION_ADD = 'SESSION_ADD';
// Action that accumulates user input.
exports.UPDATE_USER_INPUT = 'UPDATE_USER_INPUT';
// Action that indicates user input has been submitted.
exports.SUBMIT_USER_INPUT = 'SUBMIT_USER_INPUT';
exports.TRIGGER_AI_REQUEST = 'TRIGGER_AI_REQUEST';
// Action that dispatches an AI request.
exports.SEND_AI_REQUEST = 'SEND_AI_REQUEST';
