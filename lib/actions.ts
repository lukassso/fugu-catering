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

    const { name, email, phone, date, notes, recommendation } = result.data;

    try {
        const { data, error } = await resend.emails.send({
            from: 'Fugu Catering <onboarding@resend.dev>',
            to: [adminEmail],
            subject: `Nowe zapytanie cateringowe od ${name}`,
            html: `
        <div>
          <h1>Nowe zapytanie cateringowe od <strong>${name}</strong></h1>
          <hr>
          <h2>Szczegóły:</h2>
          <ul>
            <li><strong>Data:</strong> ${date}</li>
            <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
            <li><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></li>
          </ul>
          <h2>Dodatkowe uwagi:</h2>
          <p>${notes || 'Brak uwag'}</p>
          <hr>
          <h2>Wygenerowana rekomendacja sushi:</h2>
          <pre style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${recommendation || 'Brak rekomendacji'}</pre>
        </div>
      `,
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