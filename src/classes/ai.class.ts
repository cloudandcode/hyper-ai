import { Configuration, OpenAIApi } from "openai";
import { OPEN_AI_KEY, OPEN_AI_MODEL } from '../constants';
import { Command } from '../interfaces';
import { RISK } from '../constants/risk.constant';

export class AI {
  private static configuration = new Configuration({ apiKey: OPEN_AI_KEY });
  private static openai = new OpenAIApi(AI.configuration);

  public static async sendRequest(context: string, input: string): Promise<Command> {
    try {
      console.log('REQUEST', context, input);
      const completion = await AI.openai.createCompletion({
        model: OPEN_AI_MODEL,
        prompt: this.getPrompt(context, input),
        max_tokens: 500,
        temperature: 0,
        stream: false,
      });
      const response = completion.data.choices[0].text;
      const result: Command = AI.parseResponse(response);
      console.log('RESULT', result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private static getPrompt(context: string, input: string): string {
    return `
      Request: Given the context, determine the most appropriate, safe and correct terminal command to perform the desired action
      Context: ${context}.
      Action: ${input}.
      Format: The following fields must be in perfect, valid JSON format with all strings correctly escaped
      {
        "command": a string containing only the resulting command,
        "risk": a rating between 0 - 10 that represents a calculation of the potential risk posed to the system as a result of performing the command, where 10 is the highest risk,
        "risk_description": a string containing a description of the risk posed by the command,
        "success": a boolean value that indicates whether a resulting command was successfully determined
      }
      Response:
    `;
  }

  private static parseResponse(response: string): Command {
    const result: Command =  JSON.parse(response);
    const risk = RISK[result.risk];

    result.command = risk ? `${risk} ${result.command}` : result.command;

    return result;
  }
}