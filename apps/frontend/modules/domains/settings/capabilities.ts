import { Capability } from "../../core/types";
import { settingsEffects } from "./effects";
import { SettingsCapabilityId } from "./ids";

export const settingsCapabilities = {
  enabledAnimation: {
    perform: (payload, ctx) => {
      settingsEffects.toggleAnimations(payload, ctx);
    },
  },

  changeTheme: {
    perform: (payload, ctx) => {
      settingsEffects.changeTheme(payload, ctx);
    },
  },
} as const satisfies Record<
  SettingsCapabilityId,
  Capability<any, SettingsCapabilityId>
>;
