import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY});

export async function normalizeDescription(description) {
    try {
        const response = await anthropic.messages.create({
            model: "claude-sonnet-4-5",
            max_tokens: 200,
            messages: [
                {
                    role: "user",
                    content: `You are cleaning up short facility descriptions for an elevator accessibility app. Rewrite the following description to be clear and grammatically correct, in the same language it's written in. Do NOT add any new information, locations, or details not present in the original. Do NOT change the meaning. Return ONLY valid JSON in this exact format: {"normalized": "..."}\n\nDescription: "${description}"`,
                },
            ],
        });
        const text = response.content[0].text;
        const parsed = JSON.parse(text);
        return parsed.normalized || description;
    } catch (error) {
        console.error("Failed to normalize description:", error);
        return description;
    }
}