"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { Section, SectionHeader, SectionDivider, FloatingDecorator } from "@/components/ui/section";
import { InfoCard } from "@/components/ui/step-card";
import { CTAButtons, PHONE_NUMBER, PHONE_DISPLAY } from "@/components/ui/cta-buttons";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

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

function HeroSection({ calculatorRef, calculatorStep, setCalculatorStep }: Omit<HeroSectionProps, 'scrollY'>) {
  return (
    <Section size="sm" className="relative">
      {/* Content - Left aligned */}
      <div className="relative z-10 max-w-2xl">
        {/* Logo */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <Image
            src="/logo-black.svg"
            alt="Fugu Sushi Logo"
            width={128}
            height={105}
            priority
            className="mx-auto lg:mx-0"
          />
        </div>

        {/* Hero Text */}
        <header className="mb-8 md:mb-12 space-y-5 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
            Idealne menu sushi na Twoją imprezę{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              w 2 minuty
            </span>
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
            Nie trać czasu na wybieranie rolek. Opisz swoją okazję, a my stworzymy ofertę skrojoną pod Twoich gości i budżet
          </h2>
        </header>

        {/* Calculator */}
        <div
          ref={calculatorRef}
          className="scroll-mt-24 w-full"
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

        {/* AI Greener Credit */}
        <div className="pt-4 border-t border-border/30">
          <a
            href="https://aigreener.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground/70 hover:text-muted-foreground transition-colors group"
          >
            <span>Stworzone przez AIgreener.com</span>
            <Image
              src="/logo-aigreener.webp"
              alt="AI Greener"
              width={20}
              height={20}
              className="opacity-60 group-hover:opacity-100 transition-opacity"
            />
          </a>
        </div>
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
      {/* Hero Section Wrapper - relative for absolute positioned parallax image */}
      <div className="relative">
        {/* Parallax Background Image - positioned to right edge of VIEWPORT */}
        <div
          className="hidden lg:block absolute top-0 right-0 w-[50vw] h-full min-h-[700px] pointer-events-none z-0"
        >
          <div
            className="absolute inset-0 bg-no-repeat bg-contain bg-right-top transition-transform duration-100 ease-out"
            style={{
              backgroundImage: "url('/bcg1.svg')",
              transform: `translateY(${scrollY * 0.35}px)`,
            }}
          />
        </div>

        {/* Hero + Calculator - with margins */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <HeroSection
            calculatorRef={calculatorRef}
            calculatorStep={calculatorStep}
            setCalculatorStep={setCalculatorStep}
          />
        </div>
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

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Footer - full width */}
      <Footer />
    </div>
  );
}
