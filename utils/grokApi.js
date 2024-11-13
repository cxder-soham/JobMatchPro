// utils/grokApi.js
import fetch from 'node-fetch';

const GROK_API_KEY = process.env.GROK_API_KEY;
const GROK_API_URL = 'https://api.grok.ai/v1/compare';

export async function compareResumeWithJobDescription(resumeText, jobDescription) {
    try {
        const response = await fetch(GROK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROK_API_KEY}`,
            },
            body: JSON.stringify({
                resume: resumeText,
                job_description: jobDescription,
            }),
        });

        if (!response.ok) {
            throw new Error(`Grok API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.match_percentage; // Adjust based on Grok's API response structure
    } catch (error) {
        console.error('Error comparing resume with job description:', error);
        throw error;
    }
}
