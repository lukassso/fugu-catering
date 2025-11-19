"use client";

import { useState } from "react";
import { quickQueries } from "@/data/catering";
import { parseQuery, generateRecommendation } from "@/lib/catering-logic";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ReservationForm } from "@/components/ReservationForm";
import Image from "next/image";

export default function CateringPage() {
  const [query, setQuery] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    toast.success("Skopiowano!", {
      description: "Rekomendacja jest w Twoim schowku.",
    });
  };

  const handleReservationSuccess = () => {
    setIsModalOpen(false);
    toast.success("Sukces!", {
      description:
        "Twoje zgłoszenie zostało wysłane. Skontaktujemy się wkrótce.",
    });
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

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">

        <div
          className="absolute top-0 right-0 w-[60%] h-[80vh] bg-no-repeat bg-contain bg-right-top pointer-events-none z-0 transition-transform duration-75 ease-out"
          style={{
            backgroundImage: "url('/bcg1.svg')",
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        ></div>


        <div className="container mx-auto flex flex-col items-center py-12 relative z-10">
          <header className="mb-12 w-full flex flex-col items-center text-center">
            <div className="mb-8">
              <Image
                src="/logo-black.svg"
                alt="Fugu Sushi Logo"
                width={128}
                height={105}
                className="mb-24 z-0"
              />
            </div>
            <div className="max-w-2xl px-4 space-y-4 text-left">
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground drop-shadow-lg">
                Opisz swój event i sprawdź co proponujemy
              </h1>
              <h2 className="text-lg md:text-xl text-muted-foreground font-light">
                Inteligentny kalkulator zamówień dla grup
              </h2>
            </div>
          </header>

          <main className="px-4 w-full max-w-2xl space-y-8">
            <Card className="bg-white dark:bg-white/10 backdrop-blur-md border-black/10 shadow-2xl">
              <CardHeader className="text-left">
                <CardTitle className="text-foreground font-medium text-base h-6 leading-6">Krok 1: Opisz swoje potrzeby</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Podaj liczbę osób i preferencje, a my zajmiemy się resztą.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="np. 18 osób, większość pieczone, 4 osoby wege"
                  className="border-0 focus-visible:ring-1 focus-visible:ring-primary"
                />
                <div className="flex flex-wrap gap-3">
                  {quickQueries.map((q) => (
                    <Badge
                      key={q.value}
                      variant="secondary"
                      onClick={() => setQuery(q.value)}
                      className={`px-6 py-2 h-auto font-normal cursor-pointer transition-colors ${query === q.value
                        ? "border-primary"
                        : "hover:bg-secondary/80"
                        }`}
                    >
                      {q.text}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-medium h-14 rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary/20"
                >
                  {isLoading ? (
                    "Generowanie..."
                  ) : (
                    <span className="flex items-center gap-2">
                      Generuj rekomendację <Sparkles className="w-6 h-6" />
                    </span>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {(isLoading || showRecommendation) && (
              <Card className="bg-white/80 dark:bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
                <CardHeader className="text-left">
                  <CardTitle className="text-foreground font-medium text-base h-6 leading-6">Krok 2: Twoja rekomendacja</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <p className="text-muted-foreground">
                        Analizuję Twoje zapytanie...
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-muted/50 p-6 border border-border/50">
                      <pre className="whitespace-pre-wrap font-mono text-sm text-foreground">
                        {recommendation}
                      </pre>
                    </div>
                  )}
                </CardContent>
                {!isLoading && showRecommendation && (
                  <CardFooter className="flex-col gap-3 ">
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={handleCopy}
                    >
                      📋 Skopiuj
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => setIsModalOpen(true)}
                    >
                      📅 Rezerwuj Imprezę
                    </Button>
                  </CardFooter>
                )}
              </Card>
            )}

            <section className="py-12">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold tracking-tight m:text-4xl mb-8">
                  Catering Sushi na Imprezy w Warszawie –{" "}
                  <span className="text-primary">
                    Idealny Wybór dla Firm i Eventów
                  </span>
                </h2>

                <p className="mt-4 text-lg leading-relaxed">
                  Szukasz{" "}
                  <strong className="font-extrabold">
                    profesjonalnego cateringu sushi na imprezę w Warszawie lub jej
                    okolicach
                  </strong>
                  ? Oferujemy{" "}
                  <strong className="text-primary">
                    catering sushi dla firm, spotkań biznesowych, eventów oraz
                    prywatnych przyjęć.
                  </strong>
                </p>
                <p className="mt-4 text-lg">
                  Catering sushi to{" "}
                  <strong className="font-semibold">
                    oryginalna i elegancka propozycja
                  </strong>
                  , która zadowoli zarówno miłośników kuchni japońskiej, jak i
                  tych, którzy pragną spróbować czegoś nowego.
                </p>

                <div className="mt-10">
                  <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="flex flex-col space-y-1.5 p-6 border-b">
                      <h3 className="text-2xl font-semibold leading-none tracking-tight text-primary">
                        To Idealne Rozwiązanie na:
                      </h3>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3 list-disc list-inside text-lg">
                        <li>
                          <strong className="">
                            Spotkania biznesowe i konferencje
                          </strong>
                        </li>
                        <li>
                          <strong className="">
                            Eventy firmowe (corporate events)
                          </strong>
                        </li>
                        <li>
                          <strong className="">
                            Imprezy prywatne (przyjęcia, urodziny, wesela)
                          </strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="mt-28 text-2xl font-medium text-center">
                  Postaw na najwyższą jakość i niezapomniane wrażenia smakowe
                  dzięki naszemu cateringowi sushi
                </p>
                <div className="flex flex-col md:flex-row gap-4 mt-12 w-full">
                  <Button
                    variant="default"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full md:flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-medium h-14 rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary/20"
                  >
                    Rezerwuj Imprezę
                  </Button>
                  <Button
                    className="w-full md:flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-medium h-14 rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary/20"
                  >
                    Zadzwoń
                  </Button>
                </div>
              </div>
            </section>
          </main>

          <footer className="mt-12 text-center text-sm text-muted-foreground bottom-0">
            <p>
              FUGU SUSHI | ul. Chodkiewicza 7, Warszawa |{" "}
              <a href="tel:510219510" className="hover:underline">
                510 219 510
              </a>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
