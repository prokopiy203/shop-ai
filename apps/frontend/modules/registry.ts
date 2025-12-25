import { navigationCapabilities } from "./domains/navigation/capabilities";
import { settingsCapabilities } from "./domains/settings/capabilities";

export const registry = {
  ...settingsCapabilities,
  ...navigationCapabilities,
};

export type CapabilityId = keyof typeof registry;
