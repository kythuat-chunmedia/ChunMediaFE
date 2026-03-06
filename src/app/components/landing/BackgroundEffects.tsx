"use client";

import React from "react";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Teal glow orbs — light theme */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 animate-[orbFloat_20s_ease-in-out_infinite] -top-[10%] -left-[10%]"
        style={{ background: "radial-gradient(circle, rgba(10,147,150,0.25), transparent 70%)" }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-25 animate-[orbFloat_20s_ease-in-out_infinite] -bottom-[10%] -right-[10%]"
        style={{ background: "radial-gradient(circle, rgba(148,210,189,0.2), transparent 70%)", animationDelay: "-7s" }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 animate-[orbFloat_20s_ease-in-out_infinite] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(10,147,150,0.15), transparent 70%)", animationDelay: "-14s" }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,147,150,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(10,147,150,0.03) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
    </div>
  );
}