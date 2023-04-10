import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

// OpenAI constants
export const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
export const OPEN_AI_MODEL = 'text-davinci-003';  

// Action that includes user entered data.
export const SESSION_USER_DATA = 'SESSION_USER_DATA';
export const SESSION_ADD_DATA = 'SESSION_ADD_DATA';
export const SESSION_ADD = 'SESSION_ADD';

// Action that accumulates user input.
export const UPDATE_USER_INPUT = 'UPDATE_USER_INPUT';

// Action that indicates user input has been submitted.
export const SUBMIT_USER_INPUT = 'SUBMIT_USER_INPUT';

export const TRIGGER_AI_REQUEST = 'TRIGGER_AI_REQUEST';

// Action that dispatches an AI request.
export const SEND_AI_REQUEST = 'SEND_AI_REQUEST';
