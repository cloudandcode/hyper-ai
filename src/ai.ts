import { Configuration, OpenAIApi } from "openai";
import { OPEN_AI_KEY, OPEN_AI_MODEL } from './constants';

const configuration = new Configuration({
  apiKey: OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export const sendRequest = async (input: string): Promise<any> => { 
  try {
    const completion = await openai.createCompletion({
      model: OPEN_AI_MODEL,
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
  } catch (error) {
    console.log(error);
    throw error; 
  }
};   
  