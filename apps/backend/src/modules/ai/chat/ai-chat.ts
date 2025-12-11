import { Request, Response } from 'express';
import { openRouter } from '@/core/config/openRouter';

export const chatWithGPT = async (req: Request, res: Response) => {
  try {
    const { messages = [] } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages must be an array' });
    }

    const response = await openRouter.chat.completions.create({
      model: process.env.AI_CHAT_MODEL || 'openai/gpt-4o-mini-2024-07-18',
      messages,
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = response.choices?.[0]?.message?.content ?? '';

    return res.json({
      success: true,
      reply,
      usage: response.usage, // 👈 дуже корисно
    });
  } catch (err: any) {
    console.error('CHAT GPT FAILED', err);

    return res.status(500).json({
      success: false,
      reply: '',
      error: err?.message || 'AI chat failed',
    });
  }
};
