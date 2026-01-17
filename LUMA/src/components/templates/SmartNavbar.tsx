"use client";

import { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react"; // Added Heart
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TemplateData } from "@/types/template";
import { TemplateConfig } from "@/templates/BaseLayout";

interface SmartNavbarProps {
    data: TemplateData;
    config: TemplateConfig;
}

export default function SmartNavbar({ data, config }: SmartNavbarProps) {
    const layout = config.layout.nav; // 'top' | 'sidebar-left' | 'floating'

    // Desktop: render specific layout
    // Mobile: Render generic top bar or overlay? 
    // Usually mobile is always "Top Bar with Hamburger" for usability, 
    // unless we want a sidebar drawer.
    // Let's stick to Responsive first: Desktop varies, Mobile standardizes.

    // Force mobile view check
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        return <MobileNavbar data={data} config={config} />;
    }

    switch (layout) {
        case 'sidebar-left':
            return <SidebarLeftNav data={data} config={config} />;
        case 'floating':
            return <FloatingNav data={data} config={config} />;
        case 'top':
        default:
            return <TopNav data={data} config={config} />;
    }
}

// ============================================================================
// 1. TOP NAV (Classic, Centered Pill or Full)
// ============================================================================
const TopNav = ({ data, config }: SmartNavbarProps) => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed w-full z-50 flex justify-center pt-6 pointer-events-none">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`pointer-events-auto transition-all duration-500 ease-in-out ${scrolled
                    ? `px-8 py-3 backdrop-blur-xl rounded-full shadow-lg ${config.colors.bg.replace('bg-', 'bg-opacity-80 ')}`
                    : 'w-full max-w-7xl px-6 bg-transparent'
                    }`}
            >
                <div className="flex items-center justify-between">
                    <div className="font-bold tracking-widest uppercase">
                        {/* Simplified Logo for different fonts */}
                        <span className={`${config.fonts.heading} text-xl`}>LUMA</span>
                    </div>
                    <div className={`hidden md:flex items-center gap-8 ${config.colors.text}`}>
                        {['INÍCIO', 'HISTÓRIA', 'CERIMÔNIA', 'RSVP'].map((item) => (
                            <Link key={item} href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`} className="text-xs uppercase tracking-widest hover:opacity-50 transition-opacity">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.div>
        </nav>
    );
};

// ============================================================================
// 2. SIDEBAR LEFT (Modern, Editorial)
// ============================================================================
const SidebarLeftNav = ({ data, config }: SmartNavbarProps) => {
    return (
        <nav className={`fixed left-0 top-0 h-screen w-[280px] p-12 flex flex-col justify-between z-40 border-r ${config.style.borders} ${config.colors.bg} ${config.colors.text}`}>
            {/* Logo area */}
            <div>
                <h1 className={`${config.fonts.heading} text-4xl mb-2 leading-none`}>
                    {data.groomName} <br /> <span className="text-xl opacity-50">&</span> <br /> {data.brideName}
                </h1>
                <p className="text-xs uppercase tracking-widest opacity-50 mt-4">{data.date}</p>
            </div>

            {/* Vertical Links */}
            <div className="flex flex-col gap-6">
                {['INÍCIO', 'HISTÓRIA', 'CERIMÔNIA', 'GALERIA', 'LISTA', 'RSVP'].map((item, i) => (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className={`text-sm uppercase tracking-[0.2em] hover:translate-x-2 transition-transform ${config.fonts.body}`}
                    >
                        {item}
                    </Link>
                ))}
            </div>

            {/* Footer / Copyright */}
            <div className="text-[10px] opacity-40 uppercase tracking-widest">
                <p>Feito com amor</p>
                <p className="mt-2">LUMA Studios</p>
            </div>
        </nav>
    );
};

// ============================================================================
// 3. FLOATING NAV (Minimal, Fab-like)
// ============================================================================
const FloatingNav = ({ data, config }: SmartNavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed top-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 ${config.colors.primary.replace('text-', 'bg-')} text-white`}
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`fixed inset-4 z-40 rounded-3xl flex items-center justify-center ${config.colors.bg} ${config.colors.text}`}
                    >
                        <div className="text-center space-y-8">
                            {['Início', 'Nossa História', 'Cerimônia', 'Confirmar Presença'].map((item) => (
                                <div key={item} className="overflow-hidden">
                                    <Link
                                        href="#"
                                        onClick={() => setIsOpen(false)}
                                        className={`${config.fonts.heading} text-4xl md:text-6xl hover:italic transition-all`}
                                    >
                                        {item}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// ============================================================================
// MOBILE NAV (Standardized)
// ============================================================================
const MobileNavbar = ({ data, config }: SmartNavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="fixed w-full z-50 p-4 pointer-events-none">
            <div className={`pointer-events-auto flex items-center justify-between px-4 py-3 rounded-xl shadow-lg ${config.colors.bg} ${config.colors.text}`}>
                <span className={`${config.fonts.heading} font-bold`}>LUMA</span>
                <button onClick={() => setIsOpen(true)}>
                    <Menu size={20} />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className={`fixed inset-0 z-50 pointer-events-auto flex flex-col p-8 ${config.colors.bg} ${config.colors.text}`}
                    >
                        <div className="flex justify-end mb-8">
                            <button onClick={() => setIsOpen(false)}><X size={32} /></button>
                        </div>
                        <div className="flex flex-col gap-6 text-2xl font-bold">
                            <Link href="#" onClick={() => setIsOpen(false)}>Início</Link>
                            <Link href="#" onClick={() => setIsOpen(false)}>O Casal</Link>
                            <Link href="#" onClick={() => setIsOpen(false)}>RSVP</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
