"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

// ============================================================================
// STEP CARD - Reusable numbered step card component (DRY)
// Used in: HowItWorks section
// ============================================================================

interface StepCardProps {
    stepNumber: number;
    title: string;
    description: string;
    icon?: ReactNode;
    className?: string;
}

export function StepCard({
    stepNumber,
    title,
    description,
    icon,
    className,
}: StepCardProps) {
    const formattedNumber = stepNumber.toString().padStart(2, "0");

    return (
        <Card
            className={cn(
                "bg-card/50 backdrop-blur-sm border-muted/40 relative overflow-hidden",
                "group hover:border-primary/50 transition-all duration-300",
                "hover:shadow-lg hover:shadow-primary/5",
                className
            )}
        >
            <CardContent className="p-6 md:p-8 relative z-10 h-full flex flex-col justify-between min-h-[180px]">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            {icon && (
                                <div className="text-primary/80 group-hover:text-primary transition-colors">
                                    {icon}
                                </div>
                            )}
                            <h3 className="text-lg md:text-xl font-bold text-foreground">
                                {title}
                            </h3>
                        </div>
                        <span
                            className={cn(
                                "text-5xl md:text-6xl font-bold text-primary/10",
                                "absolute top-2 right-4",
                                "group-hover:text-primary/20 transition-colors select-none"
                            )}
                        >
                            {formattedNumber}
                        </span>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground relative z-10 leading-relaxed">
                        {description}
                    </p>
                </div>
            </CardContent>

            {/* Hover glow effect */}
            <div
                className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100",
                    "bg-gradient-to-br from-primary/5 via-transparent to-transparent",
                    "transition-opacity duration-300 pointer-events-none"
                )}
            />
        </Card>
    );
}

// ============================================================================
// FEATURE ITEM - Reusable feature list item (DRY)
// Used in: "Why Fugu" section
// ============================================================================

interface FeatureItemProps {
    text: string;
    icon?: ReactNode;
    className?: string;
}

export function FeatureItem({ text, icon, className }: FeatureItemProps) {
    return (
        <li
            className={cn(
                "flex items-center gap-4 text-base md:text-lg text-muted-foreground",
                "group/item",
                className
            )}
        >
            {icon ?? (
                <span
                    className={cn(
                        "w-2 h-2 rounded-full bg-primary shrink-0",
                        "group-hover/item:scale-150 transition-transform duration-200"
                    )}
                />
            )}
            <span className="group-hover/item:text-foreground transition-colors duration-200">
                {text}
            </span>
        </li>
    );
}

// ============================================================================
// INFO CARD - Highlighted information card (DRY)
// Used in: Catering description section
// ============================================================================

interface InfoCardProps {
    title?: string;
    items: string[];
    variant?: "default" | "highlight" | "outline";
    className?: string;
}

export function InfoCard({
    title,
    items,
    variant = "default",
    className,
}: InfoCardProps) {
    const variantClasses = {
        default: "bg-card border-border",
        highlight: "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20",
        outline: "bg-transparent border-border",
    };

    return (
        <Card
            className={cn(
                "rounded-xl shadow transition-all duration-300 hover:shadow-lg",
                variantClasses[variant],
                className
            )}
        >
            {title && (
                <div className="flex flex-col space-y-1.5 p-6 border-b border-border/50">
                    <h3 className="text-xl md:text-2xl font-semibold leading-none tracking-tight text-primary">
                        {title}
                    </h3>
                </div>
            )}
            <div className="p-6">
                <ul className="space-y-3">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-3 text-base md:text-lg"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            <strong className="font-medium text-foreground">
                                {item}
                            </strong>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
}
