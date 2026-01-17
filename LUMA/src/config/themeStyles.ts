/**
 * Theme Style Definitions
 * 
 * Defines visual styles for the multi-theme system.
 * Each theme contains Tailwind classes for consistent styling.
 */

import { ThemeStyle } from "@/types/template";

export interface ThemeStyleConfig {
    name: string;
    description: string;
    preview: {
        primary: string;
        secondary: string;
        background: string;
    };
    fonts: {
        heading: string;
        script: string;
        body: string;
    };
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        muted: string;
        accent: string;
    };
    classes: {
        section: string;
        card: string;
        button: string;
        heading: string;
        subheading: string;
        body: string;
        border: string;
    };
}

export const themeStyles: Record<ThemeStyle, ThemeStyleConfig> = {
    classic: {
        name: "Clássico Elegante",
        description: "Tons dourados e creme, fontes serifadas elegantes",
        preview: {
            primary: "#8B7355",
            secondary: "#D4AF37",
            background: "#FFFBF7"
        },
        fonts: {
            heading: "font-[family-name:var(--font-heading)]",
            script: "font-[family-name:var(--font-script)]",
            body: "font-serif"
        },
        colors: {
            primary: "#8B7355",
            secondary: "#D4AF37",
            background: "#FFFBF7",
            text: "#3D3227",
            muted: "#8B7355",
            accent: "#C19B58"
        },
        classes: {
            section: "bg-[#FFFBF7] py-24",
            card: "bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#E8DFD3]",
            button: "bg-gradient-to-r from-[#8B7355] to-[#6B5344] text-white rounded-full px-8 py-3",
            heading: "font-[family-name:var(--font-heading)] text-[#3D3227]",
            subheading: "tracking-[0.2em] uppercase text-xs text-[#8B7355]",
            body: "font-serif text-[#5A4D41] leading-relaxed",
            border: "border-[#E8DFD3]"
        }
    },
    modern: {
        name: "Moderno Bold",
        description: "Alto contraste, fontes sans-serif, linhas retas",
        preview: {
            primary: "#111111",
            secondary: "#666666",
            background: "#FFFFFF"
        },
        fonts: {
            heading: "font-sans font-bold",
            script: "font-sans font-light",
            body: "font-sans"
        },
        colors: {
            primary: "#111111",
            secondary: "#666666",
            background: "#FFFFFF",
            text: "#111111",
            muted: "#666666",
            accent: "#000000"
        },
        classes: {
            section: "bg-white py-20",
            card: "bg-white rounded-none border-2 border-black",
            button: "bg-black text-white rounded-none px-8 py-3 uppercase tracking-widest text-sm",
            heading: "font-sans font-black uppercase tracking-tight text-black",
            subheading: "tracking-[0.3em] uppercase text-xs text-gray-500",
            body: "font-sans text-gray-700 leading-normal",
            border: "border-black"
        }
    },
    botanical: {
        name: "Orgânico Botânico",
        description: "Tons de verde oliva, formas arredondadas, natural",
        preview: {
            primary: "#5c6b5d",
            secondary: "#8FA68B",
            background: "#F0F4EE"
        },
        fonts: {
            heading: "font-[family-name:var(--font-heading)]",
            script: "font-[family-name:var(--font-script)]",
            body: "font-sans"
        },
        colors: {
            primary: "#5c6b5d",
            secondary: "#8FA68B",
            background: "#F0F4EE",
            text: "#2A3B2E",
            muted: "#6B7A6C",
            accent: "#C19B58"
        },
        classes: {
            section: "bg-[#F0F4EE] py-24",
            card: "bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-lg border border-[#D4DDD2]",
            button: "bg-[#5c6b5d] text-white rounded-full px-8 py-3",
            heading: "font-[family-name:var(--font-heading)] text-[#2A3B2E]",
            subheading: "tracking-[0.2em] uppercase text-xs text-[#6B7A6C]",
            body: "font-sans text-[#3E4A3F] leading-relaxed",
            border: "border-[#D4DDD2]"
        }
    },
    minimal: {
        name: "Minimalista",
        description: "Limpo, geométrico, espaço em branco",
        preview: {
            primary: "#333333",
            secondary: "#888888",
            background: "#F5F5F5"
        },
        fonts: {
            heading: "font-mono",
            script: "font-mono font-light",
            body: "font-mono"
        },
        colors: {
            primary: "#333333",
            secondary: "#888888",
            background: "#F5F5F5",
            text: "#222222",
            muted: "#666666",
            accent: "#444444"
        },
        classes: {
            section: "bg-[#F5F5F5] py-20",
            card: "bg-white rounded-lg border border-gray-200",
            button: "bg-gray-800 text-white rounded-sm px-6 py-2.5 text-sm",
            heading: "font-mono font-normal text-gray-900",
            subheading: "tracking-widest uppercase text-[10px] text-gray-500",
            body: "font-mono text-sm text-gray-600 leading-loose",
            border: "border-gray-200"
        }
    }
};

/**
 * Get theme config by style
 */
export function getThemeStyleConfig(style: ThemeStyle): ThemeStyleConfig {
    return themeStyles[style] || themeStyles.classic;
}

/**
 * Get all available theme styles
 */
export function getAllThemeStyles(): { id: ThemeStyle; config: ThemeStyleConfig }[] {
    return Object.entries(themeStyles).map(([id, config]) => ({
        id: id as ThemeStyle,
        config
    }));
}
