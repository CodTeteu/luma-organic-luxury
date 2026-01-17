"use client";

import { motion } from "framer-motion";
import { Check, Palette } from "lucide-react";
import { ThemeStyle, TemplateData } from "@/types/template";
import { getAllThemeStyles, themeStyles } from "@/config/themeStyles";

interface ThemeSelectorProps {
    data: TemplateData;
    onChange: (data: TemplateData) => void;
}

export default function ThemeSelector({ data, onChange }: ThemeSelectorProps) {
    const currentTheme = data.config.themeStyle || "classic";

    const handleThemeChange = (themeId: ThemeStyle) => {
        onChange({
            ...data,
            config: {
                ...data.config,
                themeStyle: themeId
            }
        });
    };

    const themes = getAllThemeStyles();

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <Palette size={16} className="text-[#C19B58]" />
                <span className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">
                    Estilo Visual
                </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {themes.map(({ id, config }) => {
                    const isSelected = currentTheme === id;

                    return (
                        <motion.button
                            key={id}
                            onClick={() => handleThemeChange(id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative p-3 rounded-xl border-2 transition-all text-left ${isSelected
                                    ? "border-[#C19B58] bg-[#C19B58]/5"
                                    : "border-[#E5E0D6] hover:border-[#C19B58]/50"
                                }`}
                        >
                            {/* Selected Check */}
                            {isSelected && (
                                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#C19B58] flex items-center justify-center">
                                    <Check size={12} className="text-white" />
                                </div>
                            )}

                            {/* Color Preview */}
                            <div className="flex gap-1 mb-2">
                                <div
                                    className="w-6 h-6 rounded-full border border-white/50 shadow-sm"
                                    style={{ backgroundColor: config.preview.primary }}
                                />
                                <div
                                    className="w-6 h-6 rounded-full border border-white/50 shadow-sm"
                                    style={{ backgroundColor: config.preview.secondary }}
                                />
                                <div
                                    className="w-6 h-6 rounded-full border border-gray-200 shadow-sm"
                                    style={{ backgroundColor: config.preview.background }}
                                />
                            </div>

                            {/* Theme Name */}
                            <p className="text-sm font-medium text-[#2A3B2E] mb-0.5">
                                {config.name}
                            </p>
                            <p className="text-[10px] text-[#6B7A6C] leading-tight line-clamp-2">
                                {config.description}
                            </p>
                        </motion.button>
                    );
                })}
            </div>

            {/* Current Theme Info */}
            <div className="mt-4 p-3 bg-[#F7F5F0] rounded-lg border border-[#E5E0D6]">
                <div className="flex items-center gap-2 mb-2">
                    <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: themeStyles[currentTheme].preview.primary }}
                    />
                    <span className="text-xs font-medium text-[#2A3B2E]">
                        {themeStyles[currentTheme].name}
                    </span>
                </div>
                <p className="text-[10px] text-[#6B7A6C]">
                    Altere o estilo visual do site. O conteúdo permanece o mesmo.
                </p>
            </div>
        </div>
    );
}
