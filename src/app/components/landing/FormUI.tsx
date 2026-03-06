"use client";

import React from "react";

// ── shared input class ──────────────────────────────────────────────────────
export const inputBase =
  "w-full px-4 py-3.5 bg-white border-[1.5px] rounded-xl text-[#1A1A1A] text-sm outline-none transition-all duration-200 placeholder:text-[#95A5A6] focus:border-[#0A9396] focus:shadow-[0_0_0_3px_rgba(10,147,150,0.12)]";

const inputError = "border-red-400 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]";
const inputNormal = "border-[rgba(10,147,150,0.2)] hover:border-[rgba(10,147,150,0.4)]";

// ==========================================
// Error Message
// ==========================================
export function ErrorMsg({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1"><span>⚠</span>{error}</p>;
}

// ==========================================
// Form Group
// ==========================================
export function FormGroup({
  label, required, optional, error, children,
}: {
  label: string; required?: boolean; optional?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <label className="block text-[13px] font-bold text-[#2C3E50] mb-2 tracking-wide">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {optional && <span className="text-[#95A5A6] font-normal text-xs ml-1">(nếu có)</span>}
      </label>
      {children}
      <ErrorMsg error={error} />
    </div>
  );
}

// ==========================================
// Text Input
// ==========================================
export function TextInput({
  value, onChange, placeholder, type = "text", error,
}: {
  value: string; onChange: (val: string) => void; placeholder?: string; type?: string; error?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${inputBase} ${error ? inputError : inputNormal}`}
    />
  );
}

// ==========================================
// Textarea
// ==========================================
export function TextArea({
  value, onChange, placeholder, rows = 3,
}: {
  value: string; onChange: (val: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`${inputBase} ${inputNormal} resize-y min-h-[120px] leading-relaxed`}
    />
  );
}

// ==========================================
// Select Input (string value)
// ==========================================
export function SelectInput({
  value, onChange, options, placeholder = "— Chọn —", error,
}: {
  value: string; onChange: (val: string) => void;
  options: { value: string; label: string }[] | string[];
  placeholder?: string; error?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputBase} cursor-pointer [&>option]:bg-white [&>option]:text-[#1A1A1A] ${error ? inputError : inputNormal}`}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) =>
        typeof opt === "string" ? (
          <option key={opt} value={opt}>{opt}</option>
        ) : (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        )
      )}
    </select>
  );
}

// ==========================================
// Select Input (number / enum)
// ==========================================
export function SelectEnum({
  value, onChange, options, placeholder = "— Chọn —", error,
}: {
  value: number | null; onChange: (val: number | null) => void;
  options: { value: number; label: string }[];
  placeholder?: string; error?: string;
}) {
  return (
    <select
      value={value === null ? "" : value.toString()}
      onChange={(e) => {
        const v = e.target.value;
        onChange(v === "" ? null : parseInt(v, 10));
      }}
      className={`${inputBase} cursor-pointer [&>option]:bg-white [&>option]:text-[#1A1A1A] ${error ? inputError : inputNormal}`}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value.toString()}>{opt.label}</option>
      ))}
    </select>
  );
}

// ==========================================
// Option Card (radio / checkbox)
// ==========================================
export function OptionCard({
  selected, onClick, icon, title, desc, type = "radio",
}: {
  selected: boolean; onClick: () => void;
  icon?: string; title: string; desc?: string; type?: "radio" | "checkbox";
}) {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <div
        className={`p-4 bg-white border-[1.5px] rounded-xl transition-all duration-200 flex items-start gap-3 ${
          selected
            ? "border-[#0A9396] bg-[rgba(10,147,150,0.05)] shadow-[0_0_0_3px_rgba(10,147,150,0.1)]"
            : "border-[rgba(10,147,150,0.2)] hover:border-[rgba(10,147,150,0.5)] hover:bg-[rgba(10,147,150,0.02)]"
        }`}
      >
        {icon && (
          <div className="text-[20px] shrink-0 w-9 h-9 flex items-center justify-center bg-[rgba(10,147,150,0.08)] rounded-lg">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className={`text-sm font-bold mb-0.5 transition-colors ${selected ? "text-[#0A9396]" : "text-[#1A1A1A]"}`}>
            {title}
          </div>
          {desc && <div className="text-xs text-[#6C757D] leading-snug">{desc}</div>}
        </div>
        <div
          className={`w-5 h-5 border-2 shrink-0 flex items-center justify-center transition-all duration-200 mt-0.5 ${
            type === "radio" ? "rounded-full" : "rounded-md"
          } ${
            selected
              ? "border-[#0A9396] bg-gradient-to-br from-[#0A9396] to-[#94D2BD]"
              : "border-[rgba(10,147,150,0.25)] bg-white"
          }`}
        >
          {selected && <span className="text-white text-[10px] font-black">✓</span>}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Section Divider
// ==========================================
export function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-7">
      <div className="flex-1 h-px bg-[rgba(10,147,150,0.15)]" />
      <span className="text-[11px] font-bold text-[#95A5A6] uppercase tracking-widest">{label}</span>
      <div className="flex-1 h-px bg-[rgba(10,147,150,0.15)]" />
    </div>
  );
}

// ==========================================
// Step Header
// ==========================================
export function StepHeader({
  icon, iconBg, iconColor, title, description,
}: {
  icon: string; iconBg: string; iconColor: string; title: string; description: string;
}) {
  return (
    <div className="mb-8">
      <div
        className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-4 text-2xl shadow-[0_4px_16px_rgba(10,147,150,0.12)]"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <h2 className="text-[24px] font-extrabold tracking-tight text-[#1A1A1A] mb-2">{title}</h2>
      <p className="text-[#6C757D] text-[15px] leading-relaxed">{description}</p>
    </div>
  );
}