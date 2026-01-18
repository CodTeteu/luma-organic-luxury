import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { TemplateData } from '@/types/template';
import Link from 'next/link';

interface CeremonyProps {
    data?: TemplateData;
    config?: any;
}

const Ceremony = ({ data, config }: CeremonyProps) => {
    // If we're not passing props yet, these will be undefined, so fallback nicely or handle it
    const ceremonyDate = data?.ceremony?.date || "2025-10-25";
    const ceremonyTime = data?.ceremony?.time || "16:00";
    const ceremonyLocation = data?.ceremony?.locationName || "Capela dos Milagres";

    const receptionLocation = data?.reception?.locationName || "Salão de Festas Jardim";

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Styles
    const bgClass = config?.colors?.bg || "bg-stone-900";
    const textClass = config?.colors?.text || "text-stone-200";
    const primaryClass = config?.colors?.primary || "text-olive-300";
    const headingFont = config?.fonts?.script || config?.fonts?.heading || "font-script";
    const bodyFont = config?.fonts?.body || "font-serif";
    const borderClass = config?.style?.borders || "border-white/10";
    const roundedClass = config?.style?.rounded || "rounded-2xl";
    const shadowClass = config?.style?.shadows || "shadow-none";

    return (
        <section id="ceremony" className={`py-24 relative overflow-hidden ${bgClass} ${textClass}`}>
            {/* Background Texture - optional based on config */}
            <div className={`absolute inset-0 opacity-5 mix-blend-overlay ${config?.colors?.primary?.replace('text-', 'bg-') || 'bg-black'}`} />

            <div className="max-w-4xl mx-auto px-4 relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className={`${primaryClass} uppercase tracking-[0.2em] text-xs font-semibold`}>O Grande Dia</span>
                    <h2 className={`${headingFont} text-5xl md:text-6xl mt-4 opacity-90`}>Cerimônia & Festa</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Ceremony Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`backdrop-blur-sm border p-8 ${roundedClass} ${shadowClass} md:text-right flex flex-col items-center md:items-end transition-colors group ${borderClass}`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${primaryClass.replace('text-', 'bg-')}/10 ${primaryClass}`}>
                            <Clock size={24} />
                        </div>
                        <h3 className={`${bodyFont} text-2xl mb-2`}>A Cerimônia</h3>

                        <div className="space-y-1 mb-6 text-center md:text-right">
                            <p className="text-lg opacity-80">{ceremonyDate}</p>
                            <div className="flex items-center justify-center md:justify-end gap-2 opacity-60">
                                <span>{ceremonyTime}</span> <span className="text-xs uppercase tracking-widest">Horas</span>
                            </div>
                        </div>

                        <div className="space-y-2 text-center md:text-right">
                            <h4 className="font-bold uppercase tracking-widest text-xs opacity-50">Local</h4>
                            <p className={`${bodyFont} italic opacity-90`}>{ceremonyLocation}</p>
                            <p className="text-sm text-center md:text-right opacity-60">Rua das Flores, 123 - Cidade Jardim</p>
                        </div>

                        <Link href="#" className={`mt-8 text-xs uppercase tracking-widest ${primaryClass} border-b border-current pb-1 transition-all opacity-80 hover:opacity-100`}>
                            Ver no Mapa
                        </Link>
                    </motion.div>

                    {/* Reception Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className={`backdrop-blur-sm border p-8 ${roundedClass} ${shadowClass} md:text-right flex flex-col items-center md:items-start transition-colors group ${borderClass}`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${primaryClass.replace('text-', 'bg-')}/10 ${primaryClass}`}>
                            <MapPin size={24} />
                        </div>
                        <h3 className={`${bodyFont} text-2xl mb-2`}>A Recepção</h3>
                        <div className="space-y-1 mb-6 text-center md:text-left">
                            <p className="text-lg opacity-80">Logo após a cerimônia</p>
                            <div className="flex items-center justify-center md:justify-start gap-2 opacity-60">
                                <span className="text-xs uppercase tracking-widest">Vamos celebrar!</span>
                            </div>
                        </div>

                        <div className="space-y-2 text-center md:text-left">
                            <h4 className="font-bold uppercase tracking-widest text-xs opacity-50">Local</h4>
                            <p className={`${bodyFont} italic opacity-90`}>{receptionLocation}</p>
                            <p className="text-sm text-center md:text-left opacity-60">Avenida Principal, 500 - Centro</p>
                        </div>

                        <Link href="#" className={`mt-8 text-xs uppercase tracking-widest ${primaryClass} border-b border-current pb-1 transition-all opacity-80 hover:opacity-100`}>
                            Ver no Mapa
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Ceremony;
