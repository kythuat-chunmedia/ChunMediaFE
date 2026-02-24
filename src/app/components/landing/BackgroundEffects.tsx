"use client";

import React from "react";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-40 animate-orbFloat -top-[10%] -left-[10%]"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)" }} />
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-40 animate-orbFloat -bottom-[10%] -right-[10%]"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%)", animationDelay: "-7s" }} />
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-40 animate-orbFloat top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%)", animationDelay: "-14s" }} />
      <div className="absolute inset-0 grid-overlay" />
    </div>
  );
}
