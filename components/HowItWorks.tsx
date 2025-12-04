"use client";

import Image from "next/image";
import { Section, SectionHeader, SectionDivider, FloatingDecorator } from "@/components/ui/section";
import { StepCard, FeatureItem } from "@/components/ui/step-card";
import { Pen, Sparkles, PartyPopper } from "lucide-react";

// ============================================================================
// STEPS DATA - Centralized data for steps (DRY)
// ============================================================================

const STEPS_DATA = [
    {
        stepNumber: 1,
        title: "Opis wydarzenia",
        description: "Wpisz liczbę gości i preferencje w naszym kalkulatorze.",
        icon: <Pen className="w-5 h-5" />,
    },
    {
        stepNumber: 2,
        title: "Otrzymaj ofertę",
        description: "AI natychmiast wygeneruje idealnie dopasowane menu.",
        icon: <Sparkles className="w-5 h-5" />,
    },
    {
        stepNumber: 3,
        title: "Zamów i ciesz się",
        description: "Potwierdź zamówienie, a my zajmiemy się resztą.",
        icon: <PartyPopper className="w-5 h-5" />,
    },
];

const FEATURES_DATA = [
    "Świeże składniki dostarczane codziennie",
    "Autorskie przepisy naszych mistrzów sushi",
    "Elastyczność w dopasowaniu do diety (wege, bez glutenu)",
    "Ekologiczne opakowania",
];

// ============================================================================
// HOW IT WORKS COMPONENT
// ============================================================================

export function HowItWorks() {
    return (
        <Section size="lg" className="relative overflow-hidden">
            {/* Background decorators */}
            <FloatingDecorator position="top-right" size="lg" className="opacity-30" />
            <FloatingDecorator position="bottom-left" size="md" className="opacity-20" />

            <div className="flex flex-col gap-12 md:gap-16 relative z-10">
                {/* Section Header */}
                <SectionHeader
                    title="Jak to działa?"
                    subtitle="Prosty proces od pomysłu do realizacji. Skupiamy się na Twojej wygodzie."
                />

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {STEPS_DATA.map((step) => (
                        <StepCard
                            key={step.stepNumber}
                            stepNumber={step.stepNumber}
                            title={step.title}
                            description={step.description}
                            icon={step.icon}
                        />
                    ))}
                </div>

                {/* Divider */}
                <SectionDivider variant="gradient" className="relative" />

                {/* Why Fugu Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center pt-4">
                    {/* Image */}
                    <div className="relative flex justify-center lg:justify-center order-2 lg:order-1">
                        <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
                            <Image
                                src="/image 35.svg"
                                alt="Talerz sushi Fugu"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                        {/* Decorative ring behind image */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[90%] h-[90%] rounded-full border border-primary/10" />
                        </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            Dlaczego <span className="text-primary">Fugu</span>?
                        </h2>
                        <ul className="space-y-4 md:space-y-6">
                            {FEATURES_DATA.map((feature, index) => (
                                <FeatureItem key={index} text={feature} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Section>
    );
}
