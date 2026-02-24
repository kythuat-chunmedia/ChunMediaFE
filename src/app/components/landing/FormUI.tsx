"use client";

import React from "react";

// ==========================================
// Error Message
// ==========================================
export function ErrorMsg({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="text-xs text-red-500 mt-1">{error}</p>;
}

// ==========================================
// Form Group
// ==========================================
export function FormGroup({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <label className="block text-[13px] font-semibold text-[#94a3b8] mb-2 tracking-wide">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {optional && (
          <span className="text-[#64748b] font-normal text-xs ml-1">(nếu có)</span>
        )}
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
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-3.5 bg-[#0f1629] border-[1.5px] rounded-xl text-[#f1f5f9] text-sm outline-none transition-all duration-300 placeholder:text-[#64748b] focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] focus:bg-[rgba(15,22,41,0.8)] ${
        error ? "border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.15)]" : "border-[#2a3456]"
      }`}
    />
  );
}

// ==========================================
// Textarea
// ==========================================
export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3.5 bg-[#0f1629] border-[1.5px] border-[#2a3456] rounded-xl text-[#f1f5f9] text-sm outline-none transition-all duration-300 placeholder:text-[#64748b] focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] resize-y min-h-[120px] leading-relaxed"
    />
  );
}

// ==========================================
// Select Input (string value)
// ==========================================
export function SelectInput({
  value,
  onChange,
  options,
  placeholder = "— Chọn —",
  error,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[] | string[];
  placeholder?: string;
  error?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`landing-select w-full px-4 py-3.5 bg-[#0f1629] border-[1.5px] rounded-xl text-[#f1f5f9] text-sm outline-none transition-all duration-300 cursor-pointer focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] [&>option]:bg-[#111827] [&>option]:text-[#f1f5f9] ${
        error ? "border-red-500" : "border-[#2a3456]"
      }`}
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
// Select Input (number value - cho enum)
// ==========================================
export function SelectEnum({
  value,
  onChange,
  options,
  placeholder = "— Chọn —",
  error,
}: {
  value: number | null;
  onChange: (val: number | null) => void;
  options: { value: number; label: string }[];
  placeholder?: string;
  error?: string;
}) {
  return (
    <select
      value={value === null ? "" : value.toString()}
      onChange={(e) => {
        const v = e.target.value;
        onChange(v === "" ? null : parseInt(v, 10));
      }}
      className={`landing-select w-full px-4 py-3.5 bg-[#0f1629] border-[1.5px] rounded-xl text-[#f1f5f9] text-sm outline-none transition-all duration-300 cursor-pointer focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] [&>option]:bg-[#111827] [&>option]:text-[#f1f5f9] ${
        error ? "border-red-500" : "border-[#2a3456]"
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value.toString()}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

// ==========================================
// Option Card (radio/checkbox cho enum number)
// ==========================================
export function OptionCard({
  selected,
  onClick,
  icon,
  title,
  desc,
  type = "radio",
}: {
  selected: boolean;
  onClick: () => void;
  icon?: string;
  title: string;
  desc?: string;
  type?: "radio" | "checkbox";
}) {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <div
        className={`p-4 bg-[#0f1629] border-[1.5px] rounded-xl transition-all duration-300 flex items-start gap-3 ${
          selected
            ? "border-indigo-500 bg-[rgba(99,102,241,0.15)] shadow-[0_0_20px_rgba(99,102,241,0.1)]"
            : "border-[#2a3456] hover:border-[rgba(99,102,241,0.4)] hover:bg-[rgba(99,102,241,0.05)]"
        }`}
      >
        {icon && (
          <div className="text-[22px] shrink-0 w-9 h-9 flex items-center justify-center bg-white/5 rounded-lg">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-[#f1f5f9] mb-0.5">{title}</div>
          {desc && <div className="text-xs text-[#64748b] leading-snug">{desc}</div>}
        </div>
        <div
          className={`w-5 h-5 border-2 shrink-0 flex items-center justify-center transition-all duration-300 mt-0.5 ${
            type === "radio" ? "rounded-full" : "rounded-md"
          } ${selected ? "border-indigo-500 bg-indigo-500" : "border-[#2a3456]"}`}
        >
          {selected && <span className="text-white text-[11px] font-bold">✓</span>}
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
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-[#2a3456]" />
      <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">{label}</span>
      <div className="flex-1 h-px bg-[#2a3456]" />
    </div>
  );
}

// ==========================================
// Step Header
// ==========================================
export function StepHeader({
  icon,
  iconBg,
  iconColor,
  title,
  description,
}: {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-9">
      <div
        className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-4 text-2xl"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <h2 className="text-[26px] font-extrabold tracking-tight mb-2">{title}</h2>
      <p className="text-[#94a3b8] text-[15px] leading-relaxed">{description}</p>
    </div>
  );
}
