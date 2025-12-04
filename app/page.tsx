"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { Section, SectionHeader, SectionDivider, FloatingDecorator } from "@/components/ui/section";
import { InfoCard } from "@/components/ui/step-card";
import { CTAButtons, PHONE_NUMBER, PHONE_DISPLAY } from "@/components/ui/cta-buttons";

import { CateringCalculator, type Step } from "@/components/CateringCalculator";
import { OfferGrid } from "@/components/OfferGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";

// ============================================================================
// CONSTANTS - Centralized data (DRY)
// ============================================================================

const EVENT_TYPES = [
  "Spotkania biznesowe i konferencje",
  "Eventy firmowe (corporate events)",
  "Imprezy prywatne (przyjęcia, urodziny, wesela)",
];

// ============================================================================
// HEADER SECTION COMPONENT
// ============================================================================

interface HeroSectionProps {
  calculatorRef: React.RefObject<HTMLDivElement | null>;
  calculatorStep: Step;
  setCalculatorStep: (step: Step) => void;
  scrollY: number;
}

function HeroSection({ calculatorRef, calculatorStep, setCalculatorStep, scrollY }: HeroSectionProps) {
  return (
    <Section size="sm" className="relative">
      {/* Parallax Background */}
      <div
        className="absolute top-0 right-0 w-[60%] h-[80vh] bg-no-repeat bg-contain bg-right-top pointer-events-none z-0 transition-transform duration-75 ease-out hidden md:block"
        style={{
          backgroundImage: "url('/bcg1.svg')",
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />

      <div className="container mx-auto flex flex-col items-center relative z-10">
        {/* Logo */}
        <header className="mb-8 md:mb-12 w-full flex flex-col items-center text-center">
          <div className="mb-16 md:mb-24">
            <Image
              src="/logo-black.svg"
              alt="Fugu Sushi Logo"
              width={128}
              height={105}
              priority
            />
          </div>

          {/* Hero Text */}
          <div className="max-w-2xl px-4 space-y-4 text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground drop-shadow-lg">
              Opisz swój event i sprawdź co proponujemy
            </h1>
            <h2 className="text-base md:text-lg lg:text-xl text-muted-foreground font-light">
              Inteligentny kalkulator zamówień dla grup
            </h2>
          </div>
        </header>

        {/* Calculator */}
        <div
          ref={calculatorRef}
          className="scroll-mt-24 w-full max-w-2xl mx-auto px-4"
        >
          <CateringCalculator
            externalStep={calculatorStep}
            onStepChange={setCalculatorStep}
          />
        </div>
      </div>
    </Section>
  );
}

// ============================================================================
// CATERING INFO SECTION COMPONENT
// ============================================================================

interface CateringInfoSectionProps {
  calculatorRef: React.RefObject<HTMLDivElement | null>;
  setCalculatorStep: (step: Step) => void;
}

function CateringInfoSection({ calculatorRef, setCalculatorStep }: CateringInfoSectionProps) {
  const handleReserveClick = () => {
    setCalculatorStep(3);
    calculatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Section size="lg" className="relative overflow-hidden">
      <FloatingDecorator position="bottom-right" size="lg" className="opacity-30" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeader
          title="Catering Sushi na Imprezy w Warszawie –"
          highlight="Idealny Wybór dla Firm i Eventów"
          align="left"
          className="mb-8"
        />

        {/* Description */}
        <div className="space-y-4 text-base leading-relaxed">
          <p className="text-muted-foreground">
            Szukasz{" "}
            <strong className="font-semibold text-foreground">
              profesjonalnego cateringu sushi na imprezę w Warszawie lub jej okolicach
            </strong>
            ? Oferujemy{" "}
            <strong className="text-primary font-medium">
              catering sushi dla firm, spotkań biznesowych, eventów oraz prywatnych przyjęć.
            </strong>
          </p>
          <p className="text-muted-foreground">
            Catering sushi to{" "}
            <strong className="font-medium text-foreground">
              oryginalna i elegancka propozycja
            </strong>
            , która zadowoli zarówno miłośników kuchni japońskiej, jak i tych, którzy pragną spróbować czegoś nowego.
          </p>
        </div>

        {/* Event Types Card */}
        <div className="mt-8">
          <InfoCard
            title="To Idealne Rozwiązanie na:"
            items={EVENT_TYPES}
            variant="default"
          />
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16">
          <p className="text-lg font-medium text-center mb-6 max-w-2xl mx-auto text-foreground">
            Postaw na najwyższą jakość i niezapomniane wrażenia smakowe dzięki naszemu cateringowi sushi
          </p>

          <CTAButtons
            variant="primary"
            onReserveClick={handleReserveClick}
            showReserve={true}
            showPhone={true}
            showEmail={false}
            className="max-w-md mx-auto"
          />
        </div>
      </div>
    </Section>
  );
}

// ============================================================================
// FOOTER COMPONENT
// ============================================================================

function Footer() {
  return (
    <footer className="py-8 md:py-12 border-t border-border/50 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="mb-2 text-sm text-muted-foreground">
          <strong className="font-semibold text-foreground">FUGU SUSHI</strong>{" "}
          | ul. Chodkiewicza 7, Warszawa |{" "}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="text-primary hover:underline transition-colors"
          >
            {PHONE_DISPLAY}
          </a>
        </p>
        <p className="text-xs text-muted-foreground/80">
          &copy; {new Date().getFullYear()} Fugu Sushi. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function CateringPage() {
  const [scrollY, setScrollY] = useState(0);
  const [calculatorStep, setCalculatorStep] = useState<Step>(1);
  const calculatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero + Calculator - with margins */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <HeroSection
          calculatorRef={calculatorRef}
          calculatorStep={calculatorStep}
          setCalculatorStep={setCalculatorStep}
          scrollY={scrollY}
        />
      </div>

      {/* How It Works - FULL WIDTH background, content with margins */}
      <div className="relative bg-muted/40">
        <SectionDivider variant="gradient" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <HowItWorks />
        </div>
      </div>

      {/* Products Grid - with margins */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative">
          <SectionDivider variant="gradient" />
          <Section size="md">
            <OfferGrid />
          </Section>
        </div>
      </div>

      {/* Catering Info - FULL WIDTH background */}
      <div className="relative bg-muted/40">
        <SectionDivider variant="gradient" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <CateringInfoSection
            calculatorRef={calculatorRef}
            setCalculatorStep={setCalculatorStep}
          />
        </div>
      </div>

      {/* FAQ - with margins */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative">
          <SectionDivider variant="gradient" />
          <FAQ />
        </div>
      </div>

      {/* Footer - full width */}
      <Footer />
    </div>
  );
}
