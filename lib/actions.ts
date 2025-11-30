"use server";

import { Resend } from 'resend';
import * as validators from './validators';
import { genai } from './genai';
import { menuData } from '@/data/catering';

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

    const { name, email, phone, date, notes, recommendation, query } = result.data;

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
          <h2>Oryginalne zapytanie:</h2>
          <p style="font-style: italic; background-color: #f9f9f9; padding: 10px; border-left: 3px solid #ccc;">"${query || 'Brak treści zapytania'}"</p>
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

export async function generateCateringProposal(userQuery: string) {
    if (!process.env.GEMINI_API_KEY) {
        console.error("Brak klucza API Gemini");
        return { success: false, message: "Konfiguracja AI nie jest gotowa." };
    }

    try {
        const menuContext = menuData.map(item =>
            `- ${item.name} (${item.pieceCount} szt, ${item.price} PLN): ${item.description}. Tags: ${item.tags?.join(", ")}`
        ).join("\n");

        const prompt = `
      Jesteś ekspertem od cateringu sushi w Fugu Sushi.
      Twoim zadaniem jest przygotowanie rekomendacji zamówienia na podstawie zapytania klienta.
      
      Oto nasze menu:
      ${menuContext}
      
      Zapytanie klienta: "${userQuery}"
      
      Zasady:
      1. Oblicz zapotrzebowanie (ok. 10-12 sztuk na osobę dorosłą, mniej dla dzieci).
      2. Zaproponuj konkretne zestawy z menu, aby pokryć zapotrzebowanie.
      3. Uwzględnij preferencje (wege, bez surowej ryby, etc.).
      4. Odpowiedź ma być w formacie czytelnym dla klienta, gotowym do wklejenia w maila lub pokazania na stronie.
      5. Bądź uprzejmy i profesjonalny.
      6. Nie zmyślaj zestawów spoza menu.
      7. Używaj polskich znaków i poprawnej gramatyki.
      8. Używaj emoji (🍣, 🍱, ✅) z umiarem, aby ożywić tekst.
      9. Na końcu podaj szacunkowy koszt.
    `;

        const result = await genai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        });

        const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "Nie udało się wygenerować odpowiedzi.";

        return { success: true, recommendation: text };
    } catch (e) {
        console.error("Gemini error:", e);
        return { success: false, message: "Nie udało się wygenerować rekomendacji." };
    }
}