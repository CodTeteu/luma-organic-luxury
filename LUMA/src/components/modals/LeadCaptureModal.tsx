'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Calendar, MapPin, Phone, Heart, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedTemplate?: string;
}

interface FormData {
    brideName: string;
    groomName: string;
    weddingDate: string;
    city: string;
    whatsapp: string;
    guestCount: string;
    howDidYouFindUs: string;
}

const GUEST_COUNT_OPTIONS = [
    "Até 50 convidados",
    "50 a 100 convidados",
    "100 a 200 convidados",
    "200 a 300 convidados",
    "Mais de 300 convidados",
    "Ainda não sei"
];

const HOW_FOUND_OPTIONS = [
    "Instagram",
    "Google",
    "Indicação de amigo(a)",
    "Pinterest",
    "Outro"
];

export function LeadCaptureModal({ isOpen, onClose, selectedTemplate }: LeadCaptureModalProps) {
    const [formData, setFormData] = useState<FormData>({
        brideName: '',
        groomName: '',
        weddingDate: '',
        city: '',
        whatsapp: '',
        guestCount: '',
        howDidYouFindUs: ''
    });
    const [step, setStep] = useState(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const formatWhatsAppNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 2) return numbers;
        if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    };

    const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatWhatsAppNumber(e.target.value);
        setFormData(prev => ({ ...prev, whatsapp: formatted }));
    };

    const isStep1Valid = formData.brideName && formData.groomName;
    const isStep2Valid = formData.weddingDate && formData.city;
    const isStep3Valid = formData.whatsapp.replace(/\D/g, '').length >= 10;

    const handleSubmit = () => {
        const cleanPhone = formData.whatsapp.replace(/\D/g, '');

        const message = `🌿 *Novo Lead LUMA* 🌿

👰 *Noiva:* ${formData.brideName}
🤵 *Noivo:* ${formData.groomName}
📅 *Data:* ${formData.weddingDate}
📍 *Cidade:* ${formData.city}
👥 *Convidados:* ${formData.guestCount || 'Não informado'}
💒 *Template:* ${selectedTemplate || 'Não selecionado'}
📲 *WhatsApp:* ${formData.whatsapp}
🔍 *Como conheceu:* ${formData.howDidYouFindUs || 'Não informado'}

_Lead gerado automaticamente pelo site LUMA_`;

        const whatsappUrl = siteConfig.contact.whatsapp.getUrl(message);
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <Heart className="w-12 h-12 mx-auto text-[#C19B58] mb-4" />
                            <h3 className="text-2xl font-[family-name:var(--font-playfair)] text-[#2A3B2E]">
                                Quem são os noivos?
                            </h3>
                            <p className="text-[#6B7A6C] mt-2">Conte-nos sobre vocês</p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C19B58]" />
                                <input
                                    type="text"
                                    name="brideName"
                                    value={formData.brideName}
                                    onChange={handleChange}
                                    placeholder="Nome da Noiva"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#E8DFD3] focus:border-[#C19B58] focus:ring-2 focus:ring-[#C19B58]/20 outline-none transition-all bg-white text-[#2A3B2E]"
                                />
                            </div>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C19B58]" />
                                <input
                                    type="text"
                                    name="groomName"
                                    value={formData.groomName}
                                    onChange={handleChange}
                                    placeholder="Nome do Noivo"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#E8DFD3] focus:border-[#C19B58] focus:ring-2 focus:ring-[#C19B58]/20 outline-none transition-all bg-white text-[#2A3B2E]"
                                />
                            </div>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <Calendar className="w-12 h-12 mx-auto text-[#C19B58] mb-4" />
                            <h3 className="text-2xl font-[family-name:var(--font-playfair)] text-[#2A3B2E]">
                                Sobre o casamento
                            </h3>
                            <p className="text-[#6B7A6C] mt-2">Quando e onde será o grande dia?</p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C19B58]" />
                                <input
                                    type="date"
                                    name="weddingDate"
                                    value={formData.weddingDate}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#E8DFD3] focus:border-[#C19B58] focus:ring-2 focus:ring-[#C19B58]/20 outline-none transition-all bg-white text-[#2A3B2E]"
                                />
                            </div>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C19B58]" />
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Cidade do casamento"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#E8DFD3] focus:border-[#C19B58] focus:ring-2 focus:ring-[#C19B58]/20 outline-none transition-all bg-white text-[#2A3B2E]"
                                />
                            </div>
                            <select
                                name="guestCount"
                                value={formData.guestCount}
                                onChange={handleChange}
                                className="w-full px-4 py-4 rounded-xl border border-[#E8DFD3] focus:border-[#C19B58] focus:ring-2 focus:ring-[#C19B58]/20 outline-none transition-all bg-white text-[#2A3B2E]"
                            >
                                <option value="">Quantidade de convidados</option>
                                {GUEST_COUNT_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <Phone className="w-12 h-12 mx-auto text-[#C19B58] mb-4" />
                            <h3 className="text-2xl font-[family-name:var(--font-playfair)] text-[#2A3B2E]">
                                Como te encontrar?
                            </h3>
                            <p className="text-[#6B7A6C] mt-2">Vamos conversar pelo WhatsApp</p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C19B58]" />
                                <input
                                    type="tel"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleWhatsAppChange}
                                    placeholder="(00) 00000-0000"
                                    maxLength={16}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#E8DFD3] focus:border-[#C19B58] focus:ring-2 focus:ring-[#C19B58]/20 outline-none transition-all bg-white text-[#2A3B2E]"
                                />
                            </div>
                            <select
                                name="howDidYouFindUs"
                                value={formData.howDidYouFindUs}
                                onChange={handleChange}
                                className="w-full px-4 py-4 rounded-xl border border-[#E8DFD3] focus:border-[#C19B58] focus:ring-2 focus:ring-[#C19B58]/20 outline-none transition-all bg-white text-[#2A3B2E]"
                            >
                                <option value="">Como nos conheceu?</option>
                                {HOW_FOUND_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>

                        {selectedTemplate && (
                            <div className="bg-[#F7F5F0] rounded-xl p-4 flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-[#C19B58]" />
                                <p className="text-sm text-[#6B7A6C]">
                                    Template selecionado: <strong className="text-[#2A3B2E]">{selectedTemplate}</strong>
                                </p>
                            </div>
                        )}
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#2A3B2E] to-[#3E4A3F] px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    {[1, 2, 3].map(s => (
                                        <div
                                            key={s}
                                            className={`w-2 h-2 rounded-full transition-colors ${s <= step ? 'bg-[#C19B58]' : 'bg-white/30'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-white/70 text-sm ml-2">Passo {step} de 3</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <AnimatePresence mode="wait">
                                {renderStep()}
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        <div className="px-6 pb-6 flex gap-3">
                            {step > 1 && (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className="flex-1 py-4 rounded-xl border border-[#E8DFD3] text-[#6B7A6C] hover:bg-[#F7F5F0] transition-colors font-medium"
                                >
                                    Voltar
                                </button>
                            )}
                            {step < 3 ? (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}
                                    className="flex-1 py-4 rounded-xl bg-[#C19B58] text-white font-medium hover:bg-[#b08d4b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Próximo
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isStep3Valid}
                                    className="flex-1 py-4 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#20BD5A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Falar no WhatsApp
                                </button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default LeadCaptureModal;
