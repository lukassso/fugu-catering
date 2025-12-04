"use client";

import { Button } from "@/components/ui/button";
import { Phone, Mail, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// CONSTANTS - Shared contact info (DRY)
// ============================================================================

export const PHONE_NUMBER = "510219510";
export const PHONE_DISPLAY = "510 219 510";
export const EMAIL = "catering@fugusushi.pl";

// ============================================================================
// CTA BUTTONS - Reusable call-to-action buttons (DRY)
// ============================================================================

interface CTAButtonsProps {
    variant?: "primary" | "contact";
    onReserveClick?: () => void;
    showReserve?: boolean;
    showPhone?: boolean;
    showEmail?: boolean;
    className?: string;
}

export function CTAButtons({
    variant = "primary",
    onReserveClick,
    showReserve = true,
    showPhone = true,
    showEmail = false,
    className,
}: CTAButtonsProps) {
    const buttonBaseClass = "h-12 px-6 rounded-xl font-medium text-base";

    return (
        <div
            className={cn(
                "flex flex-col sm:flex-row gap-3 justify-center items-center",
                className
            )}
        >
            {showReserve && onReserveClick && (
                <Button
                    variant="default"
                    onClick={onReserveClick}
                    className={cn(buttonBaseClass, "w-full sm:w-auto btn-primary")}
                >
                    <CalendarCheck className="w-5 h-5 mr-2" />
                    Rezerwuj Imprezę
                </Button>
            )}

            {showPhone && (
                <Button
                    asChild
                    variant={variant === "primary" ? "default" : "outline"}
                    className={cn(
                        buttonBaseClass,
                        "w-full sm:w-auto",
                        variant === "primary"
                            ? "btn-primary"
                            : "border-primary/30 hover:bg-primary/10"
                    )}
                >
                    <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        <span>{PHONE_DISPLAY}</span>
                    </a>
                </Button>
            )}

            {showEmail && (
                <Button
                    asChild
                    variant="outline"
                    className={cn(
                        buttonBaseClass,
                        "w-full sm:w-auto border-primary/30 hover:bg-primary/10"
                    )}
                >
                    <a href={`mailto:${EMAIL}`} className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        <span>{EMAIL}</span>
                    </a>
                </Button>
            )}
        </div>
    );
}
