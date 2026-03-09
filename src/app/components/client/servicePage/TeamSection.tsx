"use client";
import React from "react";
import type { ServiceTeam } from "@/app/types";

interface TeamSectionProps {
  data: ServiceTeam;
}

export default function TeamSection({ data }: TeamSectionProps) {
  if (!data?.experts?.length) return null;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          {data.title && (
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">{data.title}</h2>
          )}
          {data.subtitle && (
            <p className="text-gray-500 text-lg max-w-xl mx-auto">{data.subtitle}</p>
          )}
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg,#57F5B2,#37BADE)" }}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.experts.map((expert, i) => (
            <div
              key={i}
              className="group text-center p-6 rounded-3xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
            >
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <div
                  className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{ background: "linear-gradient(135deg,#57F5B2,#37BADE)" }}
                />
                {expert.avatarUrl ? (
                  <img
                    src={expert.avatarUrl}
                    alt={expert.name}
                    className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div
                    className="relative w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg"
                    style={{ background: "linear-gradient(135deg,#57F5B2,#37BADE)" }}
                  >
                    {expert.name?.charAt(0)}
                  </div>
                )}
              </div>

              <h3 className="font-bold text-gray-900 text-base mb-1">{expert.name}</h3>
              <p className="text-sm mb-2" style={{ color: "#37BADE" }}>{expert.role}</p>

              {expert.experience && (
                <p className="text-xs text-gray-400 mb-3">{expert.experience}</p>
              )}

              {expert.specialties && expert.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center">
                  {expert.specialties.slice(0, 3).map((s, si) => (
                    <span
                      key={si}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "linear-gradient(90deg,#57F5B215,#37BADE15)",
                        color: "#37BADE",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}