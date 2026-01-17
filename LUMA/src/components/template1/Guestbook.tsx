"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Heart, X, Quote } from "lucide-react";
import { GuestbookMessage, generateRSVPId } from "@/types/template";
import { getSiteData, saveSiteData, dispatchUpdate } from "@/services/mockStorage";

interface GuestbookProps {
    coupleName?: string;
}

export default function Guestbook({ coupleName = "os noivos" }: GuestbookProps) {
    const [messages, setMessages] = useState<GuestbookMessage[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const data = getSiteData();
        setMessages(data.guestbook?.messages || []);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !text.trim()) return;

        setIsSubmitting(true);

        const newMessage: GuestbookMessage = {
            id: generateRSVPId(),
            name: name.trim(),
            text: text.trim(),
            createdAt: new Date().toISOString(),
        };

        const data = getSiteData();
        const updatedMessages = [...(data.guestbook?.messages || []), newMessage];
        saveSiteData({
            ...data,
            guestbook: {
                ...data.guestbook,
                isVisible: true,
                messages: updatedMessages,
            },
        });
        dispatchUpdate();

        setMessages(updatedMessages);
        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
            setIsModalOpen(false);
            setIsSubmitted(false);
            setName("");
            setText("");
        }, 2000);
    };

    return (
        <section id="guestbook" className="relative overflow-hidden py-20">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-cream to-stone-100">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-olive-500 tracking-[0.2em] text-sm uppercase font-medium">
                        Deixe sua mensagem
                    </span>
                    <h2 className="text-5xl md:text-6xl text-stone-800 font-script mt-4">
                        Mural de Recados
                    </h2>
                    <p className="text-stone-500 font-light mt-4 max-w-lg mx-auto">
                        Compartilhe seus votos de felicidade para {coupleName}
                    </p>
                </motion.div>

                {/* Messages Grid */}
                {messages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {messages.map((msg, index) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-olive-100 shadow-sm relative group"
                            >
                                <Quote size={24} className="text-olive-200 absolute top-4 right-4" />
                                <p className="text-stone-600 font-light mb-4 relative z-10">
                                    &ldquo;{msg.text}&rdquo;
                                </p>
                                <div className="flex items-center gap-2">
                                    <Heart size={14} className="text-olive-500" fill="currentColor" />
                                    <span className="text-sm font-medium text-stone-800">{msg.name}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 bg-white/50 rounded-xl border border-olive-100 mb-12"
                    >
                        <MessageCircle size={48} className="text-olive-200 mx-auto mb-4" />
                        <p className="text-stone-500">Seja o primeiro a deixar um recado!</p>
                    </motion.div>
                )}

                {/* Add Message Button */}
                <div className="text-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-4 bg-olive-600 text-white uppercase tracking-widest text-xs font-medium rounded-sm hover:bg-olive-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-3"
                    >
                        <MessageCircle size={16} />
                        Deixar um Recado
                    </button>
                </div>
            </div>

            {/* Message Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-cream rounded-2xl shadow-2xl z-50 overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="bg-olive-600 text-white p-6 relative">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                                <div className="flex items-center gap-3">
                                    <Heart size={24} className="text-olive-200" />
                                    <div>
                                        <h3 className="text-xl font-medium font-[family-name:var(--font-heading)]">
                                            Deixe seu Recado
                                        </h3>
                                        <p className="text-olive-200 text-sm">
                                            Para {coupleName}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Form */}
                            {isSubmitted ? (
                                <div className="p-8 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-16 h-16 rounded-full bg-olive-100 flex items-center justify-center mx-auto mb-4"
                                    >
                                        <Heart size={32} className="text-olive-600" fill="currentColor" />
                                    </motion.div>
                                    <h4 className="text-xl font-medium text-stone-800 mb-2">
                                        Obrigado!
                                    </h4>
                                    <p className="text-stone-500">
                                        Sua mensagem foi enviada com carinho.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-2">
                                            Seu Nome
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Como você quer ser identificado?"
                                            className="w-full px-4 py-3 border border-olive-200 rounded-lg text-sm focus:border-olive-500 focus:outline-none bg-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-2">
                                            Mensagem
                                        </label>
                                        <textarea
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="Escreva seus votos de felicidade..."
                                            rows={4}
                                            className="w-full px-4 py-3 border border-olive-200 rounded-lg text-sm focus:border-olive-500 focus:outline-none bg-white resize-none"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !name.trim() || !text.trim()}
                                        className="w-full py-4 bg-olive-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-olive-700 transition-colors disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                Enviar Recado
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
