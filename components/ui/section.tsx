"use client";

import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";

// ============================================================================
// SECTION WRAPPER - Reusable section container (DRY & SOLID)
// ============================================================================

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: ReactNode;
    variant?: "default" | "muted" | "highlight";
    size?: "sm" | "md" | "lg" | "xl";
    withDivider?: boolean;
    dividerPosition?: "top" | "bottom" | "both";
}

export const Section = forwardRef<HTMLElement, SectionProps>(
    (
        {
            children,
            className,
            variant = "default",
            size = "lg",
            withDivider = false,
            dividerPosition = "top",
            ...props
        },
        ref
    ) => {
        const sizeClasses = {
            sm: "py-8",
            md: "py-12",
            lg: "py-16",
            xl: "py-24",
        };

        const variantClasses = {
            default: "bg-transparent",
            muted: "bg-muted/30",
            highlight: "bg-gradient-to-br from-primary/5 via-transparent to-primary/5",
        };

        return (
            <section
                ref={ref}
                className={cn(
                    "relative w-full",
                    sizeClasses[size],
                    variantClasses[variant],
                    className
                )}
                {...props}
            >
                {withDivider && (dividerPosition === "top" || dividerPosition === "both") && (
                    <SectionDivider position="top" />
                )}
                {children}
                {withDivider && (dividerPosition === "bottom" || dividerPosition === "both") && (
                    <SectionDivider position="bottom" />
                )}
            </section>
        );
    }
);

Section.displayName = "Section";

// ============================================================================
// SECTION HEADER - Unified section titles (DRY)
// ============================================================================

interface SectionHeaderProps {
    title: string;
    highlight?: string;
    subtitle?: string;
    align?: "left" | "center" | "right";
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function SectionHeader({
    title,
    highlight,
    subtitle,
    align = "center",
    size = "md",
    className,
}: SectionHeaderProps) {
    const alignClasses = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    };

    const titleSizeClasses = {
        sm: "text-xl md:text-2xl",
        md: "text-2xl md:text-3xl",
        lg: "text-3xl md:text-4xl",
    };

    const subtitleSizeClasses = {
        sm: "text-sm",
        md: "text-sm md:text-base",
        lg: "text-base md:text-lg",
    };

    return (
        <div className={cn("mb-8 md:mb-10", alignClasses[align], className)}>
            <h2 className={cn(titleSizeClasses[size], "font-bold tracking-tight mb-2 md:mb-3")}>
                {title}{" "}
                {highlight && (
                    <span className="text-primary">{highlight}</span>
                )}
            </h2>
            {subtitle && (
                <p className={cn(subtitleSizeClasses[size], "text-muted-foreground max-w-2xl", align === "center" && "mx-auto")}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}

// ============================================================================
// SECTION DIVIDER - Visual separator between sections
// ============================================================================

interface SectionDividerProps {
    variant?: "line" | "gradient" | "wave" | "dots";
    position?: "top" | "bottom";
    className?: string;
}

export function SectionDivider({
    variant = "gradient",
    position = "bottom",
    className,
}: SectionDividerProps) {
    const positionClasses = position === "top" ? "top-0" : "bottom-0";

    if (variant === "line") {
        return (
            <div
                className={cn(
                    "absolute left-0 right-0 h-px bg-border",
                    positionClasses,
                    className
                )}
            />
        );
    }

    if (variant === "gradient") {
        return (
            <div
                className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-full max-w-3xl h-px",
                    "bg-gradient-to-r from-transparent via-border to-transparent",
                    positionClasses,
                    className
                )}
            />
        );
    }

    if (variant === "wave") {
        return (
            <div
                className={cn(
                    "absolute left-0 right-0",
                    position === "top" ? "-top-1" : "-bottom-1",
                    className
                )}
            >
                <svg
                    viewBox="0 0 1440 60"
                    className="w-full h-8 fill-background"
                    preserveAspectRatio="none"
                >
                    <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" />
                </svg>
            </div>
        );
    }

    if (variant === "dots") {
        return (
            <div
                className={cn(
                    "absolute left-1/2 -translate-x-1/2 flex items-center gap-2",
                    positionClasses,
                    className
                )}
            >
                {[...Array(5)].map((_, i) => (
                    <span
                        key={i}
                        className={cn(
                            "rounded-full bg-primary/40",
                            i === 2 ? "w-3 h-3" : "w-2 h-2"
                        )}
                    />
                ))}
            </div>
        );
    }

    return null;
}

// ============================================================================
// DECORATIVE BACKGROUND - Section background patterns
// ============================================================================

interface SectionBackgroundProps {
    variant?: "grid" | "dots" | "gradient" | "noise";
    opacity?: number;
    className?: string;
}

export function SectionBackground({
    variant = "gradient",
    opacity = 0.05,
    className,
}: SectionBackgroundProps) {
    if (variant === "grid") {
        return (
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none",
                    className
                )}
                style={{
                    opacity,
                    backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px),
                         linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />
        );
    }

    if (variant === "dots") {
        return (
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none",
                    className
                )}
                style={{
                    opacity,
                    backgroundImage: `radial-gradient(circle, var(--primary) 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                }}
            />
        );
    }

    if (variant === "gradient") {
        return (
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none",
                    "bg-gradient-to-br from-primary/5 via-transparent to-accent/5",
                    className
                )}
            />
        );
    }

    return null;
}

// ============================================================================
// FLOATING DECORATOR - Decorative floating elements
// ============================================================================

interface FloatingDecoratorProps {
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function FloatingDecorator({
    position,
    size = "md",
    className,
}: FloatingDecoratorProps) {
    const positionClasses = {
        "top-left": "top-0 left-0",
        "top-right": "top-0 right-0",
        "bottom-left": "bottom-0 left-0",
        "bottom-right": "bottom-0 right-0",
    };

    const sizeClasses = {
        sm: "w-24 h-24",
        md: "w-32 h-32",
        lg: "w-48 h-48",
    };

    return (
        <div
            className={cn(
                "absolute pointer-events-none",
                positionClasses[position],
                sizeClasses[size],
                "bg-primary/5 rounded-full blur-3xl",
                className
            )}
        />
    );
}
