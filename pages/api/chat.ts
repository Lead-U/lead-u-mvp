import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { message } = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    res.status(200).json({ result: data.choices?.[0]?.message?.content || 'Keine Antwort erhalten.' });
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
}
