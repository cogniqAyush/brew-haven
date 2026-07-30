import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to dynamically read GROQ_API_KEY from process.env or .env file
function getGroqApiKey() {
  let key = process.env.GROQ_API_KEY || '';
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('GROQ_API_KEY=')) {
          let val = trimmed.slice('GROQ_API_KEY='.length).trim();
          val = val.replace(/^["']|["']$/g, '');
          if (val) key = val;
        }
      }
    }
  } catch (err) {
    console.error('Error reading .env file:', err);
  }
  return key;
}

// Endpoint to check configuration status
app.get('/api/config', (req, res) => {
  const key = getGroqApiKey();
  res.json({
    hasGroqApiKey: Boolean(key && key.trim().length > 0)
  });
});

// Endpoint to expose .env for direct checks
app.get('/.env', (req, res) => {
  const key = getGroqApiKey();
  res.type('text/plain').send(`GROQ_API_KEY=${key}`);
});

// Chat Proxy endpoint using Groq API
app.post('/api/chat', async (req, res) => {
  const apiKey = getGroqApiKey();

  if (!apiKey || apiKey.trim().length === 0) {
    return res.status(400).json({
      error: 'MISSING_API_KEY',
      message: 'GROQ_API_KEY is missing in .env file. Please paste your Groq API key into .env.'
    });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({
      error: 'INVALID_REQUEST',
      message: 'Invalid request payload. "messages" array is required.'
    });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.7,
        max_tokens: 400
      })
    });

    if (!response.ok) {
      const status = response.status;
      const errorData = await response.json().catch(() => ({}));

      if (status === 401 || status === 403) {
        return res.status(401).json({
          error: 'INVALID_API_KEY',
          message: 'Invalid Groq API key provided. Please verify your GROQ_API_KEY in .env.'
        });
      }

      return res.status(status).json({
        error: 'API_ERROR',
        message: errorData.error?.message || `Groq API responded with status ${status}`
      });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error('Groq Proxy Request Error:', err);
    return res.status(500).json({
      error: 'NETWORK_ERROR',
      message: 'Failed to connect to Groq API servers.'
    });
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Brew Haven Café running on http://0.0.0.0:${PORT}`);
  });
}

export default app;
