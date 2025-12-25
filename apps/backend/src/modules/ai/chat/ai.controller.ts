import { Request, Response } from 'express';
import { planFromAI } from './planner';
import { AIContextState, loadAIContext } from './ai.context';
import { AIRequest } from './ai.types';

export async function aiController(req: Request<{}, {}, AIRequest>, res: Response) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'Message is required',
      });
    }

    // 1️⃣ load AI context (session / user)
    const context: AIContextState = loadAIContext(req);

    // 2️⃣ AI planner → PLAN
    const plan = await planFromAI(message, context);

    console.log('Backend Res Ai:\n', JSON.stringify(plan, null, 2));
    // 3️⃣ return PLAN (НЕ виконувати)
    return res.json({
      success: true,
      data: plan,
    });
  } catch (err: any) {
    console.error('[AI CONTROLLER ERROR]', err);

    return res.status(500).json({
      error: err.message ?? 'AI error',
    });
  }
}
