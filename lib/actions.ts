"use server";

import { Resend } from 'resend';
import * as validators from './validators';

type FormSubmissionResult = {
    success: boolean;
    message: string;
};

export async function submitCateringRequest(
    data: validators.ReservationFormValues
): Promise<FormSubmissionResult> {

    const resend = new Resend(process.env.RESEND_API_KEY);
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!process.env.RESEND_API_KEY || !adminEmail) {
        const errorMessage = "Błąd konfiguracji serwera: brak kluczy API lub emaila admina.";
        console.error(errorMessage);
        return { success: false, message: errorMessage };
    }

    const result = validators.reservationSchema.safeParse(data);

    if (!result.success) {
        console.error("Błąd walidacji po stronie serwera:", result.error.flatten().fieldErrors);
        return { success: false, message: "Przesłano nieprawidłowe dane." };
    }

    const { eventName, organizerName, email, phone, notes, recommendation } = result.data;

    try {
        const { data, error } = await resend.emails.send({
            from: 'Fugu Catering <onboarding@resend.dev>',
            to: [adminEmail],
            subject: `Nowe zapytanie cateringowe: ${eventName}`,
            html: `<div>... (Twój kod HTML emaila) ...</div>`,
        });

        if (error) {
            console.error("Błąd API Resend:", error);
            return { success: false, message: "Nie udało się wysłać emaila." };
        }

        return { success: true, message: "Formularz został wysłany pomyślnie!" };

    } catch (exception) {
        console.error("Krytyczny błąd podczas wysyłania emaila:", exception);
        return { success: false, message: "Wystąpił nieoczekiwany błąd serwera." };
    }
}