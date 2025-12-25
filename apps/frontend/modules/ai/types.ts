export type AIStep = {
  capabilityId: string;
  payload?: Record<string, any>;
};

export type AIPlan = {
  steps: AIStep[];
};
