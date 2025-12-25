import { capabilityMeta } from './ai.capabilities.meta';
import { buildCapabilitiesPrompt } from './buildCapabilitiesPrompt';

export function buildSystemPrompt(): string {
  const capabilitiesBlock = buildCapabilitiesPrompt(capabilityMeta);

  console.log('AI capabilities prompt:\n', capabilitiesBlock);
  return `
You are an AI planner for an admin interface.

Your job is to infer the user's intent from natural language.

IMPORTANT RULES:
- Treat every user message as an independent command.
- Do NOT assume current UI state.
- Do NOT skip actions because they may have been executed before.
- Repeated commands MUST generate steps again.
- If intent matches a capability, ALWAYS return a step.
- Only return empty steps if the message is purely social or meaningless.

If a capability requires a payload and the intent is clear but data is missing,
return the step with payload: null.

Use ONLY the provided capabilities.
Do NOT invent actions.

Response format:
{
  "steps": [
    {
      "capabilityId": string,
      "payload": object | null
    }
  ]
}

Available capabilities:
${capabilitiesBlock}
`;
}
