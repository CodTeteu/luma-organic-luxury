/**
 * Mock Storage Service
 * 
 * Centralized localStorage-based service that simulates a backend.
 * Manages site data, RSVPs, and gift transactions.
 */

import {
    TemplateData,
    defaultTemplateData,
    RSVPGuest,
    GiftTransaction,
    generateRSVPId,
    generateTransactionId
} from "@/types/template";

// Storage keys
const STORAGE_KEYS = {
    SITE_DATA: "luma_site_data",
    GUESTS: "luma_guests",
    TRANSACTIONS: "luma_transactions",
} as const;

// Type guard for browser environment
const isBrowser = typeof window !== "undefined";

/**
 * Get item from localStorage with JSON parsing
 */
function getStorageItem<T>(key: string, defaultValue: T): T {
    if (!isBrowser) return defaultValue;

    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch {
        console.error(`[mockStorage] Error reading ${key}`);
        return defaultValue;
    }
}

/**
 * Set item in localStorage with JSON stringify
 */
function setStorageItem<T>(key: string, value: T): void {
    if (!isBrowser) return;

    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`[mockStorage] Error writing ${key}`, error);
    }
}

/**
 * Dispatch custom event for cross-component updates
 */
export function dispatchUpdate(type: string = "all"): void {
    if (!isBrowser) return;
    window.dispatchEvent(new CustomEvent("luma-storage-update", { detail: { type } }));
}

// ============================================
// SITE DATA (Template)
// ============================================

/**
 * Get site/template data
 */
export function getSiteData(): TemplateData {
    return getStorageItem<TemplateData>(STORAGE_KEYS.SITE_DATA, defaultTemplateData);
}

/**
 * Save site/template data
 */
export function saveSiteData(data: TemplateData): void {
    setStorageItem(STORAGE_KEYS.SITE_DATA, data);
    dispatchUpdate("site");
}

/**
 * Reset site data to defaults
 */
export function resetSiteData(): void {
    setStorageItem(STORAGE_KEYS.SITE_DATA, defaultTemplateData);
    dispatchUpdate("site");
}

// ============================================
// RSVP GUESTS
// ============================================

/**
 * Get all RSVP guests
 */
export function getGuestList(): RSVPGuest[] {
    return getStorageItem<RSVPGuest[]>(STORAGE_KEYS.GUESTS, []);
}

/**
 * Add a new RSVP guest
 */
export function addRSVP(guestData: Omit<RSVPGuest, "id" | "createdAt">): RSVPGuest {
    const guests = getGuestList();

    const newGuest: RSVPGuest = {
        ...guestData,
        id: generateRSVPId(),
        createdAt: new Date().toISOString(),
    };

    guests.push(newGuest);
    setStorageItem(STORAGE_KEYS.GUESTS, guests);
    dispatchUpdate("guests");

    return newGuest;
}

/**
 * Remove an RSVP guest
 */
export function removeRSVP(id: string): void {
    const guests = getGuestList().filter(g => g.id !== id);
    setStorageItem(STORAGE_KEYS.GUESTS, guests);
    dispatchUpdate("guests");
}

/**
 * Update an RSVP guest
 */
export function updateGuest(id: string, updates: Partial<RSVPGuest>): void {
    const guests = getGuestList().map(g =>
        g.id === id ? { ...g, ...updates } : g
    );
    setStorageItem(STORAGE_KEYS.GUESTS, guests);
    dispatchUpdate("guests");
}

/**
 * Get guest statistics
 */
export function getGuestStats(): {
    total: number;
    confirmed: number;
    pending: number;
    totalAdults: number;
    totalChildren: number;
} {
    const guests = getGuestList();
    const confirmed = guests.filter(g => g.isAttending);

    return {
        total: guests.length,
        confirmed: confirmed.length,
        pending: guests.filter(g => !g.isAttending).length,
        totalAdults: confirmed.reduce((sum, g) => sum + (g.guests || 1), 0),
        totalChildren: confirmed.filter(g => g.children === "sim").length,
    };
}

// ============================================
// GIFT TRANSACTIONS
// ============================================

/**
 * Get all transactions
 */
export function getTransactions(): GiftTransaction[] {
    return getStorageItem<GiftTransaction[]>(STORAGE_KEYS.TRANSACTIONS, []);
}

/**
 * Add a gift transaction
 */
export function addTransaction(txData: Omit<GiftTransaction, "id" | "createdAt">): GiftTransaction {
    const transactions = getTransactions();

    const newTx: GiftTransaction = {
        ...txData,
        id: generateTransactionId(),
        createdAt: new Date().toISOString(),
    };

    transactions.push(newTx);
    setStorageItem(STORAGE_KEYS.TRANSACTIONS, transactions);
    dispatchUpdate("transactions");

    return newTx;
}

/**
 * Get financial summary
 */
export function getFinancialSummary(): {
    totalBalance: number;
    transactionCount: number;
    averageGift: number;
    recentTransactions: GiftTransaction[];
} {
    const transactions = getTransactions();
    const totalBalance = transactions.reduce((sum, tx) => sum + tx.amount, 0);

    return {
        totalBalance,
        transactionCount: transactions.length,
        averageGift: transactions.length > 0 ? Math.round(totalBalance / transactions.length) : 0,
        recentTransactions: transactions.slice(-5).reverse(),
    };
}

// ============================================
// UTILITY HOOKS FOR REACT
// ============================================

/**
 * Hook to listen for storage updates
 * Usage: useStorageListener("guests", () => refetch())
 */
export function useStorageListener(
    type: "site" | "guests" | "transactions" | "all",
    callback: () => void
): void {
    if (!isBrowser) return;

    const handler = (event: Event) => {
        const customEvent = event as CustomEvent<{ type: string }>;
        if (type === "all" || customEvent.detail.type === type) {
            callback();
        }
    };

    window.addEventListener("luma-storage-update", handler);

    // Cleanup would be handled by useEffect in React
}

// Default export for convenience
const mockStorage = {
    // Site
    getSiteData,
    saveSiteData,
    resetSiteData,

    // Guests
    getGuestList,
    addRSVP,
    removeRSVP,
    updateGuest,
    getGuestStats,

    // Transactions
    getTransactions,
    addTransaction,
    getFinancialSummary,

    // Utils
    dispatchUpdate,
};

export default mockStorage;
