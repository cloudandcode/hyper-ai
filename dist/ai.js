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
exports.sendRequest = void 0;
const openai_1 = require("openai");
const constants_1 = require("./constants");
const configuration = new openai_1.Configuration({
    apiKey: constants_1.OPEN_AI_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
const sendRequest = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completion = yield openai.createCompletion({
            model: constants_1.OPEN_AI_MODEL,
            prompt: `
        Request: Given the context, determine the most appropriate, safe and correct terminal command to perform the desired action
        Context: Windows. Git bash.
        Action: ${input.replace('#', '')}
        Format: The following fields must be in perfect, valid JSON format with all strings correctly escaped
        {
          "command": a string containing only the resulting command,
          "risk": a rating between 0 - 10 that represents a calculation of the potential risk posed to the system as a result of performing the command, where 10 is the highest risk
          "success": a boolean value that indicates whether a resulting command was successfully determined
        }
        Response:
      `,
            max_tokens: 500,
            temperature: 0,
            stream: false,
        });
        const response = completion.data.choices[0].text;
        console.log('RESPONSE', response);
        const result = JSON.parse(completion.data.choices[0].text);
        console.log('RESULT', result);
        console.log('COMMAND', result.command);
        return result;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.sendRequest = sendRequest;
