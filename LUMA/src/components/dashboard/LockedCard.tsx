"use client";

import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import { ReactNode } from "react";

interface LockedCardProps {
    title: string;
    value: string;
    icon?: ReactNode;
    description?: string;
    ctaText?: string;
    onUpgrade?: () => void;
}

export default function LockedCard({
    title,
    value,
    icon,
    description = "Disponível no plano Premium",
    ctaText = "Fazer Upgrade",
    onUpgrade,
}: LockedCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-gradient-to-br from-white to-[#F7F5F0] rounded-2xl border border-[#E5E0D6] p-6"
        >
            {/* Blurred Content */}
            <div className="blur-sm select-none pointer-events-none">
                <div className="flex items-center gap-3 mb-4">
                    {icon && (
                        <div className="w-10 h-10 rounded-xl bg-[#2A3B2E]/10 flex items-center justify-center text-[#2A3B2E]">
                            {icon}
                        </div>
                    )}
                    <p className="text-sm text-[#6B7A6C]">{title}</p>
                </div>
                <p className="text-3xl font-medium text-[#2A3B2E] font-[family-name:var(--font-heading)]">
                    {value}
                </p>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/70 to-transparent flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C19B58] to-[#A07D3A] flex items-center justify-center shadow-lg mb-3">
                    <Lock size={20} className="text-white" />
                </div>
                <p className="text-sm text-[#2A3B2E] font-medium text-center mb-1">{description}</p>
                {onUpgrade && (
                    <button
                        onClick={onUpgrade}
                        className="mt-3 px-4 py-2 bg-gradient-to-r from-[#C19B58] to-[#A07D3A] text-white text-xs font-medium rounded-full flex items-center gap-2 hover:shadow-lg transition-shadow"
                    >
                        <Sparkles size={12} />
                        {ctaText}
                    </button>
                )}
            </div>

            {/* Premium Badge */}
            <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-[#C19B58] to-[#A07D3A] rounded-full">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Premium</span>
            </div>
        </motion.div>
    );
}
