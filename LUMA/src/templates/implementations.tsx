import { TemplateData } from "@/types/template";
import BaseLayout, { TemplateConfig } from "./BaseLayout"; // Updated import

/**
 * 1. ORGANIC LUXURY (The Original)
 * Style: Olive, Cream, Serif, Rounded, Soft
 */
export const OrganicLuxury = ({ data }: { data: TemplateData }) => (
    <BaseLayout
        data={data}
        config={{
            fonts: {
                heading: "font-[family-name:var(--font-playfair)]",
                body: "font-[family-name:var(--font-cormorant)]",
                script: "font-[family-name:var(--font-pinyon)]"
            },
            colors: {
                bg: "bg-[#FFFBF7]",
                text: "text-[#3D3227]",
                primary: "text-[#8B7355]",
                secondary: "text-[#C19B58]"
            },
            layout: {
                nav: "top",
                hero: "centered",
                container: "contained"
            },
            style: {
                rounded: "rounded-3xl",
                borders: "border-[#E8DFD3]",
                shadows: "shadow-xl",
                button: "bg-[#8B7355] text-white rounded-full px-8 py-3"
            }
        }}
    />
);

/**
 * 2. CLASSIC ROMANCE
 * Style: Gold, White, Playfair, centered
 */
export const ClassicRomance = ({ data }: { data: TemplateData }) => (
    <BaseLayout
        data={data}
        config={{
            fonts: {
                heading: "font-[family-name:var(--font-playfair)]",
                body: "font-[family-name:var(--font-lato)]",
                script: "font-[family-name:var(--font-pinyon)] italic"
            },
            colors: {
                bg: "bg-white",
                text: "text-slate-800",
                primary: "text-amber-500",
                secondary: "text-amber-300"
            },
            layout: {
                nav: "top",
                hero: "full-screen",
                container: "contained"
            },
            style: {
                rounded: "rounded-lg",
                borders: "border-amber-100",
                shadows: "shadow-sm",
                button: "bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded px-6 py-2"
            }
        }}
    />
);

/**
 * 3. MODERN MINIMAL
 * Style: B&W, High Contrast, Inter, Sharp Edges
 */
export const ModernMinimal = ({ data }: { data: TemplateData }) => (
    <BaseLayout
        data={data}
        config={{
            fonts: {
                heading: "font-[family-name:var(--font-inter)] font-black uppercase tracking-tight",
                body: "font-[family-name:var(--font-inter)]",
                script: "font-[family-name:var(--font-inter)] font-light italic"
            },
            colors: {
                bg: "bg-white",
                text: "text-black",
                primary: "text-black",
                secondary: "text-gray-500"
            },
            layout: {
                nav: "sidebar-left",
                hero: "split",
                container: "full-width"
            },
            style: {
                rounded: "rounded-none",
                borders: "border-2 border-black",
                shadows: "shadow-none",
                button: "bg-black text-white rounded-none uppercase tracking-widest text-xs px-8 py-4"
            }
        }}
    />
);

/**
 * 4. BOHO CHIC
 * Style: Terracotta, Paper, Cursive
 */
export const BohoChic = ({ data }: { data: TemplateData }) => (
    <BaseLayout
        data={data}
        config={{
            fonts: {
                heading: "font-[family-name:var(--font-pinyon)]",
                body: "font-[family-name:var(--font-montserrat)]",
                script: "font-[family-name:var(--font-pinyon)]"
            },
            colors: {
                bg: "bg-[#f5e6d3]",
                text: "text-[#5c3a2a]",
                primary: "text-[#c26d40]",
                secondary: "text-[#e09f7d]"
            },
            layout: {
                nav: "top",
                hero: "centered",
                container: "contained"
            },
            style: {
                rounded: "rounded-[2rem]",
                borders: "border-[#c26d40]",
                shadows: "shadow-lg shadow-[#c26d40]/20",
                button: "bg-[#c26d40] text-[#f5e6d3] rounded-full px-8 py-3"
            }
        }}
    />
);

/**
 * 5. DARK ELEGANCE
 * Style: Deep Black, Gold, Luxurious
 */
export const DarkElegance = ({ data }: { data: TemplateData }) => (
    <BaseLayout
        data={data}
        config={{
            fonts: {
                heading: "font-[family-name:var(--font-cinzel)] uppercase tracking-widest",
                body: "font-[family-name:var(--font-lato)] font-light",
                script: "font-[family-name:var(--font-playfair)] italic"
            },
            colors: {
                bg: "bg-slate-950",
                text: "text-slate-200",
                primary: "text-yellow-600",
                secondary: "text-yellow-400"
            },
            layout: {
                nav: "floating",
                hero: "centered",
                container: "full-width"
            },
            style: {
                rounded: "rounded-sm",
                borders: "border-yellow-900/30",
                shadows: "shadow-2xl shadow-black",
                button: "bg-gradient-to-br from-yellow-700 to-yellow-900 text-yellow-100 border border-yellow-500/30 rounded-sm px-8 py-3 uppercase tracking-widest text-xs"
            }
        }}
    />
);

/**
 * 6. BEACH DESTINATION
 * Style: Blue, Beige, Relaxed
 */
export const BeachDestination = ({ data }: { data: TemplateData }) => (
    <BaseLayout
        data={data}
        config={{
            fonts: {
                heading: "font-[family-name:var(--font-inter)] font-black uppercase text-sky-500",
                body: "font-[family-name:var(--font-quicksand)]",
                script: "font-[family-name:var(--font-amatic)]"
            },
            colors: {
                bg: "bg-sky-50",
                text: "text-sky-900",
                primary: "text-sky-500",
                secondary: "text-orange-300"
            },
            layout: {
                nav: "top",
                hero: "full-screen",
                container: "full-width"
            },
            style: {
                rounded: "rounded-3xl",
                borders: "border-sky-100",
                shadows: "shadow-lg shadow-sky-200/50",
                button: "bg-sky-400 text-white rounded-full px-6 py-2 shadow-lg shadow-sky-300/50"
            }
        }}
    />
);

/**
 * 7. EDITORIAL VOGUE
 * Style: Big Type, Asymmetric, Fashion
 */
export const EditorialVogue = ({ data }: { data: TemplateData }) => (
    <BaseLayout
        data={data}
        config={{
            fonts: {
                heading: "font-[family-name:var(--font-bodoni)] italic text-6xl md:text-9xl tracking-tighter leading-none",
                body: "font-[family-name:var(--font-raleway)] font-light tracking-wide",
                script: "font-[family-name:var(--font-bodoni)] italic"
            },
            colors: {
                bg: "bg-white",
                text: "text-zinc-900",
                primary: "text-black",
                secondary: "text-zinc-400"
            },
            layout: {
                nav: "sidebar-left",
                hero: "split",
                container: "full-width"
            },
            style: {
                rounded: "rounded-none",
                borders: "border-black",
                shadows: "shadow-none",
                button: "bg-transparent text-black border-b border-black rounded-none px-0 py-1 hover:bg-black hover:text-white transition-all uppercase text-[10px] tracking-[0.2em]"
            }
        }}
    />
);

/**
 * 8. RUSTIC BARN
 * Style: Wood tones, Slab Serif, Manual
 */
export const RusticBarn = ({ data }: { data: TemplateData }) => (
    <BaseLayout
        data={data}
        config={{
            fonts: {
                heading: "font-[family-name:var(--font-playfair)] font-bold tracking-tight",
                body: "font-[family-name:var(--font-space-mono)] text-sm",
                script: "font-[family-name:var(--font-amatic)]"
            },
            colors: {
                bg: "bg-[#FFF8F0]", // Warm paper like
                text: "text-stone-800",
                primary: "text-orange-900",
                secondary: "text-stone-600"
            },
            layout: {
                nav: "top",
                hero: "centered",
                container: "contained"
            },
            style: {
                rounded: "rounded-md",
                borders: "border-stone-400 border-dashed border-2",
                shadows: "shadow-md",
                button: "bg-orange-800 text-[#FFF8F0] px-6 py-3 font-mono uppercase rounded-md border-b-4 border-orange-950 active:border-b-0 active:translate-y-1"
            }
        }}
    />
);

/**
 * 9. FLORAL GARDEN
 * Style: Pastels, Borders, Romantic
 */
export const FloralGarden = ({ data }: { data: TemplateData }) => (
    <BaseLayout
        data={data}
        config={{
            fonts: {
                heading: "font-[family-name:var(--font-great-vibes)] text-pink-500",
                body: "font-[family-name:var(--font-quicksand)] text-slate-600",
                script: "font-[family-name:var(--font-great-vibes)]"
            },
            colors: {
                bg: "bg-pink-50",
                text: "text-slate-600",
                primary: "text-pink-500",
                secondary: "text-rose-300"
            },
            layout: {
                nav: "top",
                hero: "centered",
                container: "contained"
            },
            style: {
                rounded: "rounded-[3rem]",
                borders: "border-2 border-pink-100",
                shadows: "shadow-xl shadow-pink-100",
                button: "bg-gradient-to-r from-pink-300 to-rose-300 text-white rounded-full px-8 py-2 shadow-lg shadow-pink-200"
            }
        }}
    />
);

/**
 * 10. INDUSTRIAL LOFT
 * Style: Concrete, Neon, Brutalist
 */
export const IndustrialLoft = ({ data }: { data: TemplateData }) => (
    <BaseLayout
        data={data}
        config={{
            fonts: {
                heading: "font-[family-name:var(--font-space-mono)] font-bold uppercase tracking-tighter",
                body: "font-[family-name:var(--font-space-mono)] text-sm",
                script: "font-[family-name:var(--font-space-mono)] italic"
            },
            colors: {
                bg: "bg-zinc-100",
                text: "text-zinc-900",
                primary: "text-indigo-600",
                secondary: "text-lime-500" // Neon accent
            },
            layout: {
                nav: "sidebar-left",
                hero: "split",
                container: "full-width"
            },
            style: {
                rounded: "rounded-none",
                borders: "border-4 border-zinc-900",
                shadows: "shadow-[8px_8px_0px_0px_rgba(24,24,27,1)]",
                button: "bg-lime-400 text-black font-bold uppercase tracking-wider px-6 py-3 border-2 border-black hover:bg-lime-300 hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
            }
        }}
    />
);
