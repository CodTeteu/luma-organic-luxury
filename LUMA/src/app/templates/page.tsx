'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { TEMPLATE_EXAMPLES, TemplateExample } from '@/config/templateExamples';
import { TemplateCard } from '@/components/catalog/TemplateCard';
import { LeadCaptureModal } from '@/components/modals/LeadCaptureModal';

const CATEGORIES = ['Todos', 'Classic', 'Modern', 'Rustic', 'Concept'] as const;
type CategoryFilter = typeof CATEGORIES[number];

export default function TemplatesPage() {
    const [activeCategory, setActiveCategory] = useState<CategoryFilter>('Todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>();

    const filteredTemplates = activeCategory === 'Todos'
        ? TEMPLATE_EXAMPLES
        : TEMPLATE_EXAMPLES.filter((t: TemplateExample) => t.category === activeCategory);

    const handleSelectTemplate = (id: string, label: string) => {
        setSelectedTemplate(label);
        setIsModalOpen(true);
    };

    return (
        <main className="min-h-screen bg-[#F7F5F0]">
            {/* Header */}
            <header className="bg-white border-b border-[#E8DFD3] sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[#6B7A6C] hover:text-[#2A3B2E] transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Voltar</span>
                    </Link>
                    <Link href="/" className="text-2xl font-bold text-[#2A3B2E] font-[family-name:var(--font-playfair)]">
                        LUMA
                    </Link>
                    <div className="w-20" /> {/* Spacer */}
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 px-6 text-center bg-gradient-to-b from-white to-[#F7F5F0]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C19B58]/10 rounded-full mb-6">
                        <Sparkles className="w-4 h-4 text-[#C19B58]" />
                        <span className="text-sm font-medium text-[#C19B58]">10 Templates Exclusivos</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] text-[#2A3B2E] mb-4">
                        Escolha o Estilo do<br />
                        <span className="italic text-[#C19B58]">Seu Casamento</span>
                    </h1>
                    <p className="text-lg text-[#6B7A6C] max-w-2xl mx-auto">
                        Cada template foi cuidadosamente desenhado para diferentes estilos de casamento.
                        Escolha o seu favorito e nossa equipe fará a mágica acontecer.
                    </p>
                </motion.div>
            </section>

            {/* Filter Bar */}
            <section className="px-6 pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 overflow-x-auto pb-2">
                        <div className="flex items-center gap-2 text-[#6B7A6C]">
                            <Filter className="w-4 h-4" />
                            <span className="text-sm font-medium whitespace-nowrap">Filtrar:</span>
                        </div>
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === category
                                        ? 'bg-[#2A3B2E] text-white'
                                        : 'bg-white text-[#6B7A6C] hover:bg-[#E8DFD3]'
                                    }`}
                            >
                                {category === 'Todos' ? 'Todos' : category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Templates Grid */}
            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTemplates.map((template: TemplateExample) => (
                            <TemplateCard
                                key={template.id}
                                id={template.id}
                                label={template.label}
                                description={template.description}
                                category={template.category}
                                colors={template.colors}
                                onSelect={handleSelectTemplate}
                            />
                        ))}
                    </div>

                    {filteredTemplates.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-[#6B7A6C]">Nenhum template encontrado nesta categoria.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6 bg-[#2A3B2E] text-white text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] mb-4">
                        Não encontrou o que procura?
                    </h2>
                    <p className="text-white/70 mb-8">
                        Nossa equipe pode criar um design completamente personalizado para você.
                        Fale conosco e vamos transformar sua visão em realidade.
                    </p>
                    <button
                        onClick={() => {
                            setSelectedTemplate(undefined);
                            setIsModalOpen(true);
                        }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#C19B58] text-white rounded-xl font-medium hover:bg-[#b08d4b] transition-colors shadow-lg"
                    >
                        <Sparkles className="w-5 h-5" />
                        Quero um Design Exclusivo
                    </button>
                </motion.div>
            </section>

            {/* Lead Capture Modal */}
            <LeadCaptureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedTemplate={selectedTemplate}
            />
        </main>
    );
}
