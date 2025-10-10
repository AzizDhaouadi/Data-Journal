import OpenAI from "openai";
export const prerender = false;


// Set up OpenAI with your API key
const openai = new OpenAI({
    apiKey: import.meta.env.OPENAI_API_KEY
});

export async function POST({ request }: any) {
    try {
        const { prompt } = await request.json();

        const response = await openai.chat.completions.create({
            model: "gpt-5-nano",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt },
            ],
        });

        return new Response(
            JSON.stringify({ text: response.choices[0].message.content }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
