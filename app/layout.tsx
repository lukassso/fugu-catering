import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Providers from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: '🍣 Fugu Sushi - użyj asystenta kateringu',
  description: 'Inteligentny kalkulator zamówień sushi dla grup. Oferujemy catering sushi dla firm, spotkań biznesowych, eventów oraz prywatnych przyjęć.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body
        className={`${lato.variable} antialiased`}
      >
        <Providers>{children}<Toaster richColors /> </Providers>
      </body>
    </html>
  );
}
