'use client';

import { motion } from 'framer-motion';
import { Sparkles, Eye } from 'lucide-react';
import Link from 'next/link';

interface TemplateCardProps {
    id: string;
    label: string;
    description: string;
    category: 'Classic' | 'Modern' | 'Rustic' | 'Concept';
    colors: {
        primary: string;
        secondary: string;
        bg: string;
    };
    onSelect: (id: string, label: string) => void;
}

const categoryColors = {
    Classic: 'bg-amber-100 text-amber-700',
    Modern: 'bg-slate-100 text-slate-700',
    Rustic: 'bg-orange-100 text-orange-700',
    Concept: 'bg-purple-100 text-purple-700'
};

export function TemplateCard({ id, label, description, category, colors, onSelect }: TemplateCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#E8DFD3]"
        >
            {/* Preview Area */}
            <div
                className="h-48 relative overflow-hidden"
                style={{ backgroundColor: colors.bg }}
            >
                {/* Simulated Template Preview */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center">
                        <p
                            className="text-4xl font-[family-name:var(--font-playfair)] italic"
                            style={{ color: colors.primary }}
                        >
                            Maria & João
                        </p>
                        <div
                            className="w-16 h-0.5 mx-auto mt-2"
                            style={{ backgroundColor: colors.secondary }}
                        />
                        <p
                            className="text-xs mt-2 tracking-widest uppercase"
                            style={{ color: colors.primary, opacity: 0.7 }}
                        >
                            15 de Outubro, 2026
                        </p>
                    </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Link
                        href={`/templates/${id}`}
                        className="px-4 py-2 bg-white text-[#2A3B2E] rounded-full text-sm font-medium flex items-center gap-2 hover:bg-[#F7F5F0] transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        Ver Preview
                    </Link>
                </div>

                {/* Category Badge */}
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${categoryColors[category]}`}>
                    {category}
                </span>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-[#2A3B2E] mb-1 font-[family-name:var(--font-playfair)]">
                    {label}
                </h3>
                <p className="text-sm text-[#6B7A6C] mb-4 line-clamp-2">
                    {description}
                </p>

                {/* Color Palette Preview */}
                <div className="flex items-center gap-2 mb-4">
                    <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: colors.bg }}
                        title="Background"
                    />
                    <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: colors.primary }}
                        title="Primary"
                    />
                    <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: colors.secondary }}
                        title="Secondary"
                    />
                </div>

                {/* CTA Button */}
                <button
                    onClick={() => onSelect(id, label)}
                    className="w-full py-3 bg-[#C19B58] text-white rounded-xl font-medium hover:bg-[#b08d4b] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#C19B58]/20"
                >
                    <Sparkles className="w-4 h-4" />
                    Quero Este Estilo
                </button>
            </div>
        </motion.div>
    );
}

export default TemplateCard;
