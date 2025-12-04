"use client";

import { cn } from "@/lib/utils";

// ============================================================================
// STAT BUBBLE TYPES
// ============================================================================

interface StatBubbleData {
    icon: React.ReactNode;
    value: string;
    label: string;
    position: {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    };
    parallaxDirection: {
        x: number; // multiplier for horizontal movement
        y: number; // multiplier for vertical movement
    };
    delay?: number;
}

interface StatBubblesProps {
    scrollY: number;
    className?: string;
}

// ============================================================================
// ICONS - Based on reference design
// ============================================================================

function ReviewsIcon() {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            className="w-8 h-8"
        >
            {/* Hand with clicking/pointing gesture - green color scheme */}
            <path
                d="M16 6C16 4.89543 16.8954 4 18 4V4C19.1046 4 20 4.89543 20 6V16"
                className="stroke-emerald-500"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M20 14C20 12.8954 20.8954 12 22 12V12C23.1046 12 24 12.8954 24 14V18"
                className="stroke-emerald-500"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M12 10C12 8.89543 12.8954 8 14 8V8C15.1046 8 16 8.89543 16 10V16"
                className="stroke-emerald-500"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M8 14C8 12.8954 8.89543 12 10 12V12C11.1046 12 12 12.8954 12 14V16"
                className="stroke-emerald-500"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M8 16V22C8 25.3137 10.6863 28 14 28H18C21.3137 28 24 25.3137 24 22V18"
                className="stroke-emerald-500"
                strokeWidth="2"
                strokeLinecap="round"
            />
            {/* Click effect lines */}
            <path
                d="M26 8L28 6M26 12H29M22 4L24 2"
                className="stroke-emerald-400"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

function CateringsIcon() {
    return (
        <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
            {/* Plate/cloche icon - amber/orange color scheme */}
            <ellipse
                cx="16"
                cy="24"
                rx="12"
                ry="4"
                className="fill-amber-400/40 stroke-amber-500"
                strokeWidth="2"
            />
            <path
                d="M4 24C4 16 9 10 16 10C23 10 28 16 28 24"
                className="stroke-amber-500"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
            <circle cx="16" cy="10" r="2" className="fill-amber-500" />
            <path
                d="M16 10V6"
                className="stroke-amber-500"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function HeartIcon() {
    return (
        <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
            {/* Heart icon - rose/pink color scheme */}
            <path
                d="M16 28C16 28 5 20 5 12C5 8.5 7.5 5 11 5C13.5 5 15 7 16 8C17 7 18.5 5 21 5C24.5 5 27 8.5 27 12C27 20 16 28 16 28Z"
                className="fill-rose-400 stroke-rose-500"
                strokeWidth="2"
            />
        </svg>
    );
}

// ============================================================================
// STAT BUBBLES DATA
// ============================================================================

const STAT_BUBBLES: Omit<StatBubbleData, 'icon'>[] = [
    {
        value: "500+",
        label: "wystawionych opinii",
        position: { top: "22%", left: "38%" },
        parallaxDirection: { x: -0.04, y: 0.025 },
        delay: 0,
    },
    {
        value: "140+",
        label: "cateringów",
        position: { bottom: "25%", left: "45%" },
        parallaxDirection: { x: 0.03, y: -0.035 },
        delay: 150,
    },
    {
        value: "12 lat",
        label: "doświadczenia",
        position: { top: "40%", right: "10%" },
        parallaxDirection: { x: 0.045, y: 0.02 },
        delay: 300,
    },
];

// ============================================================================
// SINGLE BUBBLE COMPONENT
// ============================================================================

interface SingleBubbleProps extends StatBubbleData {
    scrollY: number;
}

function SingleBubble({
    icon,
    value,
    label,
    position,
    parallaxDirection,
    delay = 0,
    scrollY,
}: SingleBubbleProps) {
    const translateX = scrollY * parallaxDirection.x;
    const translateY = scrollY * parallaxDirection.y;

    return (
        <div
            className={cn(
                "absolute z-20",
                "bg-white/95 backdrop-blur-sm",
                "rounded-xl shadow-lg shadow-black/10",
                "px-3 py-2.5 md:px-4 md:py-3",
                "flex items-center gap-2.5 md:gap-3",
                "border border-white/50",
                "animate-fade-in-up",
                "transition-transform duration-100 ease-out",
                "hover:scale-105 hover:shadow-xl",
                "cursor-default"
            )}
            style={{
                ...position,
                transform: `translate(${translateX}px, ${translateY}px)`,
                animationDelay: `${delay}ms`,
            }}
        >
            {/* Icon */}
            <div className="flex-shrink-0">{icon}</div>

            {/* Text Content */}
            <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-foreground leading-tight">
                    {value}
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground leading-tight">
                    {label}
                </span>
            </div>
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function StatBubbles({ scrollY, className }: StatBubblesProps) {
    const icons = [<ReviewsIcon key="reviews" />, <CateringsIcon key="caterings" />, <HeartIcon key="heart" />];

    return (
        <div className={cn("absolute inset-0 pointer-events-none", className)}>
            {STAT_BUBBLES.map((bubble, index) => (
                <SingleBubble
                    key={index}
                    {...bubble}
                    icon={icons[index]}
                    scrollY={scrollY}
                />
            ))}
        </div>
    );
}
