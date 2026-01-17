"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Copy, Check, ExternalLink, ShoppingBag, Plus, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { TemplateData, GiftItem } from '@/types/template';
import CheckoutModal from '@/components/checkout/CheckoutModal';

interface GiftsProps {
    data?: TemplateData;
}

const Gifts = ({ data }: GiftsProps) => {
    const [copied, setCopied] = useState(false);
    const { addToCart, itemCount, setIsOpen } = useCart();
    const [addedItem, setAddedItem] = useState<string | null>(null);

    const isPremium = data?.config?.plan === 'premium';
    const pixKey = data?.gifts?.pixKey || "ana.pedro@email.com";
    const whatsappNumber = data?.config?.whatsappNumber;
    const coupleName = data ? `${data.brideName} & ${data.groomName}` : "os noivos";
    const giftItems = data?.gifts?.items || [];

    const handleCopy = () => {
        navigator.clipboard.writeText(pixKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleAddToCart = (item: GiftItem) => {
        addToCart(item);
        setAddedItem(item.id);
        setTimeout(() => setAddedItem(null), 1500);
    };

    return (
        <>
            <section id="gifts" className="relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-cream">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30"></div>
                </div>

                <div className="section-padding relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <span className="text-olive-500 tracking-[0.2em] text-sm uppercase font-medium">Carinho & Gratidão</span>
                            <h2 className="text-5xl md:text-6xl text-stone-800 font-script mt-4">Lista de Presentes</h2>
                            <p className="text-stone-500 font-light mt-4 max-w-lg mx-auto">
                                Sua presença é nosso maior presente. Se desejar nos presentear de outra forma, ficaremos imensamente gratos.
                            </p>
                        </motion.div>

                        {/* Premium Mode: Gift Grid with Cart */}
                        {isPremium && giftItems.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mb-12"
                            >
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {giftItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-white rounded-xl overflow-hidden border border-olive-100 shadow-sm hover:shadow-lg transition-shadow group"
                                        >
                                            {/* Gift Image/Placeholder */}
                                            <div className="aspect-square bg-gradient-to-br from-olive-50 to-olive-100 flex items-center justify-center relative overflow-hidden">
                                                <span className="text-4xl">🎁</span>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>

                                            {/* Gift Info */}
                                            <div className="p-4">
                                                <h3 className="font-medium text-stone-800 text-sm truncate">{item.name}</h3>
                                                <p className="text-olive-600 font-semibold mt-1">
                                                    R$ {item.price.toLocaleString('pt-BR')}
                                                </p>

                                                {/* Add to Cart Button */}
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className={`mt-3 w-full py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 ${addedItem === item.id
                                                            ? 'bg-olive-600 text-white'
                                                            : 'bg-olive-50 text-olive-700 hover:bg-olive-100'
                                                        }`}
                                                >
                                                    {addedItem === item.id ? (
                                                        <>
                                                            <Check size={14} />
                                                            Adicionado!
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Plus size={14} />
                                                            Adicionar
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Two Cols: Link & PIX */}
                        <div className="grid md:grid-cols-2 gap-8 items-stretch">
                            {/* Gift List Link Card - Only show if NOT premium or no items */}
                            {(!isPremium || giftItems.length === 0) && (
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-10 rounded-sm shadow-xl border border-olive-100 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300"
                                >
                                    <div className="w-16 h-16 bg-olive-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-olive-100 transition-colors">
                                        <ExternalLink size={32} className="text-olive-600" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-stone-800 mb-4">Lista de Presentes</h3>
                                    <p className="text-stone-500 font-light mb-8">
                                        Confira nossa lista de sugestões de presentes virtuais para nossa lua de mel e casa nova.
                                    </p>
                                    <Link
                                        href="/preview/template1/presentes"
                                        className="px-8 py-4 bg-olive-600 text-white uppercase tracking-widest text-xs font-medium rounded-sm hover:bg-olive-700 transition-colors shadow-lg hover:shadow-xl w-full md:w-auto"
                                    >
                                        Ver Lista Completa
                                    </Link>
                                </motion.div>
                            )}

                            {/* PIX Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={`bg-white p-10 rounded-sm shadow-xl border border-olive-100 text-center relative overflow-hidden flex flex-col justify-center ${isPremium && giftItems.length > 0 ? 'md:col-span-2' : ''}`}
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-olive-300 via-olive-500 to-olive-300"></div>

                                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-olive-50 flex items-center justify-center">
                                    <Gift size={32} className="text-olive-600" />
                                </div>

                                <h3 className="text-2xl font-script text-stone-800 mb-2">Chave PIX</h3>
                                <p className="text-stone-400 text-sm mb-6">Para transferências diretas</p>

                                <button
                                    onClick={handleCopy}
                                    className="w-full max-w-md mx-auto flex items-center justify-between bg-stone-50 p-4 rounded-sm border border-olive-100 hover:border-olive-300 hover:bg-olive-50/50 transition-all duration-300 group"
                                >
                                    <code className="text-stone-600 font-mono text-sm md:text-base tracking-wider truncate px-2">{pixKey}</code>
                                    <div className={`p-2 rounded-full transition-colors flex-shrink-0 ${copied ? 'bg-olive-100 text-olive-600' : 'text-stone-400 group-hover:text-olive-500'}`}>
                                        {copied ? <Check size={20} /> : <Copy size={20} />}
                                    </div>
                                </button>

                                {copied && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-olive-600 text-sm mt-4 font-medium"
                                    >
                                        ✓ Chave copiada!
                                    </motion.p>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating Cart Button (Premium Only) */}
            <AnimatePresence>
                {isPremium && itemCount > 0 && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-olive-600 to-olive-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow"
                    >
                        <ShoppingBag size={24} />
                        <span className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {itemCount}
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Checkout Modal */}
            {isPremium && (
                <CheckoutModal
                    whatsappNumber={whatsappNumber}
                    coupleName={coupleName}
                />
            )}

            {/* Premium Upsell Badge (Free Only) */}
            {!isPremium && (
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-t border-b border-amber-200 py-4">
                    <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-3 text-center">
                        <Sparkles size={18} className="text-amber-600" />
                        <p className="text-sm text-amber-800">
                            <strong>Plano Premium:</strong> Habilite o carrinho de compras e receba presentes diretamente pelo WhatsApp!
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Gifts;
