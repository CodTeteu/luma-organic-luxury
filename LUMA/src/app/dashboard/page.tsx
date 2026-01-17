"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Calendar,
    Users,
    Gift,
    Edit3,
    ExternalLink,
    CheckCircle2,
    Circle,
    ArrowRight,
    TrendingUp,
    RefreshCw,
    AlertCircle,
    Sparkles,
    Eye,
    Crown
} from "lucide-react";
import { getGuestStats, getFinancialSummary, getSiteData, getGuestList } from "@/services/mockStorage";
import OnboardingModal from "@/components/dashboard/OnboardingModal";
import LockedCard from "@/components/dashboard/LockedCard";
import { isSiteComplete, TemplateData } from "@/types/template";

export default function DashboardOverview() {
    const [guestStats, setGuestStats] = useState({ total: 0, confirmed: 0, pending: 0, totalAdults: 0, totalChildren: 0 });
    const [financial, setFinancial] = useState({ totalBalance: 0, transactionCount: 0, averageGift: 0, recentTransactions: [] as { id: string; senderName: string; giftName: string; amount: number; createdAt: string }[] });
    const [siteData, setSiteData] = useState<Partial<TemplateData>>({ brideName: "", groomName: "", date: "", config: { slug: "", theme: "olive", isPasswordProtected: false, plan: "free" } });
    const [recentGuests, setRecentGuests] = useState<{ id: string; name: string; isAttending: boolean; guests: number; message: string; createdAt: string }[]>([]);
    const [showSlugAlert, setShowSlugAlert] = useState(false);

    // Days until wedding calculation
    const calculateDaysUntil = (dateString: string | undefined) => {
        if (!dateString) return 0;
        const weddingDate = new Date(dateString);
        const today = new Date();
        return Math.max(0, Math.ceil((weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    };

    // Load data from storage
    const loadData = useCallback(() => {
        const stats = getGuestStats();
        const fin = getFinancialSummary();
        const site = getSiteData();
        const guests = getGuestList().slice(-4).reverse();

        setGuestStats(stats);
        setFinancial(fin);
        setSiteData(site);
        setRecentGuests(guests);

        // Check if slug is configured
        setShowSlugAlert(isSiteComplete(site) && !site.config?.slug);
    }, []);

    useEffect(() => {
        loadData();

        // Listen for storage updates
        const handleStorageUpdate = () => loadData();
        window.addEventListener("luma-storage-update", handleStorageUpdate);

        return () => window.removeEventListener("luma-storage-update", handleStorageUpdate);
    }, [loadData]);

    const daysUntilWedding = calculateDaysUntil(siteData.date);

    const stats = [
        {
            label: "Dias para o Grande Dia",
            value: daysUntilWedding.toString(),
            icon: Calendar,
            color: "text-[#C19B58]",
            bgColor: "bg-[#C19B58]/10"
        },
        {
            label: "Convidados Confirmados",
            value: guestStats.confirmed.toString(),
            subValue: `de ${guestStats.total}`,
            icon: Users,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50"
        },
        {
            label: "Total em Presentes",
            value: `R$ ${financial.totalBalance.toLocaleString('pt-BR')}`,
            icon: Gift,
            color: "text-[#2A3B2E]",
            bgColor: "bg-[#2A3B2E]/5"
        },
    ];

    const checklist = [
        { id: 1, label: "Preencher briefing inicial", done: true },
        { id: 2, label: "Editar foto de capa do site", done: true },
        { id: 3, label: "Cadastrar presentes na lista", done: financial.transactionCount > 0 || guestStats.total > 0 },
        { id: 4, label: "Adicionar endereço da cerimônia", done: true },
        { id: 5, label: "Receber o primeiro convidado", done: guestStats.confirmed > 0 },
    ];

    const completedTasks = checklist.filter(item => item.done).length;
    const progressPercentage = Math.round((completedTasks / checklist.length) * 100);

    return (
        <>
            {/* Onboarding Modal - Shows when site is not configured */}
            <OnboardingModal onComplete={loadData} />

            <div className="space-y-8">
                {/* Slug Alert */}
                {showSlugAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg"
                    >
                        <AlertCircle size={20} className="text-amber-600 flex-shrink-0" />
                        <p className="text-sm text-amber-800">
                            Configure seu <strong>link personalizado</strong> em{" "}
                            <Link href="/editor/template1" className="underline hover:text-amber-900">
                                Editar Site → Aparência
                            </Link>
                        </p>
                    </motion.div>
                )}

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl md:text-3xl font-medium text-[#2A3B2E] font-[family-name:var(--font-heading)]">
                                Olá, {siteData.brideName || "Noiva"} & {siteData.groomName || "Noivo"}
                            </h1>
                            {/* Plan Badge */}
                            {siteData.config?.plan === 'premium' ? (
                                <span className="px-3 py-1 bg-gradient-to-r from-[#C19B58] to-[#A07D3A] text-white text-xs font-bold rounded-full flex items-center gap-1.5">
                                    <Crown size={12} />
                                    Premium
                                </span>
                            ) : (
                                <span className="px-3 py-1 bg-[#E5E0D6] text-[#6B7A6C] text-xs font-medium rounded-full">
                                    Plano Grátis
                                </span>
                            )}
                        </div>
                        <p className="text-[#6B7A6C]">
                            Bem-vindos ao painel do seu casamento.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={loadData}
                            className="flex items-center gap-2 px-3 py-2.5 border border-[#DCD3C5] text-[#6B7A6C] text-sm rounded-lg hover:bg-[#E5E0D6] transition-colors"
                            title="Atualizar dados"
                        >
                            <RefreshCw size={16} />
                        </button>
                        <Link
                            href="/preview/template1"
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2.5 border border-[#DCD3C5] text-[#3E4A3F] text-sm font-medium rounded-lg hover:border-[#C19B58] hover:text-[#C19B58] transition-colors"
                        >
                            <ExternalLink size={16} />
                            Ver Site
                        </Link>
                        <Link
                            href="/editor/template1"
                            className="flex items-center gap-2 px-4 py-2.5 bg-[#2A3B2E] text-[#F7F5F0] text-sm font-medium rounded-lg hover:bg-[#1a261d] transition-colors shadow-lg shadow-[#2A3B2E]/10"
                        >
                            <Edit3 size={16} />
                            Editar Site
                        </Link>
                    </div>
                </header>

                {/* Stats Cards */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-[#DCD3C5] hover:border-[#C19B58] transition-colors shadow-sm"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-[#6B7A6C] text-xs uppercase tracking-wider mb-2">
                                            {stat.label}
                                        </p>
                                        <p className="text-3xl font-medium text-[#2A3B2E] font-[family-name:var(--font-heading)]">
                                            {stat.value}
                                            {stat.subValue && (
                                                <span className="text-base text-[#6B7A6C] font-normal ml-1">
                                                    {stat.subValue}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                        <Icon size={20} className={stat.color} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </section>

                {/* Locked Metric Card for Free Plan */}
                {siteData.config?.plan !== 'premium' && (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <LockedCard
                            title="Visitantes Únicos"
                            value="127"
                            icon={<Eye size={20} />}
                            description="Veja quem visitou seu site"
                            ctaText="Desbloquear Métricas"
                            onUpgrade={() => alert('Upgrade modal here')}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-[#2A3B2E] to-[#1a261d] rounded-2xl p-6 text-white relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-5"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles size={20} className="text-[#C19B58]" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#C19B58]">Plano Premium</span>
                                </div>
                                <h3 className="text-xl font-medium font-[family-name:var(--font-heading)] mb-2">
                                    Receba 3x mais presentes
                                </h3>
                                <p className="text-white/70 text-sm mb-4">
                                    Habilite o carrinho de compras com checkout via WhatsApp e aumente suas conversões.
                                </p>
                                <button className="px-4 py-2.5 bg-[#C19B58] hover:bg-[#A07D3A] text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors">
                                    <Crown size={14} />
                                    Fazer Upgrade
                                </button>
                            </div>
                        </motion.div>
                    </section>
                )}

                {/* Progress & Activity Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Progress Checklist */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#DCD3C5] p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-medium text-[#2A3B2E] font-[family-name:var(--font-heading)]">
                                    Preparativos
                                </h2>
                                <p className="text-sm text-[#6B7A6C]">
                                    {completedTasks} de {checklist.length} tarefas concluídas
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp size={16} className="text-[#C19B58]" />
                                <span className="text-sm font-bold text-[#C19B58]">{progressPercentage}%</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-[#E5E0D6] rounded-full mb-6 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-[#C19B58] to-[#D4B56A] rounded-full"
                            />
                        </div>

                        {/* Checklist Items */}
                        <div className="space-y-3">
                            {checklist.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${item.done ? 'bg-emerald-50/50' : 'hover:bg-[#F7F5F0]'
                                        }`}
                                >
                                    {item.done ? (
                                        <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                                    ) : (
                                        <Circle size={20} className="text-[#DCD3C5] flex-shrink-0" />
                                    )}
                                    <span className={`text-sm ${item.done ? 'text-[#6B7A6C] line-through' : 'text-[#2A3B2E]'}`}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#DCD3C5] p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-medium text-[#2A3B2E] font-[family-name:var(--font-heading)]">
                                Atividade Recente
                            </h2>
                            <Link
                                href="/dashboard/guests"
                                className="text-sm text-[#C19B58] hover:underline flex items-center gap-1"
                            >
                                Ver todos <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recentGuests.length === 0 && financial.recentTransactions.length === 0 && (
                                <p className="text-sm text-[#6B7A6C] text-center py-8">
                                    Nenhuma atividade ainda. Compartilhe seu site!
                                </p>
                            )}

                            {recentGuests.map((guest) => (
                                <div key={guest.id} className="flex items-start gap-3 pb-4 border-b border-[#DCD3C5]/50 last:border-0 last:pb-0">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-100 text-emerald-600">
                                        <Users size={14} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-[#2A3B2E]">
                                            <span className="font-medium">{guest.name}</span>
                                            {" "}{guest.isAttending ? `confirmou presença (+${guest.guests - 1} acompanhante${guest.guests > 2 ? 's' : ''})` : 'não poderá comparecer'}
                                        </p>
                                        <p className="text-xs text-[#6B7A6C] mt-0.5">
                                            {new Date(guest.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {financial.recentTransactions.map((tx) => (
                                <div key={tx.id} className="flex items-start gap-3 pb-4 border-b border-[#DCD3C5]/50 last:border-0 last:pb-0">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#C19B58]/10 text-[#C19B58]">
                                        <Gift size={14} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-[#2A3B2E]">
                                            <span className="font-medium">{tx.senderName}</span>
                                            {" "}enviou R$ {tx.amount}
                                        </p>
                                        <p className="text-xs text-[#6B7A6C] mt-0.5">{tx.giftName}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
