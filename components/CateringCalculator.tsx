"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

import { Sparkles, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { reservationSchema, type ReservationFormValues } from "@/lib/validators"
import { submitCateringRequest, generateCateringProposal } from "@/lib/actions"
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const DEFAULT_CHIPS = [
    "20 osób, mix rolek",
    "15 osób, 5 wegetarian",
    "10 osób, bez surowej ryby",
    "30 osób, impreza firmowa",
]

const PLACEHOLDERS = [
    "np. 18 osób, większość pieczone, 4 osoby wege",
    "np. 30 osób, impreza firmowa, bez surowych",
    "np. 12 osób, same rolki w tempurze",
    "np. 50 osób, mix zestawów, dużo wege"
]



export type Step = 1 | 2 | 3

const Loader = () => (
    <div className="flex justify-center items-center py-12">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
    </div>
)

const useTypewriter = (phrases: string[], typingSpeed = 50, deletingSpeed = 30, pauseDuration = 2000) => {
    const [text, setText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [loopNum, setLoopNum] = useState(0)
    const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed)

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % phrases.length
            const fullText = phrases[i]

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            )

            setTypingSpeedState(isDeleting ? deletingSpeed : typingSpeed)

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), pauseDuration)
            } else if (isDeleting && text === "") {
                setIsDeleting(false)
                setLoopNum(loopNum + 1)
            }
        }

        const timer = setTimeout(handleType, typingSpeedState)
        return () => clearTimeout(timer)
    }, [text, isDeleting, loopNum, phrases, typingSpeed, deletingSpeed, pauseDuration, typingSpeedState])

    return text
}

export interface CateringCalculatorProps {
    externalStep?: Step
    onStepChange?: (step: Step) => void
}

export const CateringCalculator = ({ externalStep, onStepChange }: CateringCalculatorProps) => {
    interface HistoryItem {
        query: string
        response: string
    }

    const [internalStep, setInternalStep] = useState<Step>(1)
    const containerRef = useRef<HTMLDivElement>(null)

    const step = externalStep ?? internalStep

    const setStep = (s: Step) => {
        if (onStepChange) {
            onStepChange(s)
        } else {
            setInternalStep(s)
        }
    }

    const [inputValue, setInputValue] = useState("")
    const [recommendation, setRecommendation] = useState("")
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [isCopied, setIsCopied] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [attachRecommendation, setAttachRecommendation] = useState(true)

    const form = useForm<ReservationFormValues>({
        resolver: zodResolver(reservationSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            date: "",
            notes: "",
            recommendation: "",
            terms: false,
        },
    })

    const placeholderText = useTypewriter(PLACEHOLDERS)

    // Load history from localStorage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem("catering_history")
        if (savedHistory) {
            try {
                const parsed = JSON.parse(savedHistory)
                // Handle migration from old string[] format
                if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string') {
                    localStorage.removeItem("catering_history")
                    setHistory([])
                } else {
                    setHistory(parsed as HistoryItem[])
                }
            } catch (e) {
                console.error("Failed to parse history", e)
            }
        }
    }, [])

    const saveToHistory = (query: string, response: string) => {
        const newItem = { query, response }
        const newHistory = [newItem, ...history.filter(h => h.query !== query)].slice(0, 5)
        setHistory(newHistory)
        localStorage.setItem("catering_history", JSON.stringify(newHistory))
    }

    const handleGenerate = async () => {
        if (!inputValue.trim()) return

        setIsLoading(true)
        try {
            const result = await generateCateringProposal(inputValue)
            if (result.success && result.recommendation) {
                setRecommendation(result.recommendation)
                saveToHistory(inputValue, result.recommendation)
                setStep(2)
            } else {
                toast.error("Błąd generowania", {
                    description: result.message || "Spróbuj ponownie później."
                })
            }
        } catch (error) {
            console.error(error)
            toast.error("Wystąpił błąd", {
                description: "Nie udało się połączyć z serwerem."
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmit(data: ReservationFormValues) {
        setIsLoading(true)

        // If user wants to attach recommendation, ensure it's in the data
        const finalData = {
            ...data,
            recommendation: attachRecommendation ? recommendation : undefined,
            query: inputValue
        }

        const result = await submitCateringRequest(finalData)

        setIsLoading(false)

        if (result.success) {
            toast.success("Sukces!", {
                description: result.message,
            })
            // Optional: Reset form or redirect
            handleReset()
        } else {
            toast.error("Błąd", {
                description: result.message,
            })
        }
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(recommendation)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy", err)
        }
    }

    const handleBook = () => {
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        setIsLoading(true)
        setTimeout(() => {
            setStep(3)
            setIsLoading(false)
        }, 600)
    }

    const handleReset = () => {
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        setStep(1)
        setInputValue("")
        setRecommendation("")
    }

    const truncate = (str: string, n: number) => {
        return str.length > n ? str.slice(0, n) + "..." : str
    }

    const handleHistoryClick = (item: HistoryItem) => {
        setInputValue(item.query)
        setRecommendation(item.response)
        setStep(3) // Go directly to reservation form as requested
    }

    const renderStep1 = () => (
        <>
            <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-foreground">Krok 1: Opisz swoje potrzeby</h3>
                <p className="text-xs text-muted-foreground">Podaj liczbę osób i preferencje, a my zajmiemy się resztą.</p>
            </div>

            <div className="mb-4">
                <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    placeholder={placeholderText}
                    className="min-h-[80px] w-full rounded-xl border-none bg-muted/50 px-4 py-3 text-foreground placeholder:text-muted-foreground shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 resize-y"
                />
            </div>

            <div className="mb-8 space-y-4">
                <div>
                    <p className="mb-2 text-xs text-muted-foreground uppercase tracking-wider">Przykładowe zapytania:</p>
                    <div className="flex flex-wrap gap-2">
                        {DEFAULT_CHIPS.map((chip) => (
                            <button
                                key={chip}
                                onClick={() => setInputValue(chip)}
                                className={cn(
                                    "chip cursor-pointer px-4 py-2.5",
                                    inputValue === chip ? "chip-active" : "chip-default"
                                )}
                            >
                                {chip}
                            </button>
                        ))}
                    </div>
                </div>

                {history.length > 0 && (
                    <div>
                        <p className="mb-2 text-xs text-muted-foreground uppercase tracking-wider">Twoja historia:</p>
                        <div className="flex flex-wrap gap-2">
                            {history.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleHistoryClick(item)}
                                    className="chip cursor-pointer chip-history px-4 py-2.5"
                                    title={item.query}
                                >
                                    {truncate(item.query, 30)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Button
                onClick={handleGenerate}
                disabled={isLoading}
                variant='default'
                className="w-full text-xl font-medium h-14 rounded-xl transition-all duration-200 shadow-lg btn-primary"
            >
                {isLoading ? (
                    "Generowanie..."
                ) : (
                    <span className="flex items-center gap-2">
                        Generuj rekomendację <Sparkles className="w-6 h-6" />
                    </span>
                )}
            </Button>
        </>
    )

    const renderStep2 = () => (
        <>
            <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-foreground">Krok 2: Twoja rekomendacja</h3>
                <div className="bg-muted rounded-xl p-4 text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed border border-border max-h-[400px] overflow-y-auto custom-scrollbar">
                    {recommendation}
                </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                >
                    {isCopied ? "Skopiowano! ✓" : "Skopiuj"}
                </Button>
                <Button
                    onClick={handleBook}
                    variant="default"
                    size="lg"
                    className="flex-1"
                >
                    Rezerwuj imprezę
                </Button>
                <Button
                    onClick={handleReset}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                >
                    Zapytaj ponownie
                </Button>
            </div>
        </>
    )

    const renderStep3 = () => (
        <Form {...form}>
            <div className="mb-6">
                <h3 className="mb-4 text-lg font-medium text-foreground">Rekomendacja i Zgody</h3>

                <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Twoje zapytanie:</p>
                    <div className="bg-muted/50 rounded-lg p-3 text-sm text-foreground italic border border-border">
                        {inputValue}
                    </div>
                </div>

                <div className="bg-muted rounded-xl p-6 mb-4 border-l-4 border-primary text-sm whitespace-pre-wrap font-mono leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar">
                    {recommendation}
                </div>

                <div className="space-y-3 mb-8">
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="attach"
                            checked={attachRecommendation}
                            onCheckedChange={(c) => setAttachRecommendation(!!c)}
                            className="border-input bg-background data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label htmlFor="attach" className="text-sm text-muted-foreground font-normal cursor-pointer hover:text-foreground transition-colors">
                            Załącz powyższą rekomendację do zgłoszenia
                        </Label>
                    </div>

                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="mt-1 border-input bg-background data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-bold text-foreground cursor-pointer">
                                        Akceptuję warunki *
                                    </FormLabel>
                                    <p className="text-xs text-muted-foreground">
                                        Rozumiem, że jest to wstępna propozycja, a ostateczne zamówienie zostanie potwierdzone kontaktowo.
                                    </p>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <h3 className="mb-4 text-lg font-medium text-foreground">Dodatkowe Informacje</h3>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Imię i nazwisko" {...field} className="input-unified" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Email" type="email" {...field} className="input-unified" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Telefon" type="tel" {...field} className="input-unified" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Data" type="date" {...field} className="input-unified" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Dodatkowe uwagi (opcjonalnie)" rows={3} {...field} className="w-full rounded-xl border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            onClick={() => setStep(2)}
                            variant="outline"
                            size="lg"
                            className="flex-1"
                        >
                            Wróć
                        </Button>
                        <Button
                            type="submit"
                            variant="default"
                            size="lg"
                            className="flex-[2] btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? "Wysyłanie..." : "Wyślij zgłoszenie"}
                        </Button>
                    </div>
                </form>
            </div>
        </Form>
    )

    return (
        <Card ref={containerRef} className="w-full max-w-2xl rounded-2xl border border-border bg-card/50 p-4 sm:p-8 backdrop-blur-sm transition-all duration-500 shadow-xl scroll-mt-24">
            {/* Stepper Indicator */}
            <div className="flex items-center justify-between mb-8 px-4 relative">
                <div className="absolute left-0 top-1/2 w-full h-0.5 bg-muted -z-10"></div>
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                            step >= s ? 'bg-primary text-primary-foreground scale-110' : 'bg-muted text-muted-foreground'
                        )}
                    >
                        {s}
                    </div>
                ))}
            </div>

            {isLoading ? <Loader /> : (
                <>
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                </>
            )}
        </Card>
    )
}
