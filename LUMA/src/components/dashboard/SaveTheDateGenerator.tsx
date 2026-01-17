"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Share2, Sparkles, Heart } from "lucide-react";
import html2canvas from "html2canvas";
import { TemplateData, themeColors, SiteTheme } from "@/types/template";
import { getSiteData } from "@/services/mockStorage";

interface SaveTheDateGeneratorProps {
    data?: TemplateData;
}

export default function SaveTheDateGenerator({ data: propData }: SaveTheDateGeneratorProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);

    const data = propData || getSiteData();
    const theme = data.config?.theme || "olive";
    const colors = themeColors[theme as SiteTheme];

    const formatDateForDisplay = (dateString: string) => {
        if (!dateString) return { day: "31", month: "Dezembro", year: "2026" };
        try {
            const [year, month, day] = dateString.split("-");
            const months = [
                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
            ];
            return {
                day,
                month: months[parseInt(month) - 1],
                year
            };
        } catch {
            return { day: "31", month: "Dezembro", year: "2026" };
        }
    };

    const dateInfo = formatDateForDisplay(data.date);

    const handleDownload = async () => {
        if (!previewRef.current) return;

        setIsGenerating(true);
        try {
            const canvas = await html2canvas(previewRef.current, {
                scale: 2,
                backgroundColor: colors.bg,
                useCORS: true,
            });

            const link = document.createElement("a");
            link.download = `save-the-date-${data.brideName}-${data.groomName}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();

            setIsDownloaded(true);
            setTimeout(() => setIsDownloaded(false), 3000);
        } catch (error) {
            console.error("Error generating image:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#DCD3C5] p-6"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C19B58] to-[#A07D3A] flex items-center justify-center">
                    <Share2 size={18} className="text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-medium text-[#2A3B2E] font-[family-name:var(--font-heading)]">
                        Save The Date
                    </h3>
                    <p className="text-xs text-[#6B7A6C]">Gere uma imagem para postar nas redes sociais</p>
                </div>
            </div>

            {/* Preview Container - 1:1 Aspect Ratio */}
            <div className="relative mb-6">
                <div
                    ref={previewRef}
                    className="aspect-square w-full max-w-[400px] mx-auto rounded-lg overflow-hidden relative"
                    style={{ backgroundColor: colors.bg }}
                >
                    {/* Background Pattern */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent(colors.primary)}' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Decorative Border */}
                    <div
                        className="absolute inset-4 border-2 rounded-sm"
                        style={{ borderColor: `${colors.primary}40` }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                        {/* Top Decoration */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-px" style={{ backgroundColor: colors.secondary }} />
                            <Sparkles size={16} style={{ color: colors.secondary }} />
                            <div className="w-12 h-px" style={{ backgroundColor: colors.secondary }} />
                        </div>

                        {/* Save The Date Text */}
                        <p
                            className="text-xs uppercase tracking-[0.3em] font-medium mb-6"
                            style={{ color: colors.muted }}
                        >
                            Save The Date
                        </p>

                        {/* Names */}
                        <h2
                            className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] mb-2"
                            style={{ color: colors.text }}
                        >
                            {data.brideName || "Noiva"}
                        </h2>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-px" style={{ backgroundColor: colors.secondary }} />
                            <Heart size={14} style={{ color: colors.secondary }} fill={colors.secondary} />
                            <div className="w-8 h-px" style={{ backgroundColor: colors.secondary }} />
                        </div>
                        <h2
                            className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] mb-8"
                            style={{ color: colors.text }}
                        >
                            {data.groomName || "Noivo"}
                        </h2>

                        {/* Date */}
                        <div className="flex flex-col items-center">
                            <p
                                className="text-6xl font-light tracking-tight"
                                style={{ color: colors.primary }}
                            >
                                {dateInfo.day}
                            </p>
                            <p
                                className="text-lg uppercase tracking-[0.2em]"
                                style={{ color: colors.muted }}
                            >
                                {dateInfo.month}
                            </p>
                            <p
                                className="text-2xl tracking-widest"
                                style={{ color: colors.primary }}
                            >
                                {dateInfo.year}
                            </p>
                        </div>

                        {/* Bottom Decoration */}
                        <div className="absolute bottom-8 flex items-center gap-3">
                            <div className="w-12 h-px" style={{ backgroundColor: colors.secondary }} />
                            <Sparkles size={16} style={{ color: colors.secondary }} />
                            <div className="w-12 h-px" style={{ backgroundColor: colors.secondary }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Download Button */}
            <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="w-full py-3 bg-gradient-to-r from-[#C19B58] to-[#A07D3A] text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-shadow disabled:opacity-70"
            >
                {isGenerating ? (
                    <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Gerando...
                    </>
                ) : isDownloaded ? (
                    <>
                        <Sparkles size={18} />
                        Baixado!
                    </>
                ) : (
                    <>
                        <Download size={18} />
                        Baixar Imagem
                    </>
                )}
            </button>

            <p className="text-[10px] text-[#6B7A6C] text-center mt-3">
                Imagem 1080x1080 - Perfeita para Instagram
            </p>
        </motion.div>
    );
}
