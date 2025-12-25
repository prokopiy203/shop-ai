export type VoiceMessage = {
  key: string;
  priority?: "low" | "normal" | "high";
};

export interface Voice {
  say(message: VoiceMessage): void;
}
