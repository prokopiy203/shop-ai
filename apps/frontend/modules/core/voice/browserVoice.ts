import { Voice } from "./types";
import { voicePhrases } from "./phrases";
import { isAudioUnlocked } from "./voiceUnlocked";

function random<T>(arr: readonly T[]): T | undefined {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const browserVoice: Voice = {
  say({ key }) {
    if (!isAudioUnlocked()) {
      return;
    }

    const variants = voicePhrases[key];
    if (!variants?.length) return;

    const picked = random(variants);
    if (!picked) return;

    const audio = new Audio(picked);
    audio.volume = 0.9;
    audio.currentTime = 0;
    audio.play();
  },
};
