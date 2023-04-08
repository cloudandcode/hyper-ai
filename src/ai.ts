import { OpenAI } from 'langchain/llms';
import { PromptTemplate } from 'langchain/prompts';
import { OPEN_API_KEY } from './constants';
import { LLMChain } from 'langchain';

// Constants. Pull these from Hyper config.
const ENGINE = 'text-davinci-003';  

const openai = new OpenAI({
  openAIApiKey: OPEN_API_KEY,
  modelName: ENGINE,
  maxTokens: 10,
  temperature: 0.9,
  topP: 1,
  bestOf: 3,
  n: 3,
  streaming: false,
});

const template = `What is the best terminal command to {input}?`;
const prompt = new PromptTemplate({
  template,
  inputVariables: ['input']
});
const chain = new LLMChain({
  llm: openai,
  prompt,
}); 

export const sendRequest = async (input: string): Promise<any> => { 
  try {
    const response = await chain.call({ input }); 
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};  
 