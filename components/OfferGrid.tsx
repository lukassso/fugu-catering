'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { menuData } from '@/data/catering';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Loader2, Filter, LayoutGrid, Grid2X2, X } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section';

// ============================================================================
// CONSTANTS
// ============================================================================

const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_COUNT = 8;

// ============================================================================
// SUB-COMPONENTS (Single Responsibility Principle)
// ============================================================================

interface FilterChipProps {
    tag: string;
    isSelected: boolean;
    onToggle: (tag: string) => void;
}

function FilterChip({ tag, isSelected, onToggle }: FilterChipProps) {
    return (
        <button
            onClick={() => onToggle(tag)}
            className={cn(
                "chip cursor-pointer",
                isSelected ? "chip-active" : "chip-default hover:border-primary/50"
            )}
        >
            {tag}
        </button>
    );
}

// ============================================================================
// PRODUCT CARD COMPONENT
// ============================================================================

interface ProductCardProps {
    item: typeof menuData[0];
    isDense: boolean;
}

function ProductCard({ item, isDense }: ProductCardProps) {
    const isLink = !!item.link;
    const Wrapper = isLink ? 'a' : 'div';

    return (
        <Wrapper
            href={isLink ? item.link : undefined}
            target={isLink ? "_blank" : undefined}
            rel={isLink ? "noopener noreferrer" : undefined}
            className={cn(
                "group bg-card text-card-foreground rounded-xl overflow-hidden",
                "shadow-sm border border-border",
                "flex flex-col h-full",
                "transition-all duration-300",
                "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30",
                isLink ? "cursor-pointer" : "cursor-default"
            )}
        >
            {/* Content */}
            <div className={cn("p-4 flex-1", isDense ? "md:p-4" : "md:p-6")}>
                <h3 className={cn(
                    "font-bold mb-2 uppercase tracking-wide",
                    "group-hover:text-primary transition-colors",
                    isDense ? "text-base" : "text-lg"
                )}>
                    {item.name}
                </h3>
                <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">
                    {item.category} • {item.pieceCount} szt.
                </div>
                <p className={cn(
                    "text-muted-foreground mb-4 leading-relaxed line-clamp-3",
                    isDense ? "text-xs" : "text-sm"
                )}>
                    {item.description}
                </p>
            </div>

            {/* Image Area */}
            <div className={cn(
                "bg-muted relative overflow-hidden",
                isDense ? "h-36" : "h-48"
            )}>
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <div className={cn(
                            "text-muted-foreground/50",
                            isDense ? "text-4xl" : "text-5xl"
                        )}>
                            🍣
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className={cn(
                "flex items-center justify-between border-t border-border mt-auto bg-muted/30",
                isDense ? "p-3" : "p-4 md:p-6"
            )}>
                <div className="flex flex-wrap gap-1 max-w-[60%]">
                    {item.tags.slice(0, isDense ? 1 : 2).map((tag, idx) => (
                        <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-background text-muted-foreground border border-border uppercase tracking-wider text-[10px] px-2 py-0.5 h-auto"
                        >
                            {tag}
                        </Badge>
                    ))}
                    {item.tags.length > (isDense ? 1 : 2) && (
                        <Badge
                            variant="secondary"
                            className="bg-background text-muted-foreground border border-border text-[10px] px-2 py-0.5 h-auto"
                        >
                            +{item.tags.length - (isDense ? 1 : 2)}
                        </Badge>
                    )}
                </div>
                <span className={cn(
                    "font-bold text-foreground",
                    isDense ? "text-base" : "text-lg"
                )}>
                    {item.price.toFixed(2).replace('.', ',')} zł
                </span>
            </div>
        </Wrapper>
    );
}

// ============================================================================
// FILTER DIALOG COMPONENT
// ============================================================================

interface FilterDialogProps {
    isOpen: boolean;
    onClose: () => void;
    allTags: string[];
    selectedTags: string[];
    onToggleTag: (tag: string) => void;
    onClearFilters: () => void;
    resultCount: number;
}

function FilterDialog({
    isOpen,
    onClose,
    allTags,
    selectedTags,
    onToggleTag,
    onClearFilters,
    resultCount,
}: FilterDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h3 className="text-xl font-bold text-foreground">Filtruj produkty</h3>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        aria-label="Zamknij"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tags */}
                <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <div className="flex flex-wrap gap-3">
                        {allTags.map(tag => (
                            <FilterChip
                                key={tag}
                                tag={tag}
                                isSelected={selectedTags.includes(tag)}
                                onToggle={onToggleTag}
                            />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border bg-muted/30 flex justify-between items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={onClearFilters}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Wyczyść filtry
                    </Button>
                    <Button
                        onClick={onClose}
                        className="btn-primary"
                    >
                        Pokaż wyniki ({resultCount})
                    </Button>
                </div>
            </Card>
        </div>
    );
}

// ============================================================================
// MAIN OFFER GRID COMPONENT
// ============================================================================

export const OfferGrid = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isDense, setIsDense] = useState(false);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Extract unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        menuData.forEach(item => item.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }, []);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const filteredAndSortedData = useMemo(() => {
        let data = [...menuData];

        // Filter
        if (selectedTags.length > 0) {
            data = data.filter(item =>
                selectedTags.some(tag => item.tags.includes(tag))
            );
        }

        // Sort A-Z
        data.sort((a, b) => a.name.localeCompare(b.name));

        return data;
    }, [selectedTags]);

    // Reset visible count when filters change
    useEffect(() => {
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    }, [selectedTags]);

    const handleLoadMore = async () => {
        setIsLoadingMore(true);
        // Simulate network delay for better UX
        await new Promise(resolve => setTimeout(resolve, 600));
        setVisibleCount(prev => prev + LOAD_MORE_COUNT);
        setIsLoadingMore(false);
    };

    const visibleData = filteredAndSortedData.slice(0, visibleCount);
    const hasMore = visibleCount < filteredAndSortedData.length;

    return (
        <div className="w-full relative">
            {/* Section Header */}
            <SectionHeader
                title="Nasze"
                highlight="Produkty"
                subtitle="Odkryj pełną ofertę zestawów sushi przygotowanych przez naszych mistrzów"
                className="mb-8"
            />

            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-border pb-4 gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center gap-2 btn-primary"
                    >
                        <Filter className="w-4 h-4" />
                        Filtruj
                        {selectedTags.length > 0 && (
                            <Badge
                                variant="secondary"
                                className="ml-1 bg-background text-foreground text-[10px] px-1.5 py-0.5 h-auto"
                            >
                                {selectedTags.length}
                            </Badge>
                        )}
                    </Button>
                </div>

                <div className="flex items-center gap-4 md:gap-6 text-sm text-muted-foreground">
                    <span className="whitespace-nowrap">
                        {filteredAndSortedData.length} produktów
                    </span>

                    {/* Layout Toggle - Desktop only */}
                    <div className="hidden md:flex items-center gap-2 border-l border-border pl-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsDense(false)}
                            className={cn("h-8 w-8", !isDense ? "text-foreground bg-muted" : "text-muted-foreground")}
                            aria-label="Widok standardowy"
                        >
                            <Grid2X2 className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsDense(true)}
                            className={cn("h-8 w-8", isDense ? "text-foreground bg-muted" : "text-muted-foreground")}
                            aria-label="Widok kompaktowy"
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className={cn(
                "grid grid-cols-1 gap-6 transition-all duration-300",
                isDense ? "md:grid-cols-4 gap-4" : "md:grid-cols-3 gap-6 md:gap-8"
            )}>
                {visibleData.map((item, index) => (
                    <ProductCard
                        key={item.name + index}
                        item={item}
                        isDense={isDense}
                    />
                ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="mt-12 flex justify-center">
                    <Button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        variant="default"
                        size="lg"
                        className="min-w-[200px] h-12 text-base font-medium btn-primary"
                    >
                        {isLoadingMore ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Ładowanie...
                            </>
                        ) : (
                            `Załaduj więcej (${filteredAndSortedData.length - visibleCount})`
                        )}
                    </Button>
                </div>
            )}

            {/* Filter Dialog */}
            <FilterDialog
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                allTags={allTags}
                selectedTags={selectedTags}
                onToggleTag={toggleTag}
                onClearFilters={() => setSelectedTags([])}
                resultCount={filteredAndSortedData.length}
            />
        </div>
    );
};
