"use client";
import React from "react";
import type { ServiceProjects } from "@/app/types";

interface ProjectsSectionProps {
  data: ServiceProjects;
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  if (!data?.items?.length) return null;
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          {data.sectionTitle && (
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
              {data.sectionTitle}
            </h2>
          )}
          {data.sectionSubtitle && (
            <p className="text-gray-500 text-lg max-w-xl mx-auto">{data.sectionSubtitle}</p>
          )}
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg,#57F5B2,#37BADE)" }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.items.map((project, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail */}
              {project.thumbnailUrl && (
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Result badge */}
                  {project.resultText && (
                    <div
                      className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl text-white text-xs font-bold shadow-lg"
                      style={{ background: "linear-gradient(90deg,#57F5B2,#37BADE)" }}
                    >
                      🏆 {project.resultText}
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  {project.client && (
                    <span
                      className="text-xs font-bold px-2 py-1 rounded-lg"
                      style={{
                        background: "linear-gradient(90deg,#57F5B220,#37BADE20)",
                        color: "#37BADE",
                      }}
                    >
                      {project.client}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-transparent transition-all"
                  style={{ backgroundImage: "linear-gradient(90deg,#57F5B2,#37BADE)", WebkitBackgroundClip: "text", backgroundClip: "text" } as React.CSSProperties}
                >
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>
                )}
                {project.ctaText && project.ctaUrl && (
                  <a
                    href={project.ctaUrl}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold mt-auto"
                    style={{ color: "#37BADE" }}
                  >
                    {project.ctaText}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}