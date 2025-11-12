"use client";

import { useState } from 'react';
import { quickQueries } from '@/data/catering';
import { parseQuery, generateRecommendation } from '@/lib/catering-logic';
import { toast } from "sonner"; 

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ReservationForm } from '@/components/ReservationForm';

export default function CateringPage() {
  const [query, setQuery] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerate = () => {
    if (!query.trim()) {
      toast.error("Błąd", { description: "Proszę wpisać zapytanie!" });
      return;
    }
    setIsLoading(true);
    setShowRecommendation(false);
    setTimeout(() => {
      const parsed = parseQuery(query);
      const result = generateRecommendation(parsed);
      setRecommendation(result);
      setIsLoading(false);
      setShowRecommendation(true);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(recommendation);
    toast.success("Skopiowano!", { description: "Rekomendacja jest w Twoim schowku." });
  };

  const handleReservationSuccess = () => {
    setIsModalOpen(false);
    toast.success("Sukces!", { description: "Twoje zgłoszenie zostało wysłane. Skontaktujemy się wkrótce." });
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>📅 Formularz Rezerwacji Imprezy</DialogTitle>
          </DialogHeader>
          <ReservationForm
            recommendation={recommendation}
            onClose={() => setIsModalOpen(false)}
            onSubmitSuccess={handleReservationSuccess}
          />
        </DialogContent>
      </Dialog>

      <div className="container mx-auto flex min-h-screen flex-col items-center py-8">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tighter">🍣 Fugu Sushi Catering Assistant</h1>
          <p className="text-lg text-muted-foreground">Inteligentny kalkulator zamówień dla grup</p>
        </header>

        <main className="w-full max-w-4xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Krok 1: Opisz swoje potrzeby</CardTitle>
              <CardDescription>Podaj liczbę osób i preferencje, a my zajmiemy się resztą.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={3}
                placeholder="Np. dla 18 osób, 4 wege, 2 dzieci"
              />
              <div className="flex flex-wrap gap-2">
                {quickQueries.map((q) => (
                  <Button key={q.value} variant="outline" size="sm" onClick={() => setQuery(q.value)}>
                    {q.text}
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
                {isLoading ? "Generowanie..." : "✨ Generuj Rekomendację"}
              </Button>
            </CardFooter>
          </Card>

          {(isLoading || showRecommendation) && (
            <Card>
              <CardHeader>
                <CardTitle>Krok 2: Twoja rekomendacja</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <p className="text-muted-foreground">Analizuję Twoje zapytanie...</p>
                  </div>
                ) : (
                  <div className="rounded-md bg-muted p-4">
                    <pre className="whitespace-pre-wrap font-mono text-sm">{recommendation}</pre>
                  </div>
                )}
              </CardContent>
              {!isLoading && showRecommendation && (
                <CardFooter className="flex-col gap-3 sm:flex-row">
                  <Button variant="secondary" className="w-full" onClick={handleCopy}>📋 Skopiuj</Button>
                  <Button className="w-full" onClick={() => setIsModalOpen(true)}>📅 Rezerwuj Imprezę</Button>
                </CardFooter>
              )}
            </Card>
          )}
        </main>
        
        <footer className="mt-12 text-center text-sm text-muted-foreground">
            <p>FUGU SUSHI | ul. Chodkiewicza 7, Warszawa | <a href="tel:510219510" className="hover:underline">510 219 510</a></p>
        </footer>
      </div>
    </>
  );
}