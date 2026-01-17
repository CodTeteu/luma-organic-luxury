/**
 * Gallery image with unique ID for safe reordering/deletion
 */
export interface GalleryImage {
    id: string;
    url: string;
}

/**
 * Section visibility configuration
 */
export interface SectionVisibility {
    isVisible: boolean;
}

/**
 * Available site themes
 */
export type SiteTheme = 'olive' | 'terracotta' | 'blue' | 'black';

/**
 * Available visual theme styles (multi-theme system)
 */
export type ThemeStyle =
    | 'organic-luxury'
    | 'classic-romance'
    | 'modern-minimal'
    | 'boho-chic'
    | 'dark-elegance'
    | 'beach-destination'
    | 'editorial-vogue'
    | 'rustic-barn'
    | 'floral-garden'
    | 'industrial-loft'
    | 'classic' | 'modern' | 'botanical' | 'minimal'; // Keep old ones for migration compatibility if needed, or remove if safe. Let's keep for now but map them later.

/**
 * Site plan types
 */
export type SitePlan = 'free' | 'premium';

/**
 * Site configuration
 */
export interface SiteConfig {
    slug: string;
    theme: SiteTheme;
    themeStyle: ThemeStyle;  // Multi-theme visual style
    isPasswordProtected: boolean;
    sitePassword?: string;
    plan: SitePlan;
    whatsappNumber?: string;
}

/**
 * Gift item for the gift registry
 */
export interface GiftItem {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
}

/**
 * RSVP Guest entry
 */
export interface RSVPGuest {
    id: string;
    name: string;
    phone: string;
    guests: number;
    guestNames: string;
    children: string;
    childrenAges: string;
    isAttending: boolean;
    songRequest: string;
    message: string;
    createdAt: string;
    group?: string; // e.g., "Família Noivo", "Trabalho", etc.
}

/**
 * Gift transaction record
 */
export interface GiftTransaction {
    id: string;
    senderName: string;
    giftName: string;
    amount: number;
    message?: string;
    createdAt: string;
}

/**
 * Timeline event for wedding day schedule
 */
export interface TimelineEvent {
    id: string;
    time: string;
    title: string;
    description?: string;
    icon: 'ceremony' | 'reception' | 'dinner' | 'party' | 'cake' | 'dance' | 'photos';
}

/**
 * Menu section for buffet
 */
export interface MenuSection {
    title: string;
    items: string[];
}

/**
 * Menu/Buffet configuration
 */
export interface MenuConfig {
    buffetName: string;
    mainDish: string;
    sections: MenuSection[];
    pricing: {
        adult: number;
        child: number;
        childAgeRange: string;
    };
    image?: string;
}

/**
 * Dress code configuration
 */
export interface DressCodeConfig {
    description: string;
    avoid: string[];
    suggestions?: string[];
    images?: string[];
}

/**
 * Accommodation/Hotel recommendation
 */
export interface AccommodationItem {
    id: string;
    name: string;
    price: string;
    address: string;
    link: string;
    image?: string;
    distance?: string;
}

/**
 * Guest manual item
 */
export interface GuestManualItem {
    id: string;
    title: string;
    description: string;
    icon: 'camera' | 'clock' | 'shirt' | 'car' | 'gift' | 'check' | 'sparkle';
}

/**
 * Main template data structure for wedding sites
 */
export interface TemplateData {
    groomName: string;
    brideName: string;
    date: string;
    heroImage: string;

    // Site configuration
    config: SiteConfig;

    // Hero section visibility
    hero: SectionVisibility;

    // Couple Section
    couple: SectionVisibility & {
        image: string;
        description: string;
        brideBio: string;
        groomBio: string;
    };

    // Ceremony & Reception
    ceremony: SectionVisibility & {
        date: string;
        time: string;
        locationName: string;
        address: string;
        mapLink: string;
    };
    reception: SectionVisibility & {
        locationName: string;
        address: string;
        mapLink: string;
    };

    // Gallery section
    gallery: SectionVisibility & {
        images: GalleryImage[];
    };

    // RSVP section
    rsvp: SectionVisibility;

    // Gifts section with items
    gifts: SectionVisibility & {
        items: GiftItem[];
        pixKey?: string;
        pixHolder?: string;
    };

    // Guestbook / Mural de Recados
    guestbook: SectionVisibility & {
        messages: GuestbookMessage[];
    };

    // Timeline / Wedding Day Schedule
    timeline: SectionVisibility & {
        events: TimelineEvent[];
    };

    // Menu / Buffet
    menu: SectionVisibility & MenuConfig;

    // Dress Code
    dressCode: SectionVisibility & DressCodeConfig;

    // Accommodations / Hotels
    accommodations: SectionVisibility & {
        items: AccommodationItem[];
    };

    // Guest Manual
    guestManual: SectionVisibility & {
        items: GuestManualItem[];
    };
}

/**
 * Guestbook message entry
 */
export interface GuestbookMessage {
    id: string;
    name: string;
    text: string;
    createdAt: string;
}


/**
 * Generate a unique ID for gallery images
 */
export function generateImageId(): string {
    return `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a unique ID for gifts
 */
export function generateGiftId(): string {
    return `gift_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a unique ID for RSVPs
 */
export function generateRSVPId(): string {
    return `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a unique ID for transactions
 */
export function generateTransactionId(): string {
    return `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate slug from names
 */
export function generateSlug(brideName: string, groomName: string): string {
    const clean = (name: string) => name.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '');
    return `${clean(brideName)}-e-${clean(groomName)}`;
}

/**
 * Default gift items
 */
const defaultGiftItems: GiftItem[] = [
    { id: "gift_default_1", name: "Jantar Romântico", price: 200, imageUrl: "", category: "Experiências" },
    { id: "gift_default_2", name: "Lua de Mel", price: 500, imageUrl: "", category: "Viagem" },
    { id: "gift_default_3", name: "Eletrodomésticos", price: 300, imageUrl: "", category: "Casa" },
    { id: "gift_default_4", name: "Kit Decoração", price: 150, imageUrl: "", category: "Casa" },
];

/**
 * Default template data with all sections visible
 */
export const defaultTemplateData: TemplateData = {
    groomName: "",
    brideName: "",
    date: "",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",

    config: {
        slug: "",
        theme: "olive",
        themeStyle: "classic",
        isPasswordProtected: false,
        plan: "free",
    },

    hero: {
        isVisible: true,
    },

    couple: {
        isVisible: true,
        image: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        description: "Nossa história começou de forma inesperada...",
        brideBio: "",
        groomBio: ""
    },

    ceremony: {
        isVisible: true,
        date: "",
        time: "16:00",
        locationName: "",
        address: "",
        mapLink: "#"
    },

    reception: {
        isVisible: true,
        locationName: "",
        address: "",
        mapLink: "#"
    },

    gallery: {
        isVisible: true,
        images: [
            { id: "img_default_1", url: "https://images.unsplash.com/photo-1519225448526-0a0295155cd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
            { id: "img_default_2", url: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" },
            { id: "img_default_3", url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" }
        ]
    },

    rsvp: {
        isVisible: true,
    },

    gifts: {
        isVisible: true,
        items: defaultGiftItems,
        pixKey: "",
        pixHolder: ""
    },

    guestbook: {
        isVisible: true,
        messages: []
    },

    timeline: {
        isVisible: false,
        events: [
            { id: "event_1", time: "16:00", title: "Cerimônia", icon: "ceremony" },
            { id: "event_2", time: "17:30", title: "Coquetel", icon: "reception" },
            { id: "event_3", time: "19:00", title: "Jantar", icon: "dinner" },
            { id: "event_4", time: "21:00", title: "Festa", icon: "party" }
        ]
    },

    menu: {
        isVisible: false,
        buffetName: "",
        mainDish: "",
        sections: [],
        pricing: { adult: 0, child: 0, childAgeRange: "5-10" }
    },

    dressCode: {
        isVisible: false,
        description: "Traje esporte fino. Vista-se confortável!",
        avoid: ["Branco"],
        suggestions: ["Cores neutras", "Vestido ou terno"]
    },

    accommodations: {
        isVisible: false,
        items: []
    },

    guestManual: {
        isVisible: false,
        items: [
            { id: "manual_1", title: "Chegue no Horário", description: "A cerimônia começará pontualmente.", icon: "clock" },
            { id: "manual_2", title: "Tire Fotos", description: "Registre cada momento!", icon: "camera" },
            { id: "manual_3", title: "Aproveite", description: "Divirta-se muito!", icon: "sparkle" }
        ]
    }
};

/**
 * Check if site data is complete (has required fields)
 */
export function isSiteComplete(data: TemplateData): boolean {
    return !!(data.brideName && data.groomName && data.date);
}

/**
 * Theme color palettes
 */
export const themeColors: Record<SiteTheme, {
    primary: string;
    secondary: string;
    bg: string;
    text: string;
    muted: string;
    label: string;
}> = {
    olive: {
        primary: '#5c6b5d',
        secondary: '#C19B58',
        bg: '#F7F5F0',
        text: '#2A3B2E',
        muted: '#6B7A6C',
        label: 'Olive'
    },
    terracotta: {
        primary: '#9c5c4e',
        secondary: '#d4a373',
        bg: '#fef9f5',
        text: '#3d2c24',
        muted: '#7a6058',
        label: 'Terracotta'
    },
    blue: {
        primary: '#2c3e50',
        secondary: '#3498db',
        bg: '#f8fafc',
        text: '#1e293b',
        muted: '#64748b',
        label: 'Azul'
    },
    black: {
        primary: '#18181b',
        secondary: '#a1a1aa',
        bg: '#fafafa',
        text: '#09090b',
        muted: '#71717a',
        label: 'Preto'
    },
};
