"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

import { reservationSchema, type ReservationFormValues } from "@/lib/validators";
import { submitCateringRequest } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface ReservationFormProps {
  recommendation: string;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export function ReservationForm({ recommendation, onClose, onSubmitSuccess }: ReservationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      eventName: "",
      eventDate: "",
      eventTime: "",
      location: "",
      organizerName: "",
      email: "",
      phone: "",
      notes: "",
      includeRecommendation: true,
      acceptTerms: false,
      recommendation: recommendation, // Przekazujemy rekomendację do formularza
    },
  });

  async function onSubmit(values: ReservationFormValues) {
    setIsSubmitting(true);

    try {
      const result = await submitCateringRequest(values);

      if (result.success) {
        onSubmitSuccess();
      } else {
        toast.error("Błąd wysyłania", { description: result.message });
      }
    } catch (error) {
      console.error("Błąd po stronie klienta:", error);
      toast.error("Błąd sieciowy", { description: "Nie udało się połączyć z serwerem. Spróbuj ponownie." });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[70vh] overflow-y-auto pr-4">

        <h3 className="text-lg font-semibold">Informacje o Imprezie</h3>
        <FormField control={form.control} name="eventName" render={({ field }) => (
          <FormItem>
            <FormLabel>Nazwa imprezy *</FormLabel>
            <FormControl><Input placeholder="Np. Urodziny Kasi" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField control={form.control} name="eventDate" render={({ field }) => (
            <FormItem>
              <FormLabel>Data imprezy *</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="eventTime" render={({ field }) => (
            <FormItem>
              <FormLabel>Godzina *</FormLabel>
              <FormControl><Input type="time" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="location" render={({ field }) => (
          <FormItem>
            <FormLabel>Miejsce/Adres *</FormLabel>
            <FormControl><Textarea placeholder="Adres dostawy..." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <h3 className="pt-4 text-lg font-semibold">Dane Kontaktowe</h3>
        <FormField control={form.control} name="organizerName" render={({ field }) => (
          <FormItem>
            <FormLabel>Imię i Nazwisko *</FormLabel>
            <FormControl><Input placeholder="Jan Kowalski" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email *</FormLabel>
            <FormControl><Input placeholder="email@example.com" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel>Numer telefonu *</FormLabel>
            <FormControl><Input placeholder="123 456 789" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <h3 className="pt-4 text-lg font-semibold">Rekomendacja i Zgody</h3>
        <div className="rounded-md border-l-4 border-green-500 bg-muted p-4">
          <pre className="whitespace-pre-wrap font-mono text-sm text-muted-foreground">{recommendation}</pre>
        </div>

        <FormField control={form.control} name="includeRecommendation" render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
            <FormLabel className="font-normal">Załącz powyższą rekomendację do zgłoszenia</FormLabel>
          </FormItem>
        )} />

        <FormField control={form.control} name="acceptTerms" render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Akceptuję warunki *</FormLabel>
              <FormDescription>Rozumiem, że jest to wstępna propozycja, a ostateczne zamówienie zostanie potwierdzone kontaktowo.</FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )} />

        <h3 className="pt-4 text-lg font-semibold">Dodatkowe Informacje</h3>
        <FormField control={form.control} name="notes" render={({ field }) => (
          <FormItem>
            <FormLabel>Uwagi (opcjonalnie)</FormLabel>
            <FormControl><Textarea placeholder="Alergie, preferencje dotyczące wasabi, imbiru..." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose}>Anuluj</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Wysyłam...' : 'Wyślij Zgłoszenie'}
          </Button>
        </div>
      </form>
    </Form>
  );
}