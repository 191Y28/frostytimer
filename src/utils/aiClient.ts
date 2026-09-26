/**
 * Dedicated Groq Ultra-Fast AI Client
 * Uses user-configured API key from local storage or environment variables.
 * No hardcoded secrets.
 */

export function getActiveApiKey(): string {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('frosty_ai_api_key') || localStorage.getItem('frosty_gemini_api_key');
    if (saved && saved.trim()) return saved.trim();
  }
  return (import.meta.env.VITE_GROQ_API_KEY as string) || '';
}

export function setActiveApiKey(key: string): void {
  if (typeof localStorage !== 'undefined') {
    const clean = key.trim();
    localStorage.setItem('frosty_ai_api_key', clean);
    localStorage.setItem('frosty_gemini_api_key', clean);
  }
}

export async function askAI(
  prompt: string,
  systemPrompt: string = 'You are a helpful unblocked games archivist and code expert.'
): Promise<string> {
  const key = getActiveApiKey();

  if (!key) {
    throw new Error('Please configure your Groq API key in the AI settings modal to enable AI features.');
  }

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature: 0.1,
        max_tokens: 800,
      }),
    });

    if (res.ok) {
      const json = await res.json();
      const reply = json.choices?.[0]?.message?.content;
      if (reply) return reply.trim();
    }
  } catch (err) {
    console.warn('Groq primary model attempt failed, trying instant model:', err);
  }

  // Backup fallback: Groq instant 8B model
  try {
    const res2 = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature: 0.1,
        max_tokens: 500,
      }),
    });

    if (res2.ok) {
      const json2 = await res2.json();
      const reply2 = json2.choices?.[0]?.message?.content;
      if (reply2) return reply2.trim();
    }
  } catch (e) {
    console.error('Groq instant fallback error:', e);
  }

  throw new Error('Groq AI inference unavailable');
}
