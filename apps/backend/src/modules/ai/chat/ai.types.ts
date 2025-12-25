export type CapabilityId = 'openSettingsPage' | 'changeTheme' | 'noop';
// далі додаватимеш:
// | "openProducts"
// | "applyProductsSorting"

export type AICommand = {
  capabilityId: CapabilityId;
  payload?: Record<string, any>;
  reply?: string;
};

export type AIRequest = {
  message: string;
};

export type AIStep = {
  capabilityId: string;
  payload?: Record<string, any>;
};

export type AIPlan = {
  steps: AIStep[];
};

export type AIResponse = AICommand;
