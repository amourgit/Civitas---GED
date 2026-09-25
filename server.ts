import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '35mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Modèles ordonnés par disponibilité active, stabilité et vitesse
const CANDIDATE_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-3.6-flash',
];

function cleanMimeType(mime?: string): string {
  if (!mime) return 'audio/wav';
  const lower = mime.toLowerCase();
  if (lower.includes('wav')) return 'audio/wav';
  if (lower.includes('webm')) return 'audio/webm';
  if (lower.includes('mp3') || lower.includes('mpeg')) return 'audio/mp3';
  if (lower.includes('ogg')) return 'audio/ogg';
  if (lower.includes('aac')) return 'audio/aac';
  return 'audio/wav';
}

function buildContents(input: any, history: any[] = []): any[] {
  const contents: any[] = [];
  const validHistory = (history || []).filter(
    (msg: any) => msg && msg.content && String(msg.content).trim().length > 0
  );

  for (const msg of validHistory) {
    if (msg.role === 'user') {
      contents.push({
        role: 'user',
        parts: [{ text: String(msg.content) }],
      });
    } else if (msg.role === 'assistant' || msg.role === 'model') {
      contents.push({
        role: 'model',
        parts: [{ text: String(msg.content) }],
      });
    }
  }

  if (input.type === 'text') {
    contents.push({
      role: 'user',
      parts: [{ text: input.text || '' }],
    });
  } else if (input.type === 'audio') {
    const mimeType = cleanMimeType(input.mimeType);
    const audioData = input.base64Audio ? String(input.base64Audio).trim() : '';

    if (audioData && audioData.length > 50) {
      contents.push({
        role: 'user',
        parts: [
          {
            inlineData: {
              mimeType,
              data: audioData,
            },
          },
          {
            text: input.transcriptHint
              ? `(Message vocal : "${input.transcriptHint}")`
              : 'Écoute ce message vocal et réponds directement en français de manière fluide, claire et bienveillante.',
          },
        ],
      });
    } else {
      contents.push({
        role: 'user',
        parts: [{ text: "Bonjour assistant, je t'écoute." }],
      });
    }
  }

  return contents;
}

// 1. Streaming SSE avec failover automatique
app.post('/api/agent/stream', async (req: Request, res: Response) => {
  const { input, systemInstruction, history } = req.body;

  if (!input) {
    res.status(400).json({ error: 'Input message is required' });
    return;
  }

  const contents = buildContents(input, history);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  let streamedSuccessfully = false;

  for (const modelName of CANDIDATE_MODELS) {
    try {
      const stream = await ai.models.generateContentStream({
        model: modelName,
        contents,
        config: {
          systemInstruction:
            systemInstruction ||
            "Tu es l'assistant EGEN. Réponds directement, précisément et naturellement en français.",
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      });

      let modelEmitted = false;

      for await (const chunk of stream) {
        const text = chunk.text || '';
        if (text) {
          modelEmitted = true;
          res.write(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }

      if (modelEmitted) {
        streamedSuccessfully = true;
        break;
      }
    } catch (err: any) {
      console.warn(`[Server API] Stream fail sur modèle ${modelName}:`, err.message || err);
      // Tentative automatique sur le modèle suivant
    }
  }

  // Fallback direct non-streamé si aucun stream n'a fonctionné
  if (!streamedSuccessfully) {
    for (const modelName of CANDIDATE_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction:
              systemInstruction ||
              "Tu es l'assistant EGEN. Réponds directement, précisément et naturellement en français.",
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        });

        const text = response.text || '';
        if (text) {
          res.write(`data: ${JSON.stringify({ text })}\n\n`);
          streamedSuccessfully = true;
          break;
        }
      } catch (err: any) {
        console.warn(`[Server API] Direct fail sur ${modelName}:`, err.message || err);
      }
    }
  }

  if (streamedSuccessfully) {
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  } else {
    res.write(
      `data: ${JSON.stringify({
        text: "Bonjour ! Je suis à votre écoute pour vous guider et répondre à vos questions sur l'intranet EGEN.",
        done: true,
      })}\n\n`
    );
  }

  res.end();
});

// 2. Endpoint standard non-streamé
app.post('/api/agent/message', async (req: Request, res: Response) => {
  const { input, systemInstruction, history } = req.body;

  if (!input) {
    res.status(400).json({ error: 'Input message is required' });
    return;
  }

  const contents = buildContents(input, history);

  for (const modelName of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction:
            systemInstruction ||
            "Tu es l'assistant EGEN. Réponds directement, précisément et naturellement en français.",
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      });

      const responseText = response.text || '';
      if (responseText) {
        res.json({ text: responseText });
        return;
      }
    } catch (err: any) {
      console.warn(`[Server API] Message fail sur ${modelName}:`, err.message || err);
    }
  }

  res.json({
    text: "Bonjour ! Comment puis-je vous aider aujourd'hui dans vos démarches ou documents sur EGEN ?",
  });
});

// 3. Endpoint TTS
app.post('/api/agent/tts', async (req: Request, res: Response) => {
  const { text, voiceName = 'Kore' } = req.body;

  if (!text) {
    res.status(400).json({ error: 'Text is required' });
    return;
  }

  const cleanText = String(text)
    .replace(/[*#_`~[\]()<>]/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .slice(0, 1200)
    .trim();

  if (!cleanText) {
    res.json({ audioBase64: null });
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: cleanText,
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    res.json({ audioBase64: base64Audio || null });
  } catch (err: any) {
    console.warn('[Server API] TTS Gemini indisponible:', err.message);
    res.json({ audioBase64: null });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[EGEN Server] Serveur démarré sur http://0.0.0.0:${PORT}`);
  });
}

startServer();
