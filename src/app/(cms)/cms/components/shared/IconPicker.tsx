"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { Search, X, Check } from "lucide-react";
import DynamicIcon, { getAllIconNames } from "./DynamicIcon";

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  placeholder?: string;
}

// Danh sách icon phổ biến để hiển thị đầu tiên
const POPULAR_ICONS = [
  "Megaphone", "TrendingUp", "Video", "Calendar", "Globe", "Code",
  "Briefcase", "Building", "Users", "Target", "Zap", "Star",
  "Heart", "Shield", "Award", "CheckCircle", "Settings", "Mail",
  "Phone", "MapPin", "Clock", "Camera", "Image", "FileText",
  "Database", "Cloud", "Server", "Cpu", "Smartphone", "Monitor",
  "Palette", "PenTool", "Layers", "Layout", "Grid", "Box",
  "Package", "ShoppingCart", "CreditCard", "DollarSign", "Percent", "Tag",
  "Bell", "MessageCircle", "Send", "Share", "Link", "Bookmark",
];

export default function IconPicker({ value, onChange, placeholder = "Chọn icon..." }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Lấy tất cả icon names
  const allIcons = useMemo(() => getAllIconNames(), []);

  // Filter icons theo search
  const filteredIcons = useMemo(() => {
    if (!searchTerm) {
      // Hiển thị popular icons trước, sau đó là còn lại
      const otherIcons = allIcons.filter(name => !POPULAR_ICONS.includes(name));
      return [...POPULAR_ICONS, ...otherIcons];
    }
    
    const term = searchTerm.toLowerCase();
    return allIcons.filter(name => 
      name.toLowerCase().includes(term)
    );
  }, [searchTerm, allIcons]);

  // Close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (iconName: string) => {
    onChange(iconName);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Input Display */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 h-11 w-full rounded-lg border px-4 py-2.5 
          cursor-pointer transition-colors
          ${isOpen 
            ? "border-brand-500 ring-3 ring-brand-500/10" 
            : "border-gray-300 hover:border-gray-400 dark:border-gray-700"
          }
          bg-white dark:bg-gray-900
        `}
      >
        {value ? (
          <>
            <div className="w-6 h-6 flex items-center justify-center bg-brand-50 rounded dark:bg-brand-500/10">
              <DynamicIcon name={value} className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            </div>
            <span className="flex-1 text-sm text-gray-800 dark:text-white/90">{value}</span>
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded dark:hover:bg-gray-800"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </>
        ) : (
          <span className="flex-1 text-sm text-gray-400">{placeholder}</span>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          {/* Search Input */}
          {/* <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm icon..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-brand-500 dark:bg-gray-800 dark:text-white"
                autoFocus
              />
            </div>
          </div> */}

          {/* Icons Grid */}
          <div className="p-3 max-h-64 overflow-y-auto">
            {filteredIcons.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Không tìm thấy icon</p>
            ) : (
              <div className="grid grid-cols-6 gap-2">
                {filteredIcons.slice(0, 120).map((iconName) => (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => handleSelect(iconName)}
                    title={iconName}
                    className={`
                      relative p-2.5 rounded-lg transition-colors flex items-center justify-center
                      ${value === iconName 
                        ? "bg-brand-500 text-white" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                      }
                    `}
                  >
                    <DynamicIcon name={iconName} className="w-5 h-5" />
                    {value === iconName && (
                      <Check className="absolute top-0.5 right-0.5 w-3 h-3" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredIcons.length > 120 && (
            <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 text-center">
                Hiển thị 120/{filteredIcons.length} icons. Tìm kiếm để xem thêm.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}