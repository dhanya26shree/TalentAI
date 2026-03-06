export async function callClaude(systemPrompt, userContent) {
  try {
    const res = await fetch('/api/claude/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userContent }],
      }),
    });

    if (!res.ok) {
      console.error("Claude API Error:", res.status, res.statusText);
      throw new Error(`API returned ${res.status}`);
    }

    const data = await res.json();
    const raw = data.content?.map(b => b.text || '').join('') || '';

    // Always clean: raw.replace(/```json|```/g, '').trim()
    return raw.replace(/```json/g, '').replace(/```/g, '').trim();
  } catch (err) {
    console.error("callClaude failed", err);
    throw err;
  }
}
