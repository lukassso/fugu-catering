import { z } from "zod";

export const reservationSchema = z.object({
    eventName: z.string().min(3, { message: "Nazwa imprezy musi mieć co najmniej 3 znaki." }),
    eventDate: z.string().min(1, { message: "Data jest wymagana." }),
    eventTime: z.string().min(1, { message: "Godzina jest wymagana." }),
    location: z.string().min(5, { message: "Lokalizacja musi mieć co najmniej 5 znaków." }),
    organizerName: z.string().min(3, { message: "Imię i nazwisko są wymagane." }),
    email: z.string().email({ message: "Proszę podać prawidłowy adres email." }),
    phone: z.string().min(9, { message: "Proszę podać prawidłowy numer telefonu." }),
    notes: z.string().optional(),
    includeRecommendation: z.boolean(),
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: "Akceptacja warunków jest wymagana.",
    }),
    recommendation: z.string(),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;