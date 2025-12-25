import { EffectContext } from "./ids";

export const settingsEffects = {
  toggleAnimations(
    payload: { enabledAnimations?: boolean },
    ctx: EffectContext
  ) {
    const enabled = payload?.enabledAnimations ?? true;
    ctx.preferences.setAnimationsEnabled(enabled);

    ctx.voice?.say({
      key: enabled ? "animations_on" : "animations_off",
    });
  },

  changeTheme(payload: { theme?: "light" | "dark" }, ctx: EffectContext) {
    const current = ctx.preferences.getTheme();
    const nextTheme = payload?.theme ?? (current === "dark" ? "light" : "dark");

    ctx.preferences.setTheme(nextTheme);

    ctx.voice?.say({
      key: "theme_changed",
    });
  },
};
