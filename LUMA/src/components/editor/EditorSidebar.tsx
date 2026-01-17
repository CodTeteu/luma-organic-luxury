"use client";

import { useState, useRef } from "react";
import {
    Lock, Palette, Type, Gift, Sparkles, ChevronDown, ChevronUp,
    MapPin, Heart, Home, Clock, Image as ImageIcon, Plus, Trash2, Eye, EyeOff, DollarSign, Link as LinkIcon, Check, Crown, Phone
} from "lucide-react";
import UpgradeModal from "./UpgradeModal";
import ImageCropModal from "./ImageCropModal";
import { Switch } from "@/components/ui/Switch";
import { showToast } from "@/components/ui/Toast";
import { TemplateData, GalleryImage, GiftItem, SiteTheme, themeColors, generateImageId, generateGiftId, generateSlug } from "@/types/template";
import { saveSiteData } from "@/services/mockStorage";

interface EditorSidebarProps {
    data: TemplateData;
    onChange: <K extends keyof TemplateData>(field: K, value: TemplateData[K]) => void;
}

// Type for nested objects in TemplateData
type NestedTemplateKeys = "couple" | "ceremony" | "reception" | "gallery" | "gifts";

export default function EditorSidebar({ data, onChange }: EditorSidebarProps) {
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [lockedFeature, setLockedFeature] = useState("");
    const [openSection, setOpenSection] = useState<string | null>("home");
    const [isSaving, setIsSaving] = useState(false);

    // Gift form state
    const [newGiftName, setNewGiftName] = useState("");
    const [newGiftPrice, setNewGiftPrice] = useState("");

    // Image crop state
    const [cropModal, setCropModal] = useState<{
        isOpen: boolean;
        imageUrl: string;
        aspectRatio: number;
        targetField: string;
    }>({ isOpen: false, imageUrl: "", aspectRatio: 16 / 9, targetField: "" });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const activeImageField = useRef<{ field: string; aspectRatio: number } | null>(null);

    // Progress Calculation (based on filled fields)
    const calculateProgress = () => {
        let filled = 0;
        let total = 6;

        if (data.groomName) filled++;
        if (data.brideName) filled++;
        if (data.date) filled++;
        if (data.couple?.description) filled++;
        if (data.ceremony?.locationName) filled++;
        if (data.gallery?.images?.length > 0) filled++;

        return Math.round((filled / total) * 100);
    };

    const progress = calculateProgress();

    const handleLockedClick = (feature: string) => {
        setLockedFeature(feature);
        setShowUpgrade(true);
    };

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    // Update nested field
    const updateNested = <T extends NestedTemplateKeys>(
        parent: T,
        child: string,
        value: unknown
    ) => {
        const currentParent = data[parent];
        onChange(parent, { ...currentParent, [child]: value } as TemplateData[T]);
    };

    // Toggle section visibility
    const toggleVisibility = <T extends NestedTemplateKeys>(section: T) => {
        const current = data[section];
        onChange(section, { ...current, isVisible: !current.isVisible } as TemplateData[T]);
    };

    // Send highlight message to iframe
    const sendHighlight = (field: string) => {
        window.parent.postMessage({ type: "HIGHLIGHT", field }, "*");
    };

    // Handle image selection
    const handleImageClick = (field: string, aspectRatio: number = 16 / 9) => {
        activeImageField.current = { field, aspectRatio };
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && activeImageField.current) {
            const imageUrl = URL.createObjectURL(file);
            setCropModal({
                isOpen: true,
                imageUrl,
                aspectRatio: activeImageField.current.aspectRatio,
                targetField: activeImageField.current.field,
            });
        }
        e.target.value = "";
    };

    const handleCropConfirm = (croppedImageUrl: string) => {
        const field = cropModal.targetField;

        if (field.includes(".")) {
            const [parent, child] = field.split(".") as [NestedTemplateKeys, string];
            updateNested(parent, child, croppedImageUrl);
        } else {
            onChange(field as keyof TemplateData, croppedImageUrl as TemplateData[keyof TemplateData]);
        }

        setCropModal({ isOpen: false, imageUrl: "", aspectRatio: 16 / 9, targetField: "" });
    };

    // Gallery management
    const addGalleryImage = (imageUrl: string) => {
        const newImage: GalleryImage = {
            id: generateImageId(),
            url: imageUrl,
        };
        const currentImages = data.gallery?.images || [];
        onChange("gallery", {
            ...data.gallery,
            images: [...currentImages, newImage]
        });
    };

    const removeGalleryImage = (id: string) => {
        const currentImages = data.gallery?.images || [];
        onChange("gallery", {
            ...data.gallery,
            images: currentImages.filter((img) => img.id !== id),
        });
    };

    // Gift management
    const addGift = () => {
        if (!newGiftName.trim() || !newGiftPrice) return;

        const newGift: GiftItem = {
            id: generateGiftId(),
            name: newGiftName.trim(),
            price: parseFloat(newGiftPrice),
            imageUrl: "",
            category: "Geral",
        };

        const currentItems = data.gifts?.items || [];
        onChange("gifts", {
            ...data.gifts,
            items: [...currentItems, newGift]
        });

        setNewGiftName("");
        setNewGiftPrice("");
        showToast("Presente adicionado!", "success");
    };

    const removeGift = (id: string) => {
        const currentItems = data.gifts?.items || [];
        onChange("gifts", {
            ...data.gifts,
            items: currentItems.filter((gift) => gift.id !== id),
        });
    };

    // Save handler
    const handleSave = async () => {
        setIsSaving(true);

        // Save to localStorage
        saveSiteData(data);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSaving(false);
        showToast("Site Salvo com Sucesso!", "success");
    };

    // Section header with visibility toggle
    const SectionHeader = ({
        id,
        icon: Icon,
        title,
        isVisible,
        onToggleVisibility
    }: {
        id: string;
        icon: React.ElementType;
        title: string;
        isVisible: boolean;
        onToggleVisibility: () => void;
    }) => (
        <button
            onClick={() => toggleSection(id)}
            className={`w-full flex items-center justify-between p-4 hover:bg-[#E5E0D6]/50 transition-colors ${openSection === id ? 'bg-[#E5E0D6]/50' : ''}`}
        >
            <div className="flex items-center gap-3">
                <Icon size={18} className="text-[#6B7A6C]" />
                <span className="font-medium text-[#2A3B2E]">{title}</span>
            </div>
            <div className="flex items-center gap-2">
                <div
                    onClick={(e) => { e.stopPropagation(); onToggleVisibility(); }}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/50 transition-colors"
                    title={isVisible ? "Ocultar seção" : "Mostrar seção"}
                >
                    {isVisible ? (
                        <Eye size={14} className="text-[#6B7A6C]" />
                    ) : (
                        <EyeOff size={14} className="text-[#C19B58]" />
                    )}
                    <Switch
                        checked={isVisible}
                        onChange={onToggleVisibility}
                        size="sm"
                    />
                </div>
                {openSection === id ? (
                    <ChevronUp size={16} className="text-[#6B7A6C]" />
                ) : (
                    <ChevronDown size={16} className="text-[#6B7A6C]" />
                )}
            </div>
        </button>
    );

    return (
        <>
            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />

            <div className="w-full h-full bg-[#F7F5F0] border-r border-[#DCD3C5] flex flex-col font-sans">

                {/* HEADER & PROGRESS */}
                <div className="p-6 border-b border-[#DCD3C5] bg-[#F7F5F0]">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-medium text-[#2A3B2E] font-[family-name:var(--font-heading)]">Editor do Site</h2>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#C19B58] bg-[#C19B58]/10 px-2 py-1 rounded-full">Plano Grátis</span>
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between text-xs font-medium text-[#6B7A6C] mb-1">
                            <span>Nível do Site</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#E5E0D6] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#C19B58] to-[#D4B56A] transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                        </div>
                        <button onClick={() => handleLockedClick("Acesso Completo")} className="text-[10px] text-[#C19B58] font-bold mt-2 hover:underline flex items-center gap-1 uppercase tracking-wide">
                            <Sparkles size={10} />
                            Desbloquear Premium
                        </button>
                    </div>
                </div>

                {/* SECTIONS */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">

                    {/* 1. HOME / INÍCIO */}
                    <div className="border-b border-[#DCD3C5]/50">
                        <button
                            onClick={() => toggleSection("home")}
                            className={`w-full flex items-center justify-between p-4 hover:bg-[#E5E0D6]/50 transition-colors ${openSection === 'home' ? 'bg-[#E5E0D6]/50' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <Home size={18} className="text-[#6B7A6C]" />
                                <span className="font-medium text-[#2A3B2E]">Capa & Início</span>
                            </div>
                            {openSection === 'home' ? <ChevronUp size={16} className="text-[#6B7A6C]" /> : <ChevronDown size={16} className="text-[#6B7A6C]" />}
                        </button>

                        {openSection === 'home' && (
                            <div className="p-4 space-y-4 bg-white/50 animate-in slide-in-from-top-2 duration-200">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">Nome do Noivo</label>
                                    <input
                                        type="text"
                                        value={data.groomName}
                                        onChange={(e) => onChange("groomName", e.target.value)}
                                        onFocus={() => sendHighlight("groomName")}
                                        className="w-full px-3 py-2 text-sm border border-[#DCD3C5] rounded-lg focus:border-[#C19B58] focus:outline-none bg-white text-[#3E4A3F]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">Nome da Noiva</label>
                                    <input
                                        type="text"
                                        value={data.brideName}
                                        onChange={(e) => onChange("brideName", e.target.value)}
                                        onFocus={() => sendHighlight("brideName")}
                                        className="w-full px-3 py-2 text-sm border border-[#DCD3C5] rounded-lg focus:border-[#C19B58] focus:outline-none bg-white text-[#3E4A3F]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">Data</label>
                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => onChange("date", e.target.value)}
                                        onFocus={() => sendHighlight("date")}
                                        className="w-full px-3 py-2 text-sm border border-[#DCD3C5] rounded-lg focus:border-[#C19B58] focus:outline-none bg-white text-[#3E4A3F]"
                                    />
                                </div>

                                {/* Hero Image */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">Imagem de Capa</label>
                                    <button
                                        onClick={() => handleImageClick("heroImage", 16 / 9)}
                                        className="w-full h-24 rounded-lg border-2 border-dashed border-[#DCD3C5] hover:border-[#C19B58] transition-colors bg-cover bg-center flex items-center justify-center group"
                                        style={{ backgroundImage: data.heroImage ? `url(${data.heroImage})` : undefined }}
                                    >
                                        <div className="bg-black/50 group-hover:bg-black/70 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors">
                                            <ImageIcon size={14} />
                                            Trocar Imagem
                                        </div>
                                    </button>
                                </div>

                                {/* UPSELL: Fontes */}
                                <div onClick={() => handleLockedClick("Tipografia")} className="relative opacity-70 hover:opacity-100 transition-opacity cursor-pointer group border border-dashed border-[#DCD3C5] rounded-lg p-3 mt-4 bg-[#F7F5F0]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-[#6B7A6C] flex items-center gap-2"><Type size={12} /> Fontes</span>
                                        <Lock size={12} className="text-[#C19B58]" />
                                    </div>
                                    <div className="h-2 w-2/3 bg-[#E5E0D6] rounded mb-1"></div>
                                    <div className="h-2 w-1/2 bg-[#E5E0D6] rounded"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] bg-[#C19B58] text-white px-2 py-1 rounded shadow-sm font-bold">Mudar Tipografia</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 2. O CASAL */}
                    <div className="border-b border-[#DCD3C5]/50">
                        <SectionHeader
                            id="couple"
                            icon={Heart}
                            title="O Casal"
                            isVisible={data.couple?.isVisible ?? true}
                            onToggleVisibility={() => toggleVisibility("couple")}
                        />

                        {openSection === 'couple' && (
                            <div className="p-4 space-y-4 bg-white/50 animate-in slide-in-from-top-2 duration-200">
                                {/* Couple Image */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">Foto do Casal</label>
                                    <button
                                        onClick={() => handleImageClick("couple.image", 1)}
                                        className="w-full h-32 rounded-lg border-2 border-dashed border-[#DCD3C5] hover:border-[#C19B58] transition-colors bg-cover bg-center flex items-center justify-center group"
                                        style={{ backgroundImage: data.couple?.image ? `url(${data.couple.image})` : undefined }}
                                    >
                                        <div className="bg-black/50 group-hover:bg-black/70 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors">
                                            <ImageIcon size={14} />
                                            Trocar Foto
                                        </div>
                                    </button>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">História do Casal</label>
                                    <textarea
                                        rows={3}
                                        value={data.couple?.description || ""}
                                        onChange={(e) => updateNested("couple", "description", e.target.value)}
                                        onFocus={() => sendHighlight("couple.description")}
                                        className="w-full px-3 py-2 text-sm border border-[#DCD3C5] rounded-lg focus:border-[#C19B58] focus:outline-none bg-white text-[#3E4A3F] resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">Bio Noiva</label>
                                        <input
                                            type="text"
                                            value={data.couple?.brideBio || ""}
                                            onChange={(e) => updateNested("couple", "brideBio", e.target.value)}
                                            onFocus={() => sendHighlight("couple.brideBio")}
                                            className="w-full px-3 py-2 text-sm border border-[#DCD3C5] rounded-lg focus:border-[#C19B58] focus:outline-none bg-white text-[#3E4A3F]"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">Bio Noivo</label>
                                        <input
                                            type="text"
                                            value={data.couple?.groomBio || ""}
                                            onChange={(e) => updateNested("couple", "groomBio", e.target.value)}
                                            onFocus={() => sendHighlight("couple.groomBio")}
                                            className="w-full px-3 py-2 text-sm border border-[#DCD3C5] rounded-lg focus:border-[#C19B58] focus:outline-none bg-white text-[#3E4A3F]"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 3. GALERIA */}
                    <div className="border-b border-[#DCD3C5]/50">
                        <SectionHeader
                            id="gallery"
                            icon={ImageIcon}
                            title="Galeria"
                            isVisible={data.gallery?.isVisible ?? true}
                            onToggleVisibility={() => toggleVisibility("gallery")}
                        />

                        {openSection === 'gallery' && (
                            <div className="p-4 space-y-4 bg-white/50 animate-in slide-in-from-top-2 duration-200">
                                <div className="grid grid-cols-3 gap-2">
                                    {data.gallery?.images?.map((image) => (
                                        <div key={image.id} className="relative group aspect-square rounded-lg overflow-hidden">
                                            <div
                                                className="w-full h-full bg-cover bg-center"
                                                style={{ backgroundImage: `url(${image.url})` }}
                                            />
                                            <button
                                                onClick={() => removeGalleryImage(image.id)}
                                                className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center"
                                            >
                                                <Trash2
                                                    size={20}
                                                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Add Image Button */}
                                    <button
                                        onClick={() => {
                                            activeImageField.current = { field: "gallery.new", aspectRatio: 1 };
                                            fileInputRef.current?.click();
                                        }}
                                        className="aspect-square rounded-lg border-2 border-dashed border-[#DCD3C5] hover:border-[#C19B58] transition-colors flex items-center justify-center text-[#6B7A6C] hover:text-[#C19B58]"
                                    >
                                        <Plus size={24} />
                                    </button>
                                </div>
                                <p className="text-[10px] text-[#6B7A6C] text-center">
                                    Clique na foto para remover • Máx. 6 fotos no plano grátis
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 4. CERIMÔNIA */}
                    <div className="border-b border-[#DCD3C5]/50">
                        <SectionHeader
                            id="ceremony"
                            icon={MapPin}
                            title="Cerimônia & Festa"
                            isVisible={data.ceremony?.isVisible ?? true}
                            onToggleVisibility={() => toggleVisibility("ceremony")}
                        />

                        {openSection === 'ceremony' && (
                            <div className="p-4 space-y-4 bg-white/50 animate-in slide-in-from-top-2 duration-200">
                                <div className="space-y-3 pb-4 border-b border-[#DCD3C5]/50">
                                    <p className="text-xs font-bold text-[#6B7A6C] uppercase">Cerimônia</p>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">Local</label>
                                        <input
                                            type="text"
                                            value={data.ceremony?.locationName || ""}
                                            onChange={(e) => updateNested("ceremony", "locationName", e.target.value)}
                                            onFocus={() => sendHighlight("ceremony.locationName")}
                                            className="w-full px-3 py-2 text-sm border border-[#DCD3C5] rounded-lg focus:border-[#C19B58] focus:outline-none bg-white text-[#3E4A3F]"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="space-y-1 flex-1">
                                            <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider flex items-center gap-1"><Clock size={10} /> Horário</label>
                                            <input
                                                type="time"
                                                value={data.ceremony?.time || ""}
                                                onChange={(e) => updateNested("ceremony", "time", e.target.value)}
                                                onFocus={() => sendHighlight("ceremony.time")}
                                                className="w-full px-3 py-2 text-sm border border-[#DCD3C5] rounded-lg focus:border-[#C19B58] focus:outline-none bg-white text-[#3E4A3F]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-xs font-bold text-[#6B7A6C] uppercase">Recepção</p>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">Local da Festa</label>
                                        <input
                                            type="text"
                                            value={data.reception?.locationName || ""}
                                            onChange={(e) => updateNested("reception", "locationName", e.target.value)}
                                            onFocus={() => sendHighlight("reception.locationName")}
                                            className="w-full px-3 py-2 text-sm border border-[#DCD3C5] rounded-lg focus:border-[#C19B58] focus:outline-none bg-white text-[#3E4A3F]"
                                        />
                                    </div>
                                </div>

                                {/* UPSELL: Maps */}
                                <button onClick={() => handleLockedClick("Mapas Interativos")} className="w-full py-2 border border-dashed border-[#C19B58]/30 bg-[#C19B58]/5 rounded-lg text-xs font-medium text-[#C19B58] flex items-center justify-center gap-2 hover:bg-[#C19B58]/10 transition-colors">
                                    <MapPin size={12} />
                                    Liberar Mapas Interativos
                                    <Lock size={10} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 5. DESIGN & APARÊNCIA */}
                    <div className="border-b border-[#DCD3C5]/50">
                        <button
                            onClick={() => toggleSection("design")}
                            className={`w-full flex items-center justify-between p-4 hover:bg-[#E5E0D6]/50 transition-colors ${openSection === 'design' ? 'bg-[#E5E0D6]/50' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <Palette size={18} className="text-[#6B7A6C]" />
                                <span className="font-medium text-[#2A3B2E]">Aparência</span>
                            </div>
                            {openSection === 'design' ? <ChevronUp size={16} className="text-[#6B7A6C]" /> : <ChevronDown size={16} className="text-[#6B7A6C]" />}
                        </button>

                        {openSection === 'design' && (
                            <div className="p-4 space-y-4 bg-white/50 animate-in slide-in-from-top-2 duration-200">
                                {/* Slug / URL */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider flex items-center gap-1">
                                        <LinkIcon size={12} />
                                        Link do Site
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-[#6B7A6C] whitespace-nowrap">luma.app/</span>
                                        <input
                                            type="text"
                                            value={data.config?.slug || ""}
                                            onChange={(e) => {
                                                const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                                                onChange("config", { ...data.config, slug } as TemplateData["config"]);
                                            }}
                                            placeholder="ana-e-pedro"
                                            className="flex-1 px-3 py-2 text-sm border border-[#DCD3C5] rounded-lg focus:border-[#C19B58] focus:outline-none bg-white text-[#3E4A3F]"
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            const newSlug = generateSlug(data.brideName, data.groomName);
                                            onChange("config", { ...data.config, slug: newSlug } as TemplateData["config"]);
                                        }}
                                        className="text-[10px] text-[#C19B58] hover:underline"
                                    >
                                        Gerar automaticamente
                                    </button>
                                </div>

                                {/* Theme Selector */}
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider">
                                        Paleta de Cores
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {(Object.keys(themeColors) as SiteTheme[]).map((theme) => {
                                            const colors = themeColors[theme];
                                            const isSelected = data.config?.theme === theme;
                                            return (
                                                <button
                                                    key={theme}
                                                    onClick={() => onChange("config", { ...data.config, theme } as TemplateData["config"])}
                                                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${isSelected ? 'border-[#C19B58] bg-[#C19B58]/5' : 'border-[#DCD3C5] hover:border-[#6B7A6C]'}`}
                                                >
                                                    <div className="relative">
                                                        <div
                                                            className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                                                            style={{ backgroundColor: colors.primary }}
                                                        />
                                                        <div
                                                            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm"
                                                            style={{ backgroundColor: colors.secondary }}
                                                        />
                                                        {isSelected && (
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <Check size={14} className="text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="text-[10px] font-medium text-[#2A3B2E]">{colors.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* UPSELL: Fontes */}
                                <div onClick={() => handleLockedClick("Tipografia")} className="relative opacity-70 hover:opacity-100 transition-opacity cursor-pointer group border border-dashed border-[#DCD3C5] rounded-lg p-3 bg-[#F7F5F0]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-[#6B7A6C] flex items-center gap-2"><Type size={12} /> Fontes Personalizadas</span>
                                        <Lock size={12} className="text-[#C19B58]" />
                                    </div>
                                    <div className="h-2 w-2/3 bg-[#E5E0D6] rounded mb-1"></div>
                                    <div className="h-2 w-1/2 bg-[#E5E0D6] rounded"></div>
                                </div>

                                {/* Plan Toggle (Developer Demo) */}
                                <div className="pt-4 mt-4 border-t border-[#DCD3C5]/50 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider flex items-center gap-1">
                                            <Crown size={12} className="text-[#C19B58]" />
                                            Simular Premium
                                        </label>
                                        <Switch
                                            checked={data.config?.plan === 'premium'}
                                            onChange={(checked: boolean) =>
                                                onChange("config", { ...data.config, plan: checked ? 'premium' : 'free' } as TemplateData["config"])
                                            }
                                        />
                                    </div>
                                    <p className="text-[10px] text-[#6B7A6C]">Ative para testar os recursos Premium</p>
                                </div>

                                {/* WhatsApp Number (Premium Only) */}
                                {data.config?.plan === 'premium' && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#2A3B2E] uppercase tracking-wider flex items-center gap-1">
                                            <Phone size={12} />
                                            WhatsApp do Casal
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.config?.whatsappNumber || ""}
                                            onChange={(e) => onChange("config", { ...data.config, whatsappNumber: e.target.value } as TemplateData["config"])}
                                            placeholder="5511999999999"
                                            className="w-full px-3 py-2 text-sm border border-[#DCD3C5] rounded-lg focus:border-[#C19B58] focus:outline-none bg-white text-[#3E4A3F]"
                                        />
                                        <p className="text-[10px] text-[#6B7A6C]">Número com DDD para receber os comprovantes PIX</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* 6. LISTA DE PRESENTES */}
                    <div className="border-b border-[#DCD3C5]/50">
                        <SectionHeader
                            id="gifts"
                            icon={Gift}
                            title="Lista de Presentes"
                            isVisible={data.gifts?.isVisible ?? true}
                            onToggleVisibility={() => toggleVisibility("gifts")}
                        />

                        {openSection === 'gifts' && (
                            <div className="p-4 space-y-4 bg-white/50 animate-in slide-in-from-top-2 duration-200">
                                {/* Add new gift */}
                                <div className="space-y-3 pb-4 border-b border-[#DCD3C5]/50">
                                    <p className="text-xs font-bold text-[#6B7A6C] uppercase">Adicionar Presente</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="col-span-2">
                                            <input
                                                type="text"
                                                value={newGiftName}
                                                onChange={(e) => setNewGiftName(e.target.value)}
                                                placeholder="Nome do presente"
                                                className="w-full px-3 py-2 text-sm border border-[#DCD3C5] rounded-lg focus:border-[#C19B58] focus:outline-none bg-white text-[#3E4A3F]"
                                            />
                                        </div>
                                        <div className="relative">
                                            <DollarSign size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#6B7A6C]" />
                                            <input
                                                type="number"
                                                value={newGiftPrice}
                                                onChange={(e) => setNewGiftPrice(e.target.value)}
                                                placeholder="Valor"
                                                className="w-full pl-7 pr-3 py-2 text-sm border border-[#DCD3C5] rounded-lg focus:border-[#C19B58] focus:outline-none bg-white text-[#3E4A3F]"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={addGift}
                                        disabled={!newGiftName.trim() || !newGiftPrice}
                                        className="w-full py-2 bg-[#C19B58] text-white rounded-lg text-sm font-medium hover:bg-[#b08d4b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <Plus size={16} />
                                        Adicionar
                                    </button>
                                </div>

                                {/* Gift list */}
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-[#6B7A6C] uppercase">Presentes Cadastrados ({data.gifts?.items?.length || 0})</p>
                                    {data.gifts?.items?.length === 0 && (
                                        <p className="text-sm text-[#6B7A6C] text-center py-4">Nenhum presente cadastrado ainda.</p>
                                    )}
                                    {data.gifts?.items?.map((gift) => (
                                        <div
                                            key={gift.id}
                                            className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#DCD3C5]"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-[#2A3B2E]">{gift.name}</p>
                                                <p className="text-xs text-[#C19B58] font-medium">R$ {gift.price.toFixed(2)}</p>
                                            </div>
                                            <button
                                                onClick={() => removeGift(gift.id)}
                                                className="p-2 rounded-lg hover:bg-red-50 text-[#6B7A6C] hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* FOOTER */}
                <div className="p-6 border-t border-[#DCD3C5] bg-[#F7F5F0] z-10">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full py-3 bg-[#2A3B2E] text-[#F7F5F0] rounded-lg font-medium text-sm hover:bg-[#1f2d22] transition-colors shadow-lg shadow-[#2A3B2E]/20 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isSaving ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            "Salvar e Publicar"
                        )}
                    </button>
                    <p className="text-[10px] text-[#6B7A6C] text-center mt-3">
                        {isSaving ? "Publicando alterações..." : "Última alteração salva agora mesmo"}
                    </p>
                </div>
            </div>

            <UpgradeModal
                isOpen={showUpgrade}
                onClose={() => setShowUpgrade(false)}
                featureName={lockedFeature}
            />

            <ImageCropModal
                isOpen={cropModal.isOpen}
                imageUrl={cropModal.imageUrl}
                aspectRatio={cropModal.aspectRatio}
                onConfirm={(url) => {
                    if (cropModal.targetField === "gallery.new") {
                        addGalleryImage(url);
                        setCropModal({ isOpen: false, imageUrl: "", aspectRatio: 16 / 9, targetField: "" });
                    } else {
                        handleCropConfirm(url);
                    }
                }}
                onCancel={() => setCropModal({ isOpen: false, imageUrl: "", aspectRatio: 16 / 9, targetField: "" })}
            />
        </>
    );
}
