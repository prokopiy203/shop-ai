import { Voice } from "@/modules/core/voice/types";

export type SettingsCapabilityId = "changeTheme" | "enabledAnimation";

export type EffectContext = {
  preferences: {
    setTheme(theme: "light" | "dark"): void;
    getTheme(): "light" | "dark";
    setAnimationsEnabled(value: boolean): void;
  };
  voice?: Voice;

  mode?: "live" | "test";
};
