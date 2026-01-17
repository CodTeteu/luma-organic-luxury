"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { SitePlan } from "@/types/template";

interface PlanContextType {
    currentPlan: SitePlan;
    togglePlan: () => void;
    setPlan: (plan: SitePlan) => void;
    isPremium: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children, initialPlan = "free" }: { children: ReactNode; initialPlan?: SitePlan }) {
    const [currentPlan, setCurrentPlan] = useState<SitePlan>(initialPlan);

    const togglePlan = useCallback(() => {
        setCurrentPlan((prev) => (prev === "free" ? "premium" : "free"));
    }, []);

    const setPlan = useCallback((plan: SitePlan) => {
        setCurrentPlan(plan);
    }, []);

    const isPremium = currentPlan === "premium";

    return (
        <PlanContext.Provider value={{ currentPlan, togglePlan, setPlan, isPremium }}>
            {children}
        </PlanContext.Provider>
    );
}

export function usePlan() {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error("usePlan must be used within a PlanProvider");
    }
    return context;
}
