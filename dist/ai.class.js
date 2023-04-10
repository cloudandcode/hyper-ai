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
exports.AI = void 0;
const openai_1 = require("openai");
const constants_1 = require("./constants");
const constants_2 = require("./constants");
class AI {
    static sendRequest(context, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('REQUEST', context, input);
                const completion = yield AI.openai.createCompletion({
                    model: constants_1.OPEN_AI_MODEL,
                    prompt: this.getPrompt(context, input),
                    max_tokens: 500,
                    temperature: 0,
                    stream: false,
                });
                const response = completion.data.choices[0].text;
                const result = AI.parseResponse(response);
                console.log('RESULT', result);
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    static getPrompt(context, input) {
        return `
      Request: Given the context, determine the most appropriate, safe and correct terminal command to perform the desired action
      Context: ${context}.
      Action: ${input}.
      Format: The following fields must be in perfect, valid JSON format with all strings correctly escaped
      {
        "command": a string containing only the resulting command,
        "risk": a rating between 0 - 10 that represents a calculation of the potential risk posed to the system as a result of performing the command, where 10 is the highest risk
        "success": a boolean value that indicates whether a resulting command was successfully determined
      }
      Response:
    `;
    }
    static parseResponse(response) {
        const result = JSON.parse(response);
        const risk = constants_2.RISK[result.risk];
        result.command = risk ? `# ${risk} ${result.command}` : result.command;
        return result;
    }
}
exports.AI = AI;
AI.configuration = new openai_1.Configuration({ apiKey: constants_1.OPEN_AI_KEY });
AI.openai = new openai_1.OpenAIApi(AI.configuration);
