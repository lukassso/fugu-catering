import { z } from "zod";

const commonFields = {
    email: z.string().email({ message: "Proszę podać prawidłowy adres email." }),
    phone: z.string().min(9, { message: "Proszę podać prawidłowy numer telefonu." }),
    notes: z.string().optional(),
    recommendation: z.string().optional(),
};

const termsField = z.boolean().refine((val) => val === true, {
    message: "Akceptacja warunków jest wymagana.",
});

export const reservationSchema = z.object({
    ...commonFields,
    name: z.string().min(3, { message: "Imię i nazwisko musi mieć co najmniej 3 znaki." }),
    date: z.string().min(1, { message: "Data jest wymagana." }),
    terms: termsField,
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;

export const detailedReservationSchema = z.object({
    ...commonFields,
    eventName: z.string().min(1, { message: "Nazwa imprezy jest wymagana." }),
    eventDate: z.string().min(1, { message: "Data jest wymagana." }),
    eventTime: z.string().min(1, { message: "Godzina jest wymagana." }),
    location: z.string().min(1, { message: "Miejsce jest wymagane." }),
    organizerName: z.string().min(3, { message: "Imię i nazwisko musi mieć co najmniej 3 znaki." }),
    includeRecommendation: z.boolean().optional(),
    acceptTerms: termsField,
});

export type DetailedReservationFormValues = z.infer<typeof detailedReservationSchema>;