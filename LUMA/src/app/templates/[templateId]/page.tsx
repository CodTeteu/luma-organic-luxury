'use client';

import { useState, use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { TEMPLATE_EXAMPLES, getTemplateExample } from '@/config/templateExamples';
import { TEMPLATE_REGISTRY, getTemplate } from '@/templates/registry';
import { LeadCaptureModal } from '@/components/modals/LeadCaptureModal';

interface PageProps {
    params: Promise<{ templateId: string }>;
}

export default function TemplatePreviewPage({ params }: PageProps) {
    const { templateId } = use(params);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const templateExample = getTemplateExample(templateId);
    const templateDef = getTemplate(templateId as Parameters<typeof getTemplate>[0]);

    if (!templateExample || !templateDef) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F5F0]">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#2A3B2E] mb-4">Template não encontrado</h1>
                    <Link href="/templates" className="text-[#C19B58] hover:underline">
                        Ver todos os templates
                    </Link>
                </div>
            </div>
        );
    }

    const TemplateComponent = templateDef.component;
    const currentIndex = TEMPLATE_EXAMPLES.findIndex(t => t.id === templateId);
    const prevTemplate = currentIndex > 0 ? TEMPLATE_EXAMPLES[currentIndex - 1] : null;
    const nextTemplate = currentIndex < TEMPLATE_EXAMPLES.length - 1 ? TEMPLATE_EXAMPLES[currentIndex + 1] : null;

    return (
        <main className="min-h-screen bg-[#2A3B2E]">
            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#2A3B2E]/95 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/templates"
                            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Voltar</span>
                        </Link>
                        <div className="hidden sm:block h-6 w-px bg-white/20" />
                        <div>
                            <h1 className="text-white font-medium">{templateExample.label}</h1>
                            <p className="text-white/50 text-xs">{templateExample.category}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Navigation */}
                        <div className="hidden md:flex items-center gap-2">
                            {prevTemplate && (
                                <Link
                                    href={`/templates/${prevTemplate.id}`}
                                    className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                                    title={prevTemplate.label}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </Link>
                            )}
                            <span className="text-white/50 text-sm px-2">
                                {currentIndex + 1} / {TEMPLATE_EXAMPLES.length}
                            </span>
                            {nextTemplate && (
                                <Link
                                    href={`/templates/${nextTemplate.id}`}
                                    className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                                    title={nextTemplate.label}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            )}
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[#C19B58] text-white rounded-lg font-medium hover:bg-[#b08d4b] transition-colors shadow-lg shadow-[#C19B58]/20"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span className="hidden sm:inline">Quero Este</span>
                            <span className="sm:hidden">Quero</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Template Preview */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="pt-16"
            >
                <TemplateComponent data={templateExample.data} />
            </motion.div>

            {/* Mobile Navigation */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#2A3B2E]/95 backdrop-blur-md rounded-full border border-white/10">
                    {prevTemplate ? (
                        <Link
                            href={`/templates/${prevTemplate.id}`}
                            className="p-2 rounded-full bg-white/10 text-white"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                    ) : (
                        <div className="p-2 rounded-full bg-white/5 text-white/30">
                            <ChevronLeft className="w-5 h-5" />
                        </div>
                    )}
                    <span className="text-white/70 text-sm px-2">
                        {currentIndex + 1} / {TEMPLATE_EXAMPLES.length}
                    </span>
                    {nextTemplate ? (
                        <Link
                            href={`/templates/${nextTemplate.id}`}
                            className="p-2 rounded-full bg-white/10 text-white"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    ) : (
                        <div className="p-2 rounded-full bg-white/5 text-white/30">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    )}
                </div>
            </div>

            {/* Close Button (Mobile) */}
            <Link
                href="/templates"
                className="fixed top-20 right-4 z-50 md:hidden p-2 bg-black/50 backdrop-blur-sm rounded-full text-white"
            >
                <X className="w-5 h-5" />
            </Link>

            {/* Lead Capture Modal */}
            <LeadCaptureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedTemplate={templateExample.label}
            />
        </main>
    );
}
