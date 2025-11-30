'use client';

import React, { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { menuData } from '@/data/catering';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const OfferGrid = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isDense, setIsDense] = useState(false); // false = 3 cols, true = 4 cols

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

    return (
        <div className="w-full py-8 relative">
            <h2 className="text-4xl font-bold mb-8 text-foreground">Produkty</h2>

            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-border pb-4 gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                            <circle cx="14" cy="6" r="2" fill="currentColor" />
                            <circle cx="8" cy="12" r="2" fill="currentColor" />
                            <circle cx="16" cy="18" r="2" fill="currentColor" />
                        </svg>
                        Filtruj
                        {selectedTags.length > 0 && (
                            <Badge variant="secondary" className="ml-1 bg-background text-foreground text-[10px] px-1.5 py-0.5 h-auto">
                                {selectedTags.length}
                            </Badge>
                        )}
                    </Button>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground overflow-x-auto">
                    <span className="whitespace-nowrap">{filteredAndSortedData.length} produktów</span>



                    <div className="hidden md:flex items-center gap-2 border-l border-border pl-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsDense(false)}
                            className={cn("h-8 w-8", !isDense ? "text-foreground" : "text-muted-foreground")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="3" rx="2" />
                            </svg>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsDense(true)}
                            className={cn("h-8 w-8", isDense ? "text-foreground" : "text-muted-foreground")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="7" height="7" x="3" y="3" rx="1" />
                                <rect width="7" height="7" x="14" y="3" rx="1" />
                                <rect width="7" height="7" x="14" y="14" rx="1" />
                                <rect width="7" height="7" x="3" y="14" rx="1" />
                            </svg>
                        </Button>
                    </div>


                </div>
            </div>

            {/* Grid */}
            <div className={cn(
                "grid grid-cols-1 gap-8 transition-all duration-300",
                isDense ? "md:grid-cols-4" : "md:grid-cols-3"
            )}>
                {filteredAndSortedData.map((item, index) => {
                    const isLink = !!item.link;
                    const Wrapper = isLink ? 'a' : 'div';

                    return (
                        <Wrapper
                            key={index}
                            href={isLink ? item.link : undefined}
                            target={isLink ? "_blank" : undefined}
                            rel={isLink ? "noopener noreferrer" : undefined}
                            className={cn(
                                "group bg-card text-card-foreground rounded-xl overflow-hidden shadow-sm border border-border flex flex-col h-full transition-all hover:shadow-md hover:-translate-y-1 duration-300",
                                isLink ? "cursor-pointer" : "cursor-default"
                            )}
                        >
                            <div className="p-6 flex-1">
                                <h3 className="text-lg font-bold mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">{item.name}</h3>
                                <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">{item.category} • {item.pieceCount} szt.</div>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-4">
                                    {item.description}
                                </p>
                            </div>

                            {/* Image Area */}
                            <div className="h-48 bg-muted relative overflow-hidden">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                        <div className="text-muted-foreground/50 text-5xl">🍣</div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex items-center justify-between border-t border-border mt-auto bg-muted/30">
                                <div className="flex flex-wrap gap-1 max-w-[60%]">
                                    {item.tags.slice(0, 2).map((tag, idx) => (
                                        <Badge key={idx} variant="secondary" className="bg-background text-muted-foreground border border-border uppercase tracking-wider text-[10px] px-2 py-0.5 h-auto">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {item.tags.length > 2 && (
                                        <Badge variant="secondary" className="bg-background text-muted-foreground border border-border text-[10px] px-2 py-0.5 h-auto">
                                            +{item.tags.length - 2}
                                        </Badge>
                                    )}
                                </div>
                                <span className="font-bold text-lg text-foreground">{item.price.toFixed(2).replace('.', ',')} zł</span>
                            </div>
                        </Wrapper>
                    );
                })}
            </div>

            {/* Filter Dialog Overlay */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-border">
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <h3 className="text-xl font-bold text-foreground">Filtruj produkty</h3>
                            <button onClick={() => setIsFilterOpen(false)} className="text-muted-foreground hover:text-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                            </button>
                        </div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            <div className="flex flex-wrap gap-3">
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                                            selectedTags.includes(tag)
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "bg-background text-muted-foreground border-border hover:border-primary/50"
                                        )}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 border-t border-border bg-muted/30 flex justify-between items-center">
                            <Button
                                variant="ghost"
                                onClick={() => setSelectedTags([])}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Wyczyść filtry
                            </Button>
                            <Button
                                onClick={() => setIsFilterOpen(false)}
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                Pokaż wyniki ({filteredAndSortedData.length})
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
