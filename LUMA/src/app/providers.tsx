"use client";

import { ReactNode } from "react";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { CartProvider } from "@/contexts/CartContext";
import { PlanProvider } from "@/contexts/PlanContext";

interface ProvidersProps {
    children: ReactNode;
}

/**
 * Client-side providers wrapper
 * Wraps the app with Error Boundary and context providers for Cart and Plan
 */
export function Providers({ children }: ProvidersProps) {
    return (
        <ErrorBoundary>
            <PlanProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </PlanProvider>
        </ErrorBoundary>
    );
}
