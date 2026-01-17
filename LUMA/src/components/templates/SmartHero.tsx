"use client";

import { motion } from "framer-motion";
import { Heart, Calendar, MapPin } from "lucide-react";
import { TemplateData, ThemeStyle } from "@/types/template";
import { getThemeStyleConfig } from "@/config/themeStyles";

interface SmartHeroProps {
    data: TemplateData;
    theme?: ThemeStyle;
}

/**
 * Smart Hero Component
 * 
 * Adapts visual styling based on the selected theme while
 * maintaining the same content structure.
 */
export default function SmartHero({ data, theme }: SmartHeroProps) {
    const themeStyle = theme || data.config.themeStyle || "classic";
    const config = getThemeStyleConfig(themeStyle);

    // Theme-specific layout configurations
    const layoutStyles: Record<ThemeStyle, {
        container: string;
        overlay: string;
        content: string;
        titleStyle: string;
        dateStyle: string;
    }> = {
        classic: {
            container: "min-h-screen relative flex items-center justify-center",
            overlay: "absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60",
            content: "relative z-10 text-center text-white px-4",
            titleStyle: "font-[family-name:var(--font-script)] text-6xl md:text-8xl mb-4 drop-shadow-lg",
            dateStyle: "tracking-[0.3em] uppercase text-sm opacity-90"
        },
        modern: {
            container: "min-h-screen relative flex items-end pb-20",
            overlay: "absolute inset-0 bg-black/70",
            content: "relative z-10 text-white px-8 md:px-16 max-w-4xl",
            titleStyle: "font-sans font-black text-5xl md:text-7xl uppercase tracking-tight mb-6",
            dateStyle: "tracking-[0.5em] uppercase text-xs border-l-4 border-white pl-4"
        },
        botanical: {
            container: "min-h-screen relative flex items-center justify-center",
            overlay: "absolute inset-0 bg-gradient-to-b from-[#2A3B2E]/30 to-[#2A3B2E]/70",
            content: "relative z-10 text-center text-white px-4",
            titleStyle: "font-[family-name:var(--font-script)] text-5xl md:text-7xl mb-6 drop-shadow-lg",
            dateStyle: "tracking-[0.2em] uppercase text-sm bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full inline-block"
        },
        minimal: {
            container: "min-h-screen relative flex items-center justify-center bg-gray-100",
            overlay: "absolute inset-0 bg-white/80",
            content: "relative z-10 text-center px-4",
            titleStyle: "font-mono text-4xl md:text-6xl text-gray-900 tracking-tight mb-4",
            dateStyle: "font-mono text-sm text-gray-600 tracking-widest"
        }
    };

    const styles = layoutStyles[themeStyle];

    // Format date for display
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    return (
        <section id="hero" className={styles.container}>
            {/* Background Image */}
            {data.heroImage && (
                <div className="absolute inset-0">
                    <img
                        src={data.heroImage}
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Overlay */}
            <div className={styles.overlay} />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className={styles.content}
            >
                {/* Names */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={styles.titleStyle}
                >
                    {data.groomName || "Noivo"} & {data.brideName || "Noiva"}
                </motion.h1>

                {/* Date */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className={styles.dateStyle}
                >
                    <Calendar size={14} className="inline mr-2 opacity-80" />
                    {formatDate(data.date) || "Data do Casamento"}
                </motion.p>

                {/* Scroll indicator for some themes */}
                {(themeStyle === "classic" || themeStyle === "botanical") && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="mt-12"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-6 h-10 rounded-full border-2 border-white/50 mx-auto flex items-start justify-center p-2"
                        >
                            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}
