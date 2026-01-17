import { TemplateData, ThemeStyle } from "@/types/template";
import * as Templates from "./implementations";

export interface TemplateDefinition {
    id: ThemeStyle;
    label: string;
    description: string;
    component: React.ComponentType<{ data: TemplateData }>;
    category: 'Classic' | 'Modern' | 'Rustic' | 'Concept';
}

export const TEMPLATE_REGISTRY: TemplateDefinition[] = [
    {
        id: 'organic-luxury',
        label: "Organic Luxury",
        description: "Estilo original, tons de oliva e creme com fontes serifadas elegantes.",
        component: Templates.OrganicLuxury,
        category: 'Classic'
    },
    {
        id: 'classic-romance',
        label: "Classic Romance",
        description: "Tradicional, fundo branco e detalhes dourados. Luxo atemporal.",
        component: Templates.ClassicRomance,
        category: 'Classic'
    },
    {
        id: 'modern-minimal',
        label: "Modern Minimal",
        description: "Preto e branco, alto contraste, sem serifas. Para casais urbanos.",
        component: Templates.ModernMinimal,
        category: 'Modern'
    },
    {
        id: 'boho-chic',
        label: "Boho Chic",
        description: "Tons terrosos, fontes manuscritas e clima descontraído.",
        component: Templates.BohoChic,
        category: 'Rustic'
    },
    {
        id: 'dark-elegance',
        label: "Dark Elegance",
        description: "Fundo preto profundo com detalhes sofisticados em ouro.",
        component: Templates.DarkElegance,
        category: 'Modern'
    },
    {
        id: 'beach-destination',
        label: "Beach Destination",
        description: "Tons de azul e areia, ideal para casamentos na praia.",
        component: Templates.BeachDestination,
        category: 'Rustic'
    },
    {
        id: 'editorial-vogue',
        label: "Editorial Vogue",
        description: "Tipografia gigante e layouts assimétricos estilo revista.",
        component: Templates.EditorialVogue,
        category: 'Concept'
    },
    {
        id: 'rustic-barn',
        label: "Rustic Barn",
        description: "Estilo fazenda, tons de madeira e fontes slab serif.",
        component: Templates.RusticBarn,
        category: 'Rustic'
    },
    {
        id: 'floral-garden',
        label: "Floral Garden",
        description: "Romântico, tons pastéis e detalhes delicados.",
        component: Templates.FloralGarden,
        category: 'Classic'
    },
    {
        id: 'industrial-loft',
        label: "Industrial Loft",
        description: "Concreto, neon e design brutalista moderno.",
        component: Templates.IndustrialLoft,
        category: 'Modern'
    },

    // Mappings for old legacy IDs to new implementations
    {
        id: 'classic',
        label: "Clássico (Legacy)",
        description: "Legacy mapping",
        component: Templates.OrganicLuxury, // Map to similar
        category: 'Classic'
    },
    {
        id: 'modern',
        label: "Moderno (Legacy)",
        description: "Legacy mapping",
        component: Templates.ModernMinimal,
        category: 'Modern'
    },
    {
        id: 'botanical',
        label: "Botânico (Legacy)",
        description: "Legacy mapping",
        component: Templates.OrganicLuxury,
        category: 'Classic'
    },
    {
        id: 'minimal',
        label: "Minimal (Legacy)",
        description: "Legacy mapping",
        component: Templates.ModernMinimal,
        category: 'Modern'
    }
];

export function getTemplate(id: ThemeStyle): TemplateDefinition {
    return TEMPLATE_REGISTRY.find(t => t.id === id) || TEMPLATE_REGISTRY[0];
}
