"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { TemplateLocal } from "@/app/types";

interface DevicePreset {
  key: string;
  label: string;
  shortLabel: string;
  width: number;
  height: number;
  icon: React.ReactNode;
}

const DEVICES: DevicePreset[] = [
  {
    key: "desktop",
    label: "Desktop — 1440×900",
    shortLabel: "Desktop",
    width: 1440,
    height: 900,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    key: "laptop",
    label: "Laptop — 1280×800",
    shortLabel: "Laptop",
    width: 1280,
    height: 800,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
      </svg>
    ),
  },
  {
    key: "tablet",
    label: "Tablet — 768×1024",
    shortLabel: "Tablet",
    width: 768,
    height: 1024,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18" />
      </svg>
    ),
  },
  {
    key: "mobile",
    label: "Mobile — 375×812",
    shortLabel: "Mobile",
    width: 375,
    height: 812,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18" />
      </svg>
    ),
  },
  {
    key: "mobileSE",
    label: "Mobile SE — 320×568",
    shortLabel: "SE",
    width: 320,
    height: 568,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="3" width="12" height="18" rx="2" /><line x1="12" y1="17" x2="12" y2="17" />
      </svg>
    ),
  },
];

export default function DemoViewer({ template, demoUrl }: { template: TemplateLocal; demoUrl: string }) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://be.chunmedia.vn';

  console.log("API_BASE_URL:", API_BASE_URL);
  console.log("Demo Url:", demoUrl);
  console.log(`Full Url:, ${API_BASE_URL}${demoUrl}`);

  const [activeDevice, setActiveDevice] = useState<string>("desktop");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);

  const device = DEVICES.find((d) => d.key === activeDevice)!;
  const displayWidth = isRotated ? device.height : device.width;
  const displayHeight = isRotated ? device.width : device.height;

  useEffect(() => {
    const calculate = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const availW = container.clientWidth - 48;
      const availH = container.clientHeight - 48;
      const scaleW = availW / displayWidth;
      const scaleH = availH / displayHeight;
      const scale = Math.min(scaleW, scaleH, 1);
      setZoom(Math.round(scale * 100));
    };
    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [displayWidth, displayHeight, activeDevice, isRotated, isFullscreen]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <div className={`flex flex-col bg-dark text-white ${isFullscreen ? "fixed inset-0 z-200" : "min-h-screen"}`}>
      {/* Toolbar */}
      <div className="shrink-0 border-b border-gray-800/50 bg-dark2/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 h-14 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href={`/portfolio/${template.slug}`} className="shrink-0 w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            </Link>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-white truncate">{template.name}</h1>
              <p className="text-[10px] text-gray-500 truncate">Demo trực tiếp</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-gray-900/60 rounded-xl p-1">
            {DEVICES.map((d) => (
              <button
                key={d.key}
                onClick={() => { setActiveDevice(d.key); setIframeLoaded(false); setIsRotated(false); }}
                title={d.label}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeDevice === d.key
                    ? "bg-mint/[0.15] text-mint"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {d.icon}
                <span className="hidden lg:inline">{d.shortLabel}</span>
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <select
              value={activeDevice}
              onChange={(e) => { setActiveDevice(e.target.value); setIframeLoaded(false); setIsRotated(false); }}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 outline-none"
            >
              {DEVICES.map((d) => (
                <option key={d.key} value={d.key}>{d.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[10px] font-mono text-gray-600 bg-gray-900/60 px-2.5 py-1.5 rounded-lg">
              {displayWidth}×{displayHeight} · {zoom}%
            </span>

            {(activeDevice === "tablet" || activeDevice === "mobile" || activeDevice === "mobileSE") && (
              <button
                onClick={() => setIsRotated(!isRotated)}
                title="Xoay màn hình"
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isRotated ? "bg-mint/[0.15] text-mint" : "bg-gray-800/50 text-gray-400 hover:text-white"}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
              </button>
            )}

            <button onClick={toggleFullscreen} title="Toàn màn hình" className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              {isFullscreen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
              )}
            </button>

            <a href={demoUrl} target="_blank" rel="noopener noreferrer" title="Mở tab mới" className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Iframe Container */}
      <div ref={containerRef} className="flex-1 flex items-center justify-center overflow-auto p-6" style={{ background: "radial-gradient(circle at 50% 50%, rgba(87,245,178,0.02), transparent 70%), #0d1117" }}>
        <div
          className="relative transition-all duration-500 ease-out"
          style={{
            width: displayWidth * (zoom / 100),
            height: displayHeight * (zoom / 100),
          }}
        >
          <div
            className="absolute rounded-2xl"
            style={{
              inset: -4,
              background: "linear-gradient(135deg, rgba(87,245,178,0.15), rgba(55,186,222,0.15))",
              borderRadius: "1.25rem",
            }}
          />
          <div
            className="absolute rounded-2xl"
            style={{
              inset: -3,
              background: "#1a1f2e",
              borderRadius: "1.125rem",
            }}
          />

          <div className="relative w-full h-full rounded-xl overflow-hidden bg-white" style={{ borderRadius: "0.875rem" }}>
            {/* {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark2 z-10">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-mint to-cyan animate-pulse flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a0f1a" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                </div>
                <p className="text-xs text-gray-500">Đang tải demo...</p>
              </div>
            )} */}

            <iframe
              src={`http://localhost:5048${demoUrl}`}
              title={`Demo — ${template.name}`}
              onLoad={() => setIframeLoaded(true)}
              className="border-0"
              style={{
                width: displayWidth,
                height: displayHeight,
                transform: `scale(${zoom / 100})`,
                transformOrigin: "0 0",
              }}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>

          {(activeDevice === "mobile" || activeDevice === "mobileSE") && !isRotated && (
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#1a1f2e] rounded-b-xl z-20"
              style={{
                width: 90 * (zoom / 100),
                height: 20 * (zoom / 100),
              }}
            />
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-gray-800/50 bg-dark2/80 backdrop-blur-xl px-4 py-2.5 flex items-center justify-between">
        <p className="text-[10px] text-gray-600">
          💡 Đây là giao diện thật — bạn có thể scroll, click và tương tác như website thực tế
        </p>
        <Link href={`/portfolio/${template.slug}`} className="text-[10px] text-mint hover:underline flex items-center gap-1">
          Quay lại chi tiết
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </Link>
      </div>
    </div>
  );
}
