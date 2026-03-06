export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const apiKey = process.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
        console.error("Vercel Error: VITE_GROQ_API_KEY is missing in environment variables.");
        return res.status(500).json({ error: 'API Key not configured on server' });
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();

        // Return the response from Groq
        return res.status(response.status).json(data);
    } catch (error) {
        console.error('Vercel Proxy Error:', error);
        return res.status(500).json({ error: 'Internal Server Error during AI proxy' });
    }
}
