"use client";

import { motion } from "framer-motion";
import { Check, Palette, Layout } from "lucide-react";
import { TemplateData } from "@/types/template";
import { TEMPLATE_REGISTRY } from "@/templates/registry";

interface TemplateSelectorProps {
    data: TemplateData;
    onChange: (data: TemplateData) => void;
}

export default function TemplateSelector({ data, onChange }: TemplateSelectorProps) {
    const currentTheme = data.config.themeStyle || "organic-luxury";

    const handleThemeChange = (themeId: any) => {
        onChange({
            ...data,
            config: {
                ...data.config,
                themeStyle: themeId
            }
        });
    };

    // Group templates by category for better organization
    const categories = Array.from(new Set(TEMPLATE_REGISTRY.map(t => t.category)));

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
                <Layout size={16} className="text-[#C19B58]" />
                <span className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">
                    Modelos Disponíveis
                </span>
            </div>

            {categories.map(category => {
                const templates = TEMPLATE_REGISTRY.filter(t => t.category === category && !t.label.includes("Legacy"));
                if (templates.length === 0) return null;

                return (
                    <div key={category} className="space-y-3">
                        <h3 className="text-[10px] font-bold text-[#6B7A6C] uppercase tracking-widest pl-1">
                            {category}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {templates.map((template) => {
                                const isSelected = currentTheme === template.id;

                                return (
                                    <motion.button
                                        key={template.id}
                                        onClick={() => handleThemeChange(template.id)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`relative p-3 rounded-xl border-2 transition-all text-left h-full flex flex-col justify-between ${isSelected
                                            ? "border-[#C19B58] bg-[#C19B58]/5"
                                            : "border-[#E5E0D6] hover:border-[#C19B58]/50 bg-white"
                                            }`}
                                    >
                                        {/* Selected Check */}
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#C19B58] flex items-center justify-center z-10">
                                                <Check size={12} className="text-white" />
                                            </div>
                                        )}

                                        <div>
                                            {/* Preview Placeholder - In future add real thumbnails */}
                                            <div className="w-full aspect-[4/3] rounded-lg bg-gray-100 mb-3 overflow-hidden border border-gray-100 relative">
                                                <div className={`absolute inset-0 flex items-center justify-center text-xs opacity-50 font-bold uppercase tracking-widest
                                                    ${template.id.includes('dark') ? 'bg-slate-900 text-white' : ''}
                                                    ${template.id.includes('organic') ? 'bg-[#FFFBF7] text-[#8B7355]' : ''}
                                                    ${template.id.includes('modern') ? 'bg-white text-black' : ''}
                                                    ${template.id.includes('classic') ? 'bg-white text-amber-500' : ''}
                                                    ${template.id.includes('boho') ? 'bg-[#f5e6d3] text-[#c26d40]' : ''}
                                                    ${template.id.includes('beach') ? 'bg-sky-50 text-sky-500' : ''}
                                                    ${template.id.includes('floral') ? 'bg-pink-50 text-pink-400' : ''}
                                                    ${template.id.includes('industrial') ? 'bg-zinc-100 text-zinc-800' : ''}
                                                `}>
                                                    Preview
                                                </div>
                                            </div>

                                            {/* Template Info */}
                                            <p className="text-sm font-bold text-[#2A3B2E] mb-1 leading-tight">
                                                {template.label}
                                            </p>
                                            <p className="text-[10px] text-[#6B7A6C] leading-snug line-clamp-3">
                                                {template.description}
                                            </p>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
