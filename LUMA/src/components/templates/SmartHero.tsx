"use client";

import { motion } from "framer-motion";
import { Heart, Calendar, MapPin, MousePointerClick } from "lucide-react";
import { TemplateData, ThemeStyle } from "@/types/template";

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
    const themeStyle = theme || data.config.themeStyle || "organic-luxury";

    // Theme-specific layout configurations
    const layoutStyles: Record<string, {
        container: string;
        overlay: string;
        content: string;
        titleStyle: string;
        dateStyle: string;
        features?: React.ReactNode;
    }> = {
        // 1. ORGANIC LUXURY (Default/Original)
        "organic-luxury": {
            container: "min-h-screen relative flex items-center justify-center",
            overlay: "absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60",
            content: "relative z-10 text-center text-white px-4",
            titleStyle: "font-[family-name:var(--font-script)] text-6xl md:text-8xl mb-4 drop-shadow-lg",
            dateStyle: "tracking-[0.3em] uppercase text-sm opacity-90"
        },
        "classic": { // Legacy map
            container: "min-h-screen relative flex items-center justify-center",
            overlay: "absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60",
            content: "relative z-10 text-center text-white px-4",
            titleStyle: "font-[family-name:var(--font-script)] text-6xl md:text-8xl mb-4 drop-shadow-lg",
            dateStyle: "tracking-[0.3em] uppercase text-sm opacity-90"
        },

        // 2. CLASSIC ROMANCE
        "classic-romance": {
            container: "min-h-screen relative flex items-end justify-center pb-32",
            overlay: "absolute inset-0 bg-black/40",
            content: "relative z-10 text-center text-white px-4 border-b border-white/30 pb-12 w-full max-w-4xl mx-auto",
            titleStyle: "font-serif text-5xl md:text-7xl mb-6",
            dateStyle: "font-serif italic text-lg tracking-widest"
        },

        // 3. MODERN MINIMAL
        "modern-minimal": {
            container: "min-h-screen relative flex items-center justify-start pl-8 md:pl-24",
            overlay: "absolute inset-0 bg-white/10 backdrop-grayscale-[50%]", // Slight desaturation
            content: "relative z-10 text-left text-white px-4 max-w-2xl",
            titleStyle: "font-sans font-black text-6xl md:text-9xl uppercase tracking-tighter leading-[0.8]",
            dateStyle: "font-sans font-bold text-sm bg-black text-white px-4 py-2 inline-block mt-8 uppercase tracking-widest"
        },
        "modern": { // Legacy map
            container: "min-h-screen relative flex items-center justify-start pl-8 md:pl-24",
            overlay: "absolute inset-0 bg-white/10 backdrop-grayscale-[50%]",
            content: "relative z-10 text-left text-white px-4 max-w-2xl",
            titleStyle: "font-sans font-black text-6xl md:text-9xl uppercase tracking-tighter leading-[0.8]",
            dateStyle: "font-sans font-bold text-sm bg-black text-white px-4 py-2 inline-block mt-8 uppercase tracking-widest"
        },

        // 4. BOHO CHIC
        "boho-chic": {
            container: "min-h-screen relative flex items-center justify-center m-4 rounded-[3rem] overflow-hidden",
            overlay: "absolute inset-0 bg-[#c26d40]/20 mix-blend-multiply",
            content: "relative z-10 text-center text-white px-4 py-12 border-y border-white/50 bg-black/20 backdrop-blur-sm max-w-3xl",
            titleStyle: "font-[family-name:var(--font-script)] text-7xl md:text-9xl mb-2",
            dateStyle: "font-sans text-sm tracking-[0.5em] uppercase"
        },

        // 5. DARK ELEGANCE
        "dark-elegance": {
            container: "min-h-screen relative flex items-center justify-center",
            overlay: "absolute inset-0 bg-black/70",
            content: "relative z-10 text-center text-yellow-50 px-8 py-16 border border-yellow-500/30 bg-black/40 backdrop-blur-md max-w-2xl",
            titleStyle: "font-serif font-light text-5xl md:text-7xl mb-8 tracking-wide text-yellow-100",
            dateStyle: "font-serif italic text-yellow-200/80 text-xl"
        },

        // 6. BEACH DESTINATION
        "beach-destination": {
            container: "min-h-screen relative flex flex-col items-center justify-between py-24",
            overlay: "absolute inset-0 bg-gradient-to-t from-sky-900/50 to-transparent",
            content: "relative z-10 text-center text-white w-full",
            titleStyle: "font-sans font-black text-6xl md:text-8xl uppercase tracking-tight drop-shadow-2xl text-sky-50",
            dateStyle: "font-handwriting text-3xl md:text-4xl mt-4 rotate-[-2deg] opacity-90"
        },

        // 7. EDITORIAL VOGUE
        "editorial-vogue": {
            container: "min-h-screen relative flex items-end justify-end pb-12 pr-4 md:pr-12",
            overlay: "absolute inset-0 bg-gradient-to-r from-transparent to-black/40",
            content: "relative z-10 text-right text-white max-w-4xl",
            titleStyle: "font-serif italic text-7xl md:text-[10rem] leading-[0.8] mb-4 mix-blend-overlay opacity-90",
            dateStyle: "font-sans font-light text-xs tracking-[1em] uppercase border-t border-white/50 pt-4 inline-block"
        },

        // 8. RUSTIC BARN
        "rustic-barn": {
            container: "min-h-screen relative flex items-center justify-center",
            overlay: "absolute inset-0 bg-sepia-[.4] bg-black/30",
            content: "relative z-10 text-center text-[#FFF8F0] px-8 py-12 bg-black/60 backdrop-blur-sm border-2 border-dashed border-[#FFF8F0]/50",
            titleStyle: "font-serif font-bold text-5xl md:text-7xl mb-4 tracking-tight",
            dateStyle: "font-mono text-sm tracking-widest uppercase text-orange-100"
        },

        // 9. FLORAL GARDEN
        "floral-garden": {
            container: "min-h-screen relative flex items-center justify-center",
            overlay: "absolute inset-0 bg-pink-900/10",
            content: "relative z-10 text-center text-white px-12 py-20 bg-white/10 backdrop-blur-md rounded-full border border-white/40 shadow-2xl",
            titleStyle: "font-[family-name:var(--font-script)] text-6xl md:text-8xl mb-2 drop-shadow-md text-pink-50",
            dateStyle: "font-sans text-xs tracking-[0.4em] uppercase font-bold"
        },

        // 10. INDUSTRIAL LOFT
        "industrial-loft": {
            container: "min-h-screen relative flex items-center justify-center",
            overlay: "absolute inset-0 bg-zinc-900/80 grayscale",
            content: "relative z-10 text-center text-white w-full max-w-5xl border-y-4 border-lime-400 py-12 bg-black/50",
            titleStyle: "font-mono font-bold text-5xl md:text-8xl uppercase tracking-tighter text-lime-400 mix-blend-screen",
            dateStyle: "font-mono text-sm bg-lime-400 text-black px-4 py-1 inline-block mt-4 font-bold"
        }
    };

    const styles = layoutStyles[themeStyle] || layoutStyles["organic-luxury"];

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
                <div className="absolute inset-0 z-0">
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className={styles.content}
            >
                {/* Names */}
                <h1 className={styles.titleStyle}>
                    {data.groomName || "Noivo"}
                    <span className="block md:inline mx-4 opacity-70 text-[0.5em] align-middle">&</span>
                    {data.brideName || "Noiva"}
                </h1>

                {/* Date */}
                <p className={styles.dateStyle}>
                    {formatDate(data.date) || "Data do Casamento"}
                </p>

                {/* Scroll indicator - Generic */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <MousePointerClick className="text-white/50" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
