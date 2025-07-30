import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setResponse(data.result);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Lead.U – Klarheit für Führungskräfte</h1>
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={5} style={{ width: '100%' }} />
      <br />
      <button onClick={handleSubmit}>Frage stellen</button>
      <pre>{response}</pre>
    </main>
  );
}
