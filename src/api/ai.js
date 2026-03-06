export async function callAI(systemPrompt, userContent, isJson = true) {
    try {
        const body = {
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userContent }
            ],
            temperature: isJson ? 0.1 : 0.7,
        };

        if (isJson) {
            body.response_format = { type: 'json_object' };
        }

        const res = await fetch('/api/groq/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            console.error("Groq API Error:", res.status, res.statusText);
            const errorData = await res.json().catch(() => ({}));
            console.error("Error Detail:", errorData);
            throw new Error(`API returned ${res.status}`);
        }

        const data = await res.json();
        const raw = data.choices[0]?.message?.content || '';

        return raw.trim();
    } catch (err) {
        console.error("callAI failed", err);
        throw err;
    }
}
