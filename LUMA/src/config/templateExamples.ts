/**
 * Template Examples Configuration
 * Dados de exemplo para cada template no showcase
 */

import { TemplateData, defaultTemplateData } from "@/types/template";

export interface TemplateExample {
    id: string;
    label: string;
    description: string;
    category: 'Classic' | 'Modern' | 'Rustic' | 'Concept';
    previewImage: string;
    colors: {
        primary: string;
        secondary: string;
        bg: string;
    };
    data: TemplateData;
}

const createTemplateData = (
    brideName: string,
    groomName: string,
    date: string,
    location: string
): TemplateData => ({
    ...defaultTemplateData,
    brideName,
    groomName,
    date,
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop",
    config: {
        ...defaultTemplateData.config,
        slug: `${brideName.toLowerCase()}-e-${groomName.toLowerCase()}`,
    },
    couple: {
        ...defaultTemplateData.couple,
        image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop",
        description: `Nossa história começou de forma inesperada e se transformou no mais lindo amor...`,
        brideBio: `${brideName} ama café, livros e dias chuvosos.`,
        groomBio: `${groomName} é apaixonado por música, viagens e por ${brideName}.`
    },
    ceremony: {
        ...defaultTemplateData.ceremony,
        date,
        time: "16:00",
        locationName: location,
        address: "Endereço a confirmar",
    },
    reception: {
        ...defaultTemplateData.reception,
        locationName: location,
        address: "Mesmo local da cerimônia"
    },
});

export const TEMPLATE_EXAMPLES: TemplateExample[] = [
    {
        id: 'organic-luxury',
        label: "Organic Luxury",
        description: "Elegância natural com tons de oliva e creme. Fontes serifadas clássicas e bordas suaves.",
        category: 'Classic',
        previewImage: "/images/templates/organic-luxury.jpg",
        colors: { primary: "#8B7355", secondary: "#C19B58", bg: "#FFFBF7" },
        data: createTemplateData("Mariana", "Rafael", "2026-10-15", "Fazenda Vista Verde")
    },
    {
        id: 'classic-romance',
        label: "Classic Romance",
        description: "Tradicional e atemporal. Branco com detalhes dourados que transmitem luxo.",
        category: 'Classic',
        previewImage: "/images/templates/classic-romance.jpg",
        colors: { primary: "#D4A853", secondary: "#E8C678", bg: "#FFFFFF" },
        data: createTemplateData("Beatriz", "Lucas", "2026-11-20", "Igreja Matriz Nossa Senhora")
    },
    {
        id: 'modern-minimal',
        label: "Modern Minimal",
        description: "Preto e branco, alto contraste. Design limpo para casais urbanos e modernos.",
        category: 'Modern',
        previewImage: "/images/templates/modern-minimal.jpg",
        colors: { primary: "#000000", secondary: "#666666", bg: "#FFFFFF" },
        data: createTemplateData("Fernanda", "Pedro", "2026-09-28", "Rooftop Studio SP")
    },
    {
        id: 'boho-chic',
        label: "Boho Chic",
        description: "Tons terrosos e fontes manuscritas. Perfeito para casamentos ao ar livre.",
        category: 'Rustic',
        previewImage: "/images/templates/boho-chic.jpg",
        colors: { primary: "#c26d40", secondary: "#e09f7d", bg: "#f5e6d3" },
        data: createTemplateData("Camila", "Thiago", "2026-08-12", "Jardim Botânico")
    },
    {
        id: 'dark-elegance',
        label: "Dark Elegance",
        description: "Sofisticação em fundo escuro com detalhes em ouro. Drama e elegância.",
        category: 'Modern',
        previewImage: "/images/templates/dark-elegance.jpg",
        colors: { primary: "#C5A572", secondary: "#E8D5B5", bg: "#0F172A" },
        data: createTemplateData("Isabella", "Gabriel", "2026-12-05", "Castelo São João")
    },
    {
        id: 'beach-destination',
        label: "Beach Destination",
        description: "Tons de azul e areia. Ideal para destination weddings na praia.",
        category: 'Rustic',
        previewImage: "/images/templates/beach-destination.jpg",
        colors: { primary: "#38BDF8", secondary: "#FDBA74", bg: "#F0F9FF" },
        data: createTemplateData("Carolina", "Diego", "2026-07-18", "Resort Praia do Forte")
    },
    {
        id: 'editorial-vogue',
        label: "Editorial Vogue",
        description: "Tipografia gigante e layouts assimétricos. Estilo revista de moda.",
        category: 'Concept',
        previewImage: "/images/templates/editorial-vogue.jpg",
        colors: { primary: "#18181B", secondary: "#A1A1AA", bg: "#FFFFFF" },
        data: createTemplateData("Valentina", "Henrique", "2026-10-30", "MIS - Museu da Imagem")
    },
    {
        id: 'rustic-barn',
        label: "Rustic Barn",
        description: "Estilo fazenda com tons de madeira. Charme rústico e aconchegante.",
        category: 'Rustic',
        previewImage: "/images/templates/rustic-barn.jpg",
        colors: { primary: "#7C2D12", secondary: "#78716C", bg: "#FFF8F0" },
        data: createTemplateData("Laura", "Matheus", "2026-06-22", "Haras Santa Rita")
    },
    {
        id: 'floral-garden',
        label: "Floral Garden",
        description: "Romântico e delicado. Tons pastéis com inspiração floral.",
        category: 'Classic',
        previewImage: "/images/templates/floral-garden.jpg",
        colors: { primary: "#EC4899", secondary: "#FDA4AF", bg: "#FDF2F8" },
        data: createTemplateData("Sofia", "André", "2026-09-14", "Espaço Rosa dos Ventos")
    },
    {
        id: 'industrial-loft',
        label: "Industrial Loft",
        description: "Concreto e neon. Design brutalista para casais ousados.",
        category: 'Modern',
        previewImage: "/images/templates/industrial-loft.jpg",
        colors: { primary: "#4F46E5", secondary: "#A3E635", bg: "#F4F4F5" },
        data: createTemplateData("Amanda", "Bruno", "2026-11-08", "Galpão Cultural Lapa")
    }
];

export const getTemplateExample = (id: string): TemplateExample | undefined => {
    return TEMPLATE_EXAMPLES.find(t => t.id === id);
};

export const getTemplatesByCategory = (category: TemplateExample['category']): TemplateExample[] => {
    return TEMPLATE_EXAMPLES.filter(t => t.category === category);
};
