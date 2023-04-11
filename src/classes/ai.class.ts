import { Configuration, OpenAIApi } from 'openai';
import { jsonrepair } from 'jsonrepair';
import { OPEN_AI_KEY, OPEN_AI_MODEL } from '../constants';
import { Response } from '../interfaces';
import { RISK } from '../constants/risk.constant';

export class AI {
  private static configuration = new Configuration({ apiKey: OPEN_AI_KEY });
  private static openai = new OpenAIApi(AI.configuration);

  public static async sendRequest(context: string, input: string): Promise<Response> {
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
      const result: Response = AI.parseResponse(response);
      console.log('RESULT', result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private static getPrompt(context: string, input: string): string {
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

  private static parseResponse(response: string): Response {
    const fixed: string = jsonrepair(response);
    const result: Response = JSON.parse(fixed);
    const command: string = result.command.trim();
    const risk: string = RISK[result.risk];

    result.command = risk && command ? `${risk} ${command}` : command;

    return result;
  }
}