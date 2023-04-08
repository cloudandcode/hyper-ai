require('dotenv').config();

// API key for OpenAI.
exports.API_KEY = process.env.API_KEY;

// Action that includes user entered data.
exports.SESSION_USER_DATA = 'SESSION_USER_DATA';

// Action that accumulates user input.
exports.UPDATE_USER_INPUT = 'UPDATE_USER_INPUT';

// Action that indicates user input has been submitted.
exports.SUBMIT_USER_INPUT = 'SUBMIT_USER_INPUT';

// Action that dispatches an AI request.
exports.SEND_AI_REQUEST = 'SEND_AI_REQUEST';
