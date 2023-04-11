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
const jsonrepair_1 = require("jsonrepair");
const constants_1 = require("../constants");
const risk_constant_1 = require("../constants/risk.constant");
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
      Request: Given the context, determine the most appropriate, safe and correct terminal command (avoiding echo statements) to perform the desired action
      Context: ${context}.
      Action: ${input}.
      Format: The following fields must be in perfect, valid JSON format with all characters correctly escaped
      {
        "command": A string value. The resulting command.,
        "risk": An integer value. A rating between 0 - 10 that represents a calculation of the potential risk posed to the system as a result of performing the command, where 10 is the highest risk.,
        "comment": A string value. If risk >= 5, this must be an assessment of the risk. If no command is returned, indicate why.,
        "funny": A boolean value. Indicates whether the original action deserves a funny response.,
        "funny_description": A string value. If the original action deserves a funny then this should be a funny response.,
      }
      Response:
    `;
    }
    static parseResponse(response) {
        const fixed = jsonrepair_1.jsonrepair(response);
        const result = JSON.parse(fixed);
        const command = result.command.trim();
        const risk = risk_constant_1.RISK[result.risk];
        result.command = risk && command ? `${risk} ${command}` : command;
        return result;
    }
}
exports.AI = AI;
AI.configuration = new openai_1.Configuration({ apiKey: constants_1.OPEN_AI_KEY });
AI.openai = new openai_1.OpenAIApi(AI.configuration);
