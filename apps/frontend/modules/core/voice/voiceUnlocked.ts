"use client";

let unlocked = false;

export async function unlockAudio() {
  const audio = new Audio("/voice/silence.mp3"); // ⬅ ОБОВʼЯЗКОВО
  audio.volume = 0;
  audio.muted = true;

  try {
    await audio.play();
    audio.pause();
    unlocked = true;
  } catch (e) {
    console.warn("[Voice] unlock failed", e);
  }
}

export function isAudioUnlocked() {
  return unlocked;
}
