"use client";

import LiquidEther from "@/components/effects/LiquidEther";
import Prism from "@/components/Prism";

export default function AdminBackground() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none
        fixed inset-0
        -z-0
        overflow-hidden
      "
    >
      {/* <Prism
        animationType="rotate"
        timeScale={0.5}
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0}
        colorFrequency={1}
        noise={0}
        glow={1}
      /> */}
      <LiquidEther
        className="absolute inset-0"
        resolution={0.35} // 🔥 ВАЖЛИВО
        mouseForce={12}
        cursorSize={90}
        autoDemo
        autoSpeed={0.25}
        autoIntensity={1.8}
        colors={["#38BDF8", "#F472B6", "#A855F7"]}
      />
    </div>
  );
}
