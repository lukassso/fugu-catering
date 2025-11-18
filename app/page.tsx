"use client";

import { useState } from "react";
import { quickQueries } from "@/data/catering";
import { parseQuery, generateRecommendation } from "@/lib/catering-logic";
import { toast } from "sonner";

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
import { ReservationForm } from "@/components/ReservationForm";
import Image from "next/image";

export default function CateringPage() {
  const [query, setQuery] = useState("");
  const [recommendation, setRecommendation] = useState("");
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

      <div className="container mx-auto flex min-h-screen flex-col items-center py-8">
        <div
          className="absolute top-0 right-0 h-3/4 w-1/2 bg-no-repeat bg-contain bg-right-top pointer-events-none -z-1"
          style={{ backgroundImage: "url('/bcg1.svg')" }}
        ></div>
        <header className="mb-8">
          <div className="flex justify-center">
            <Image
              src="/logo.svg"
              alt="Fugu Sushi Logo"
              width={128}
              height={105}
              className="mb-24 z-0"
            />
          </div>
          <div className="text-left mb-4 px-4 ">
            <h1 className="mb-2 text-4xl font-bold tracking-tighter ">
              Opisz swój event i sprawdź co proponujemy
            </h1>
            <h2 className="text-lg text-muted-foreground">
              Inteligentny kalkulator zamówień dla grup
            </h2>
          </div>
        </header>

        <main className="px-4 w-full max-w-4xl space-y-6 z-0">
          <Card>
            <CardHeader>
              <CardTitle>Krok 1: Opisz swoje potrzeby</CardTitle>
              <CardDescription>
                Podaj liczbę osób i preferencje, a my zajmiemy się resztą.
              </CardDescription>
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
                  <Button
                    key={q.value}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(q.value)}
                  >
                    {q.text}
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full"
              >
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
                    <p className="text-muted-foreground">
                      Analizuję Twoje zapytanie...
                    </p>
                  </div>
                ) : (
                  <div className="rounded-md bg-muted p-4">
                    <pre className="whitespace-pre-wrap font-mono text-sm">
                      {recommendation}
                    </pre>
                  </div>
                )}
              </CardContent>
              {!isLoading && showRecommendation && (
                <CardFooter className="flex-col gap-3 sm:flex-row">
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

              <p className="mt-4 text-xlleading-relaxed">
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
    </>
  );
}
