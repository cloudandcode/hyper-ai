
const { OpenAI } = require('langchain/llms');
const { PromptTemplate } = require('langchain/prompts');
const { LLMChain } = require('langchain/chains');
const { API_KEY } = require('./constants');

// Constants. Pull these from Hyper config.
const ENGINE = 'text-davinci-003';

const openai = new OpenAI({
  openAIApiKey: API_KEY,
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
  prompt
});

exports.sendRequest = (input) => {
  chain
    .call({ input })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
