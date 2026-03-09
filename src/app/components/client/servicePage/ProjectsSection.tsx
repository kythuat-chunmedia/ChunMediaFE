"use client";
import React from "react";
import type { ServiceProjects, ProjectItem } from "@/app/types";

interface ProjectsSectionProps {
  data: ServiceProjects;
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  if (!data?.items?.length) return null;

  const cardGradient = "linear-gradient(135deg, #57F5B2 0%, #37BADE 100%)";

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-8">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          {data.sectionTitle && (
            <h2
              className="font-extrabold mb-2"
              style={{
                fontSize: "clamp(20px, 3vw, 32px)",
                backgroundImage: cardGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
              }}
            >
              {data.sectionTitle}
            </h2>
          )}
          {data.sectionSubtitle && (
            <p
              className="font-bold text-sm uppercase tracking-wider"
              style={{ color: "#333" }}
            >
              {data.sectionSubtitle}
            </p>
          )}
        </div>

        {/* ── 2×2 Card Grid ── */}
        <div className="grid md:grid-cols-2 gap-4">
          {data.items.slice(0, 4).map((project, i) => (
            <ProjectCard key={i} project={project} cardGradient={cardGradient} />
          ))}
        </div>

        {/* ── CTA ── */}
        {/* {data.ctaText && (
          <div className="flex justify-center mt-10">
            <a
              href={data.ctaUrl ?? "#"}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-all hover:shadow-md"
              style={{
                border: "1.5px solid #37BADE",
                color: "#37BADE",
                background: "#fff",
              }}
            >
              {data.ctaText}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        )} */}
      </div>
    </section>
  );
}

/* ── Individual project card ── */
function ProjectCard({
  project,
  cardGradient,
}: {
  project: ProjectItem;
  cardGradient: string;
}) {
  // stats: array of { label, value } parsed from resultText or project.stats
  const stats: { label: string; value: string }[] =
    (project as any).stats ?? [];

  return (
    <div
      className="group relative rounded-3xl overflow-hidden"
      style={{
        border: "1px solid #EEE",
        background: "#fff",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        minHeight: 320,
      }}
    >
      {/* Full-bleed thumbnail */}
      {project.thumbnailUrl ? (
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="w-full h-full object-cover absolute inset-0"
          style={{ minHeight: 320 }}
        />
      ) : (
        /* Fallback gradient bg */
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg,#f0fdf9,#e0f5ff)" }}
        />
      )}

      {/* Overlay gradient at bottom for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.0) 30%, rgba(255,255,255,0.92) 75%)",
        }}
      />

      {/* Content overlay */}
      <div className="relative flex flex-col h-full" style={{ minHeight: 320 }}>

        {/* Top — title floats over image */}
        <div className="p-5 flex-1">
          {/* Client logo or name */}
          {project.client && (
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2"
              style={{
                background: "rgba(255,255,255,0.85)",
                color: "#37BADE",
                border: "1px solid rgba(55,186,222,0.3)",
              }}
            >
              {project.client}
            </span>
          )}

          <h3
            className="font-extrabold leading-tight"
            style={{
              fontSize: "clamp(16px, 2vw, 22px)",
              backgroundImage: cardGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              maxWidth: "60%",
            }}
          >
            {project.title}
          </h3>
        </div>

        {/* Bottom — description + stats bar */}
        <div className="px-5 pb-5">
          {/* Checklist items from description */}
          {project.description && (
            <ul className="flex flex-col gap-1 mb-4">
              {project.description.split("\n").filter(Boolean).map((line, li) => (
                <li key={li} className="flex items-start gap-2 text-xs" style={{ color: "#333" }}>
                  <svg
                    className="flex-shrink-0 mt-0.5"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <circle cx="6" cy="6" r="5" fill="#57F5B2" opacity="0.25" />
                    <path
                      d="M3 6l2 2 4-4"
                      stroke="#37BADE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span dangerouslySetInnerHTML={{ __html: line }} />
                </li>
              ))}
            </ul>
          )}

          {/* Stats bar */}
          {stats.length > 0 && (
            <div
              className="flex items-center gap-0 rounded-2xl overflow-hidden"
              style={{ border: "1px solid #EEE", background: "#fff" }}
            >
              {/* Client logo slot */}
              {project.client && (
                <div
                  className="px-3 py-2 flex items-center justify-center border-r"
                  style={{ borderColor: "#EEE", minWidth: 60 }}
                >
                  <span className="text-[9px] font-bold text-gray-400 uppercase">
                    {project.client}
                  </span>
                </div>
              )}
              {stats.map((s, si) => (
                <div
                  key={si}
                  className="flex-1 flex flex-col items-center justify-center py-2 px-2 border-r last:border-r-0"
                  style={{ borderColor: "#EEE" }}
                >
                  <span
                    className="font-black text-sm leading-none"
                    style={{
                      backgroundImage: cardGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </span>
                  <span className="text-[9px] text-gray-400 font-medium mt-0.5 text-center leading-tight">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Fallback resultText as badge if no stats */}
          {stats.length === 0 && project.resultText && (
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-bold"
              style={{ background: cardGradient }}
            >
              🏆 {project.resultText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}