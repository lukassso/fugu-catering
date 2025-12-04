"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollToTopProps {
    /** Scroll threshold in pixels before showing the button */
    threshold?: number;
    className?: string;
}

export function ScrollToTop({ threshold = 300, className }: ScrollToTopProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > threshold);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Check initial scroll position
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Przewiń do góry"
            className={cn(
                // Base styles
                "fixed bottom-6 right-6 z-50",
                "flex items-center justify-center",
                "w-12 h-12 rounded-full",
                // Colors & effects
                "bg-primary text-primary-foreground",
                "shadow-lg shadow-primary/25",
                // Hover & active states
                "hover:bg-primary/90 hover:scale-110",
                "active:scale-95",
                // Transitions
                "transition-all duration-300 ease-out",
                // Visibility
                isVisible
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none",
                className
            )}
        >
            <ChevronUp className="w-6 h-6" strokeWidth={2.5} />
        </button>
    );
}
