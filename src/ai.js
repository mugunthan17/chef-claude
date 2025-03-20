import { HfInference } from "@huggingface/inference";

const apiKey = process.env.REACT_APP_HF_API_KEY;

if (!apiKey) {
    console.error("Error: API key is undefined. Check your .env file.");
} else {
    console.log("API Key loaded successfully.");
}

const hf = new HfInference(apiKey);

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");

    if (!apiKey) {
        console.error("API key is undefined. Check your .env file.");
        return "Error: API key is undefined. Please configure your .env file.";
    }

    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: "You are a recipe assistant." },
                { role: "user", content: `I have ${ingredientsString}. Please recommend a recipe.` },
            ],
            max_tokens: 500, 
        });

        if (response?.choices?.length > 0) {
            return response.choices[0].message.content;
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        console.error("Error fetching recipe:", error.message);
        return "Error fetching recipe. Please verify the model supports chat completion or check your API token.";
    }
}
