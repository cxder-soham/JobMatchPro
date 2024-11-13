// import { createOpenAI } from "@ai-sdk/openai";
// import { streamText } from "ai";

// export const maxDuration = 30;

// const groq = createOpenAI({
//     baseURL: "https://api.groq.com/openai/v1",
//     apiKey: process.env.GROQ_API_KEY, // Make sure this is set in your .env file
// });

// export async function POST(req) {
//     try {
//         const { resumeText, jobDescription } = await req.json();

//         const prompt = `
//             Compare the following resume with the job description and provide a match percentage.

//             Resume:
//             ${resumeText}

//             Job Description:
//             ${jobDescription}

//             Return only the match percentage as a number, e.g., "Match: 85%".
//         `;

//         const result = await streamText({
//             model: groq("llama3-8b-8192"), // Ensure this model is compatible with Groq
//             messages: [{ role: "system", content: prompt }],
//         });

//         return result.toAIStreamResponse();
//     } catch (error) {
//         console.error("Error comparing resume:", error);
//         return new Response(JSON.stringify({ success: false, error: error.message }), {
//             status: 500,
//         });
//     }
// }
