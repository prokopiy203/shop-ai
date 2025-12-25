import { CapabilityMeta } from './ai.capabilities.meta';

export function buildCapabilitiesPrompt(capabilities: CapabilityMeta[]): string {
  return capabilities
    .map((cap, index) => {
      return `
${index + 1}. "${cap.id}"
Description: ${cap.description}
Payload: ${cap.payloadSchema ? JSON.stringify(cap.payloadSchema) : 'null'}
`;
    })
    .join('\n');
}
