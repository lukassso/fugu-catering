import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function HowItWorks() {
    return (
        <section className="w-full py-12">
            <div className="flex flex-col gap-16">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">Jak to działa?</h2>
                    <p className="text-muted-foreground text-lg">
                        Prosty proces od pomysłu do realizacji. Skupiamy się na Twojej wygodzie.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <Card className="bg-card/50 backdrop-blur-sm border-muted/40 relative overflow-hidden group hover:border-primary/50 transition-colors">
                        <CardContent className="p-8 relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold">Opis wydarzenia</h3>
                                    <span className="text-6xl font-bold text-primary/10 absolute top-2 right-4 group-hover:text-primary/20 transition-colors select-none">
                                        01
                                    </span>
                                </div>
                                <p className="text-muted-foreground relative z-10">
                                    Wpisz liczbę gości i preferencje w naszym kalkulatorze.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Step 2 */}
                    <Card className="bg-card/50 backdrop-blur-sm border-muted/40 relative overflow-hidden group hover:border-primary/50 transition-colors">
                        <CardContent className="p-8 relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold">Otrzymaj ofertę</h3>
                                    <span className="text-6xl font-bold text-primary/10 absolute top-2 right-4 group-hover:text-primary/20 transition-colors select-none">
                                        02
                                    </span>
                                </div>
                                <p className="text-muted-foreground relative z-10">
                                    AI natychmiast wygeneruje idealnie dopasowane menu.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Step 3 */}
                    <Card className="bg-card/50 backdrop-blur-sm border-muted/40 relative overflow-hidden group hover:border-primary/50 transition-colors">
                        <CardContent className="p-8 relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold">Zamów i ciesz się</h3>
                                    <span className="text-6xl font-bold text-primary/10 absolute top-2 right-4 group-hover:text-primary/20 transition-colors select-none">
                                        03
                                    </span>
                                </div>
                                <p className="text-muted-foreground relative z-10">
                                    Potwierdź zamówienie, a my zajmiemy się resztą.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Why Fugu Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8">
                    <div className="relative flex justify-center lg:justify-center">
                        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                            <Image
                                src="/image 35.svg"
                                alt="Sushi Plate"
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold">Dlaczego Fugu?</h2>
                        <ul className="space-y-6">
                            {[
                                "Świeże składniki dostarczane codziennie",
                                "Autorskie przepisy naszych mistrzów sushi",
                                "Elastyczność w dopasowaniu do diety (wege, bez glutenu)",
                                "Ekologiczne opakowania",
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-4 text-lg text-muted-foreground"
                                >
                                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
