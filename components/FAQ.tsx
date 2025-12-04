"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { faqData, type FAQItem } from "@/data/faq";
import { Section, SectionHeader, FloatingDecorator } from "@/components/ui/section";
import { CTAButtons } from "@/components/ui/cta-buttons";
import { cn } from "@/lib/utils";

// ============================================================================
// DETAIL CONTENT - Renders different content types (Single Responsibility)
// ============================================================================

interface DetailContentProps {
    detail: NonNullable<FAQItem["details"]>[number];
}

function DetailContent({ detail }: DetailContentProps) {
    if (!detail) return null;

    switch (detail.type) {
        case "text":
            return (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>{detail.content as string}</ReactMarkdown>
                </div>
            );

        case "list":
            return (
                <ul className="space-y-2 ml-4">
                    {(detail.content as string[]).map((item, index) => (
                        <li key={index} className="text-sm leading-relaxed flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            <span className="prose prose-sm max-w-none dark:prose-invert inline">
                                <ReactMarkdown>{item}</ReactMarkdown>
                            </span>
                        </li>
                    ))}
                </ul>
            );

        case "table":
            const tableContent = detail.content as {
                headers: string[];
                rows: string[][];
            };
            return (
                <div className="overflow-x-auto my-4 rounded-lg border border-border">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-border bg-muted/50">
                                {tableContent.headers.map((header, index) => (
                                    <th
                                        key={index}
                                        className="text-left p-3 font-semibold text-sm"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent.rows.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                                >
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="p-3 text-sm">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        default:
            return null;
    }
}

// ============================================================================
// FAQ ITEM - Single FAQ accordion item (Single Responsibility)
// ============================================================================

interface FAQItemComponentProps {
    item: FAQItem;
}

function FAQItemComponent({ item }: FAQItemComponentProps) {
    return (
        <AccordionItem value={item.id} className="border-b border-border/50 last:border-0">
            <AccordionTrigger
                className={cn(
                    "text-left hover:no-underline py-4 px-3",
                    "hover:bg-muted/50 rounded-lg transition-all duration-200",
                    "data-[state=open]:bg-muted/30"
                )}
            >
                <span className="font-medium text-base text-foreground">{item.question}</span>
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-4">
                <div className="space-y-4 pt-2">
                    <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
                        <ReactMarkdown>{item.answer}</ReactMarkdown>
                    </div>
                    {item.details && item.details.length > 0 && (
                        <div className="space-y-3 mt-4 pl-2 border-l-2 border-primary/20">
                            {item.details.map((detail, index) => (
                                <DetailContent key={index} detail={detail} />
                            ))}
                        </div>
                    )}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}

// ============================================================================
// CONTACT CTA - Simplified contact section (Single Responsibility)
// ============================================================================

function ContactCTA() {
    return (
        <Card className="mt-10 bg-gradient-to-br from-primary/5 via-background to-primary/10 border-primary/20">
            <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                    Nie znalazłeś odpowiedzi?
                </h3>
                <p className="text-muted-foreground mb-5 text-sm max-w-md mx-auto">
                    Skontaktuj się z nami bezpośrednio - chętnie odpowiemy na wszystkie pytania
                </p>
                <CTAButtons
                    variant="contact"
                    showReserve={false}
                    showPhone={true}
                    showEmail={true}
                    className="max-w-md mx-auto"
                />
            </CardContent>
        </Card>
    );
}

// ============================================================================
// MAIN FAQ COMPONENT
// ============================================================================

export function FAQ() {
    const [openItems, setOpenItems] = useState<string[]>([]);

    return (
        <Section size="lg" id="faq" className="relative">
            <FloatingDecorator position="top-left" size="lg" className="opacity-20" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <SectionHeader
                    title="Najczęściej Zadawane"
                    highlight="Pytania"
                    subtitle="Znajdź odpowiedzi na najważniejsze pytania dotyczące naszego cateringu sushi"
                />

                {/* FAQ Accordion Card */}
                <Card className="shadow-lg border-border/50 overflow-hidden">
                    <CardContent className="p-4 md:p-6">
                        <Accordion
                            type="multiple"
                            value={openItems}
                            onValueChange={setOpenItems}
                            className="space-y-1"
                        >
                            {faqData.map((item) => (
                                <FAQItemComponent key={item.id} item={item} />
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>

                {/* Contact CTA - simplified */}
                <ContactCTA />
            </div>
        </Section>
    );
}
