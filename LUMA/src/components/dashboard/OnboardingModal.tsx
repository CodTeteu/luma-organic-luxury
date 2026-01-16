"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Calendar, User, Sparkles, X } from "lucide-react";
import { getSiteData, saveSiteData } from "@/services/mockStorage";
import { isSiteComplete, generateSlug, defaultTemplateData } from "@/types/template";

interface OnboardingModalProps {
    onComplete?: () => void;
}

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [brideName, setBrideName] = useState("");
    const [groomName, setGroomName] = useState("");
    const [weddingDate, setWeddingDate] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Check if site is complete
        const siteData = getSiteData();
        if (!isSiteComplete(siteData)) {
            setIsOpen(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!brideName.trim() || !groomName.trim() || !weddingDate) return;

        setIsSaving(true);

        // Create site data with user input
        const slug = generateSlug(brideName, groomName);
        const newSiteData = {
            ...defaultTemplateData,
            brideName: brideName.trim(),
            groomName: groomName.trim(),
            date: weddingDate,
            config: {
                ...defaultTemplateData.config,
                slug,
            },
            ceremony: {
                ...defaultTemplateData.ceremony,
                date: weddingDate,
            },
            couple: {
                ...defaultTemplateData.couple,
                brideBio: `${brideName} ama...`,
                groomBio: `${groomName} ama...`,
            },
        };

        saveSiteData(newSiteData);

        await new Promise(resolve => setTimeout(resolve, 500));
        setIsSaving(false);
        setIsOpen(false);
        onComplete?.();
    };

    const isValid = brideName.trim() && groomName.trim() && weddingDate;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-[#F7F5F0] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-br from-[#2A3B2E] to-[#1a261d] p-8 text-white text-center relative">
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-16 h-16 rounded-full bg-[#C19B58]/20 flex items-center justify-center mx-auto mb-4"
                            >
                                <Sparkles size={32} className="text-[#C19B58]" />
                            </motion.div>
                            <h2 className="text-2xl font-medium font-[family-name:var(--font-heading)]">
                                Bem-vindos à LUMA!
                            </h2>
                            <p className="text-white/70 mt-2 text-sm">
                                Vamos criar o site do seu casamento em segundos
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider flex items-center gap-1">
                                        <User size={12} />
                                        Noiva
                                    </label>
                                    <input
                                        type="text"
                                        value={brideName}
                                        onChange={(e) => setBrideName(e.target.value)}
                                        placeholder="Nome da noiva"
                                        className="w-full px-4 py-3 border border-[#DCD3C5] rounded-lg text-sm focus:border-[#C19B58] focus:outline-none bg-white text-[#2A3B2E]"
                                        autoFocus
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider flex items-center gap-1">
                                        <User size={12} />
                                        Noivo
                                    </label>
                                    <input
                                        type="text"
                                        value={groomName}
                                        onChange={(e) => setGroomName(e.target.value)}
                                        placeholder="Nome do noivo"
                                        className="w-full px-4 py-3 border border-[#DCD3C5] rounded-lg text-sm focus:border-[#C19B58] focus:outline-none bg-white text-[#2A3B2E]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider flex items-center gap-1">
                                    <Calendar size={12} />
                                    Data do Casamento
                                </label>
                                <input
                                    type="date"
                                    value={weddingDate}
                                    onChange={(e) => setWeddingDate(e.target.value)}
                                    className="w-full px-4 py-3 border border-[#DCD3C5] rounded-lg text-sm focus:border-[#C19B58] focus:outline-none bg-white text-[#2A3B2E]"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!isValid || isSaving}
                                className="w-full py-4 bg-[#2A3B2E] text-white rounded-lg font-medium hover:bg-[#1a261d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Criando seu site...
                                    </>
                                ) : (
                                    <>
                                        <Heart size={18} />
                                        Criar Meu Site
                                    </>
                                )}
                            </button>

                            <p className="text-[10px] text-[#6B7A6C] text-center">
                                Você pode editar todos os detalhes depois
                            </p>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
