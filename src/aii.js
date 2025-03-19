import { HfInference } from "@huggingface/inference";
import "dotenv/config";
// Load the API key from environment variables
const API_KEY = process.env.REACT_APP_HF_API_KEY;

if (!API_KEY) {
  throw new Error("Missing Hugging Face API Key. Set REACT_APP_HF_API_KEY in .env");
}

const client = new HfInference(API_KEY);

const chatCompletion = await client.chatCompletion({
  model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
  messages: [
    {
      role: "user",
      content: "What is the capital of France?"
    }
  ],
  max_tokens: 500
});

console.log(chatCompletion.choices[0].message);
