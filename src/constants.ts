import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

// API key for OpenAI.
export const OPEN_API_KEY = process.env.OPEN_API_KEY;

// Action that includes user entered data.
export const SESSION_USER_DATA = 'SESSION_USER_DATA';

// Action that accumulates user input.
export const UPDATE_USER_INPUT = 'UPDATE_USER_INPUT';

// Action that indicates user input has been submitted.
export const SUBMIT_USER_INPUT = 'SUBMIT_USER_INPUT';

// Action that dispatches an AI request.
export const SEND_AI_REQUEST = 'SEND_AI_REQUEST';
