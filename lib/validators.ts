import { z } from "zod";

export const reservationSchema = z.object({
    name: z.string().min(3, { message: "Imię i nazwisko musi mieć co najmniej 3 znaki." }),
    email: z.string().email({ message: "Proszę podać prawidłowy adres email." }),
    phone: z.string().min(9, { message: "Proszę podać prawidłowy numer telefonu." }),
    date: z.string().min(1, { message: "Data jest wymagana." }),
    notes: z.string().optional(),
    recommendation: z.string().optional(),
    terms: z.boolean().refine((val) => val === true, {
        message: "Akceptacja warunków jest wymagana.",
    }),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;