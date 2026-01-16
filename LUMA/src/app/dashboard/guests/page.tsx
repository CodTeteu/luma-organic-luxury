"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Download,
    Users,
    UserCheck,
    Clock,
    Baby,
    MessageSquare,
    Filter,
    RefreshCw
} from "lucide-react";
import { getGuestList, getGuestStats } from "@/services/mockStorage";
import { RSVPGuest } from "@/types/template";

export default function GuestsPage() {
    const [guests, setGuests] = useState<RSVPGuest[]>([]);
    const [stats, setStats] = useState({ total: 0, confirmed: 0, pending: 0, totalAdults: 0, totalChildren: 0 });
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "confirmed" | "pending">("all");

    const loadData = () => {
        const guestList = getGuestList();
        const guestStats = getGuestStats();
        setGuests(guestList);
        setStats(guestStats);
    };

    useEffect(() => {
        loadData();

        // Listen for storage updates
        const handleStorageUpdate = () => loadData();
        window.addEventListener("luma-storage-update", handleStorageUpdate);

        return () => window.removeEventListener("luma-storage-update", handleStorageUpdate);
    }, []);

    const filteredGuests = guests.filter(guest => {
        const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" ||
            (filterStatus === "confirmed" && guest.isAttending) ||
            (filterStatus === "pending" && !guest.isAttending);
        return matchesSearch && matchesFilter;
    });

    const handleExportCSV = () => {
        const headers = ["Nome", "Telefone", "Status", "Adultos", "Crianças", "Mensagem", "Data"];
        const rows = guests.map(g => [
            g.name,
            g.phone,
            g.isAttending ? "Confirmado" : "Pendente",
            g.guests.toString(),
            g.children === "sim" ? "Sim" : "Não",
            g.message,
            new Date(g.createdAt).toLocaleDateString('pt-BR')
        ]);

        const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "convidados-casamento.csv";
        a.click();
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-medium text-[#2A3B2E] font-[family-name:var(--font-heading)]">
                        Convidados
                    </h1>
                    <p className="text-[#6B7A6C] mt-1">
                        Gerencie a lista de presença do seu casamento.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={loadData}
                        className="flex items-center gap-2 px-3 py-2.5 border border-[#DCD3C5] text-[#6B7A6C] text-sm rounded-lg hover:bg-[#E5E0D6] transition-colors"
                        title="Atualizar dados"
                    >
                        <RefreshCw size={16} />
                    </button>
                    <button
                        onClick={handleExportCSV}
                        disabled={guests.length === 0}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#2A3B2E] text-[#F7F5F0] text-sm font-medium rounded-lg hover:bg-[#1a261d] transition-colors shadow-lg shadow-[#2A3B2E]/10 disabled:opacity-50"
                    >
                        <Download size={16} />
                        Exportar CSV
                    </button>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 p-4 rounded-xl border border-[#DCD3C5]"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#2A3B2E]/5">
                            <Users size={18} className="text-[#2A3B2E]" />
                        </div>
                        <div>
                            <p className="text-2xl font-medium text-[#2A3B2E]">{stats.total}</p>
                            <p className="text-[10px] text-[#6B7A6C] uppercase tracking-wider">Total</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/80 p-4 rounded-xl border border-[#DCD3C5]"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-50">
                            <UserCheck size={18} className="text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-medium text-[#2A3B2E]">{stats.confirmed}</p>
                            <p className="text-[10px] text-[#6B7A6C] uppercase tracking-wider">Confirmados</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/80 p-4 rounded-xl border border-[#DCD3C5]"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-50">
                            <Clock size={18} className="text-amber-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-medium text-[#2A3B2E]">{stats.pending}</p>
                            <p className="text-[10px] text-[#6B7A6C] uppercase tracking-wider">Pendentes</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/80 p-4 rounded-xl border border-[#DCD3C5]"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#C19B58]/10">
                            <Baby size={18} className="text-[#C19B58]" />
                        </div>
                        <div>
                            <p className="text-2xl font-medium text-[#2A3B2E]">{stats.totalAdults}</p>
                            <p className="text-[10px] text-[#6B7A6C] uppercase tracking-wider">Pessoas no Total</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7A6C]" />
                    <input
                        type="text"
                        placeholder="Buscar por nome..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-[#DCD3C5] rounded-lg text-sm focus:border-[#C19B58] focus:outline-none bg-white text-[#2A3B2E]"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter size={16} className="text-[#6B7A6C]" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                        className="px-4 py-2.5 border border-[#DCD3C5] rounded-lg text-sm focus:border-[#C19B58] focus:outline-none bg-white text-[#2A3B2E]"
                    >
                        <option value="all">Todos</option>
                        <option value="confirmed">Confirmados</option>
                        <option value="pending">Pendentes</option>
                    </select>
                </div>
            </div>

            {/* Data Table */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#DCD3C5] overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#F7F5F0] border-b border-[#DCD3C5]">
                            <tr>
                                <th className="text-left px-6 py-4 text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">Nome</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">Telefone</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">Status</th>
                                <th className="text-center px-6 py-4 text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">Pessoas</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">Mensagem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DCD3C5]/50">
                            {filteredGuests.map((guest) => (
                                <tr key={guest.id} className="hover:bg-[#F7F5F0]/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-[#2A3B2E]">{guest.name}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-[#6B7A6C]">{guest.phone}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${guest.isAttending
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-amber-100 text-amber-700"
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${guest.isAttending ? "bg-emerald-500" : "bg-amber-500"
                                                }`} />
                                            {guest.isAttending ? "Confirmado" : "Não comparecerá"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm text-[#3E4A3F]">{guest.guests}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {guest.message ? (
                                            <div className="flex items-center gap-2 max-w-xs">
                                                <MessageSquare size={14} className="text-[#C19B58] flex-shrink-0" />
                                                <span className="text-sm text-[#6B7A6C] truncate">{guest.message}</span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-[#DCD3C5]">—</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredGuests.length === 0 && (
                    <div className="p-12 text-center">
                        <Users size={40} className="mx-auto text-[#DCD3C5] mb-4" />
                        <p className="text-[#6B7A6C]">
                            {guests.length === 0
                                ? "Nenhum convidado confirmou ainda."
                                : "Nenhum convidado encontrado com esse filtro."}
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
