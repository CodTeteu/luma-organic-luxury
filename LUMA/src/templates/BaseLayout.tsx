"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TemplateData } from '@/types/template';
import LoadingScreen from '@/components/template1/LoadingScreen';
import SmartNavbar from '@/components/templates/SmartNavbar'; // Updated import
import Hero from '@/components/template1/Hero';
import Couple from '@/components/template1/Couple';
import Gallery from '@/components/template1/Gallery';
import Ceremony from '@/components/template1/Ceremony';
import Buffet from '@/components/template1/Buffet';
import Gifts from '@/components/template1/Gifts';
import Guestbook from '@/components/template1/Guestbook';
import FAQ from '@/components/template1/FAQ';
import RSVP from '@/components/template1/RSVP';
import SmartHero from '@/components/templates/SmartHero';
import { Heart } from 'lucide-react';

export interface TemplateConfig {
    fonts: {
        heading: string;
        body: string;
        script?: string;
    };
    colors: {
        bg: string;
        text: string;
        primary: string;
        secondary: string;
    };
    layout: {
        nav: 'top' | 'sidebar-left' | 'floating';
        hero: 'centered' | 'split' | 'full-screen';
        container: 'contained' | 'full-width';
    };
    style: {
        rounded: string;
        borders: string;
        shadows: string;
        button: string;
    };
}

interface BaseLayoutProps {
    data: TemplateData;
    config: TemplateConfig;
}

const fieldToElementMap: Record<string, string> = {
    groomName: "hero-names",
    brideName: "hero-names",
    date: "hero-date",
    "couple.description": "couple-story",
    "couple.brideBio": "couple-bride-bio",
    "couple.groomBio": "couple-groom-bio",
    "ceremony.locationName": "ceremony-location",
    "ceremony.time": "ceremony-time",
    "reception.locationName": "reception-location",
};

export default function BaseLayout({ data, config }: BaseLayoutProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [highlightedElement, setHighlightedElement] = useState<string | null>(null);

    const getHighlightStyle = (elementId: string): React.CSSProperties => {
        if (highlightedElement === elementId) {
            return {
                boxShadow: `0 0 0 4px ${config.colors.secondary}bf`,
                borderRadius: '8px',
                transition: 'box-shadow 0.3s ease-in-out',
            };
        }
        return {};
    };

    const handleHighlight = useCallback((field: string) => {
        const elementId = fieldToElementMap[field];
        if (!elementId) return;
        const element = document.getElementById(elementId);
        if (!element) {
            const fallback = document.getElementById(field);
            if (fallback) {
                fallback.scrollIntoView({ behavior: "smooth", block: "center" });
                setHighlightedElement(field);
                setTimeout(() => setHighlightedElement(null), 2000);
            }
            return;
        }
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightedElement(elementId);
        setTimeout(() => setHighlightedElement(null), 2000);
    }, []);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (!event.data) return;
            if (event.data.type === "HIGHLIGHT") {
                handleHighlight(event.data.field);
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [handleHighlight]);


    const wrapperClasses = `
        min-h-screen 
        ${config.colors.bg} 
        ${config.colors.text} 
        ${config.fonts.body}
    `;

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        try {
            const [year, month, day] = dateString.split('-');
            const months = [
                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ];
            return `${day} de ${months[parseInt(month) - 1]} de ${year}`;
        } catch {
            return dateString;
        }
    };

    // Determine content padding based on Nav Layout
    const contentPaddingClass = config.layout.nav === 'sidebar-left' ? 'md:pl-[280px]' : '';

    return (
        <>
            <LoadingScreen onComplete={() => setIsLoading(false)} />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                className={wrapperClasses}
            >
                {/* NAVIGATION - SMART & STRUCTURAL */}
                <SmartNavbar data={data} config={config} />

                {/* Main Content Wrapper - Shifts for Sidebar Layouts */}
                <div className={`transition-all duration-300 w-full ${contentPaddingClass}`}>

                    {/* HERO SECTION */}
                    <SmartHero data={data} theme={data.config.themeStyle} />

                    {/* Main Content Container */}
                    <div className={config.layout.container === 'contained' ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : 'w-full'}>

                        {data.couple?.isVisible !== false && (
                            <div id="couple-section" style={getHighlightStyle("couple-story")}>
                                <Couple data={data} config={config} />
                            </div>
                        )}

                        {data.ceremony?.isVisible !== false && (
                            <div id="ceremony-section" style={getHighlightStyle("ceremony-location")}>
                                <Ceremony data={data} config={config} />
                            </div>
                        )}

                        {data.gallery?.isVisible !== false && (
                            <Gallery data={data} />
                        )}

                        {data.rsvp?.isVisible !== false && (
                            <RSVP />
                        )}

                        {data.gifts?.isVisible !== false && (
                            <Gifts data={data} />
                        )}

                        {data.guestbook?.isVisible !== false && (
                            <Guestbook coupleName={`${data.brideName} & ${data.groomName}`} />
                        )}

                        <FAQ />
                    </div>

                    {/* FOOTER */}
                    <footer className={`py-12 text-center relative overflow-hidden ${config.colors.bg} border-t ${config.style.borders.split(' ')[0] || 'border-stone-200'}`}>
                        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
                            <div className="text-center md:text-left">
                                <h2 className={`${config.fonts.script || config.fonts.heading} text-3xl md:text-4xl mb-2 opacity-90`}>
                                    {data.brideName} & {data.groomName}
                                </h2>
                                <p className={`opacity-80 text-sm ${config.fonts.body}`}>
                                    {formatDate(data.date)}
                                </p>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="text-[10px] uppercase tracking-widest flex justify-center gap-4 opacity-60">
                                    <p>© 2025 {data.brideName} & {data.groomName}</p>
                                    <Heart size={10} className="fill-current" />
                                    <p>LUMA</p>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div> {/* End of Main Content Wrapper */}

            </motion.div>
        </>
    );
}
