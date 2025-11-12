"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const formSchema = z.object({
  eventName: z.string().min(3, { message: "Nazwa musi mieć co najmniej 3 znaki." }),
  eventDate: z.string().min(1, { message: "Data jest wymagana." }),
  eventTime: z.string().min(1, { message: "Godzina jest wymagana." }),
  location: z.string().min(5, { message: "Lokalizacja musi mieć co najmniej 5 znaków." }),
  organizerName: z.string().min(3, { message: "Imię i nazwisko są wymagane." }),
  email: z.string().email({ message: "Nieprawidłowy adres email." }),
  phone: z.string().min(9, { message: "Numer telefonu jest wymagany." }),
  notes: z.string().optional(),
  includeRecommendation: z.boolean().default(true),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Musisz zaakceptować warunki.",
  }),
});

interface ReservationFormProps {
  recommendation: string;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export function ReservationForm({ recommendation, onClose, onSubmitSuccess }: ReservationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const payload = {
      ...values,
      sushiRecommendation: values.includeRecommendation ? recommendation : null,
      timestamp: new Date().toISOString(),
    };
    
    console.log("Wysyłam zgłoszenie:", payload);

    // Symulacja wysyłania danych
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess();
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
        <FormField name="eventName" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Nazwa imprezy *</FormLabel>
            <FormControl><Input placeholder="Np. Urodziny Kasi" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}/>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField name="eventDate" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Data imprezy *</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField name="eventTime" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Godzina *</FormLabel>
              <FormControl><Input type="time" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}/>
        </div>
        
        <FormField name="location" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Miejsce/Adres *</FormLabel>
            <FormControl><Textarea placeholder="Adres dostawy..." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}/>

        {/* ... reszta pól formularza w ten sam sposób ... */}
        <h3 className="pt-4 text-lg font-semibold">Dane Kontaktowe</h3>
        <FormField name="organizerName" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Imię i Nazwisko *</FormLabel>
            <FormControl><Input placeholder="Jan Kowalski" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}/>
        <FormField name="email" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Email *</FormLabel>
            <FormControl><Input placeholder="email@example.com" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}/>
        <FormField name="phone" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Numer telefonu *</FormLabel>
            <FormControl><Input placeholder="123 456 789" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}/>

        <h3 className="pt-4 text-lg font-semibold">Rekomendacja i Zgody</h3>
        <div className="rounded-md border-l-4 border-green-500 bg-muted p-4">
          <pre className="whitespace-pre-wrap font-mono text-sm text-muted-foreground">{recommendation}</pre>
        </div>
        
        <FormField name="includeRecommendation" control={form.control} render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
            <FormLabel className="font-normal">Załącz powyższą rekomendację do zgłoszenia</FormLabel>
          </FormItem>
        )}/>
        <FormField name="acceptTerms" control={form.control} render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Akceptuję warunki *</FormLabel>
              <p className="text-sm text-muted-foreground">Rozumiem, że jest to wstępna propozycja.</p>
            </div>
            <FormMessage />
          </FormItem>
        )}/>
        
        <FormField name="notes" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Dodatkowe informacje (opcjonalnie)</FormLabel>
            <FormControl><Textarea placeholder="Alergie, preferencje..." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}/>

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
