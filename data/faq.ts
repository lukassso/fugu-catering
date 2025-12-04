export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    details?: {
        type: 'list' | 'table' | 'text';
        content: string[] | { headers: string[]; rows: string[][] } | string;
    }[];
}

export const faqData: FAQItem[] = [
    {
        id: "faq-1",
        question: "Jak bardzo z wyprzedzeniem powinienem zamawiać catering sushi?",
        answer: "Zalecamy zamawianie catering sushi co najmniej **48 godzin (2 dni) z wyprzedzeniem**.",
        details: [
            {
                type: 'list',
                content: [
                    "**Standardowe zamówienia (10-30 gości):**24 godzin wcześniej",
                    "**Duże zamówienia (ponad 50 gości):** 7-10 dni z góry",
                    "**Specjalne życzenia lub menu premium:** 10-14 dni wcześniej"
                ]
            },
            {
                type: 'text',
                content: "Wymóg wcześniejszego powiadomienia zapewnia nam świeżość składników najwyższej jakości, czas na przygotowanie spersonalizowanego menu, możliwość dostosowania do wymogów dietetycznych oraz bezpieczeństwo dostaw w zaplanowanym terminie."
            }
        ]
    },
    {
        id: "faq-2",
        question: "Jakie są opcje Menu dla cateringu sushi?",
        answer: "Oferujemy w pełni spersonalizowane menu catering dostosowane do Twoich preferencji i budżetu.",
        details: [
            {
                type: 'text',
                content: "**Podstawowe Typy:**"
            },
            {
                type: 'list',
                content: [
                    "**Nigiri:** Plasterki świeżej ryby (łosoś, tuńczyk, jajko) na łóżku z ryżu sushi",
                    "**Sashimi:** Cienkie, świeże plasterki ryb podawane bez ryżu",
                    "**Maki Rolls:** Kombinacje ryżu, ryb i warzyw zawinięte w algi morskie",
                    "**Specjalność Rolls:** Autorskie kombinacje z dodatkowymi sosami (spicy mayo, eel sauce)"
                ]
            },
            {
                type: 'text',
                content: "**Opcje Dietetyczne:**"
            },
            {
                type: 'list',
                content: [
                    "**Wegetariańskie:** Bułki z warzywami, awokado, ogórkami, marynowanymi warzywami",
                    "**Wegańskie:** Tofu, mango, owoce morza roślinne",
                    "**Bez glutenu:** Tamari zamiast tradycyjnego soy sauce",
                    "**Bezmleczne:** Wszystkie nasze bułki"
                ]
            }
        ]
    },
    {
        id: "faq-3",
        question: "Ile sushi powinienem zamówić na liczbę gości?",
        answer: "Ilość zależy od typu przewidzianego menu i wydarzenia.",
        details: [
            {
                type: 'table',
                content: {
                    headers: ['Typ Dania', 'Kawałki na Osobę', 'Notatka'],
                    rows: [
                        ['Sushi jako przystawka', '5-8 kawałków', 'Obok innych potraw'],
                        ['Sushi jako główne danie', '10-15 kawałków', 'Podstawowe źródło posiłku'],
                        ['Sushi w bufecie', '8-12 kawałków', 'Mix sushi i inne dania']
                    ]
                }
            },
            {
                type: 'text',
                content: "**Przykłady Zamówienia:**"
            },
            {
                type: 'list',
                content: [
                    "20 gości (główne danie): 200-300 kawałków",
                    "50 gości (główne danie): 500-750 kawałków",
                    "30 gości (przystawka): 150-240 kawałków"
                ]
            },
            {
                type: 'text',
                content: "**Porada:** Dodaj około 10-15% bufora na niespodziewanych gości lub dodatkowy apetyt."
            }
        ]
    },
    {
        id: "faq-4",
        question: "Czy mogę dostosować zamówienie do alergii i ograniczeń dietetycznych?",
        answer: "**TAK!** Bezpieczeństwo żywienia jest dla nas priorytetem. Obsługujemy liczne restrykcje.",
        details: [
            {
                type: 'text',
                content: "**Obsługiwane Ograniczenia:**"
            },
            {
                type: 'list',
                content: [
                    "**Alergii na owoce morza:** Opcje z rybą słodkowodną lub bez ryb",
                    "**Alergii na ryby:** Menu w pełni bezrybne",
                    "**Alergii na muszle:** Oferta bez krewetek, małż, przegrzebków",
                    "**Dieta bezglutenowa:** Tamari zamiast soy sauce",
                    "**Dieta wegetariańska/wegańska:** Pełne menu roślinne",
                    "**Ograniczenia religijne/kulturowe:** Dostosowanie na życzenie",
                    "**Alergii orzechowe:** Menu bez orzechów"
                ]
            },
            {
                type: 'text',
                content: "**WAŻNE:** Powiadom nas o alergiach minimum 7 dni wcześniej. Wszystkie informacje o składnikach są dostępne na życzenie."
            }
        ]
    },
    {
        id: "faq-5",
        question: "Jak długo mogę przechowywać sushi po dostarczeniu?",
        answer: "Sushi jest najsmaczniejsze i najbezpieczniejsze, gdy podaje się je jak najszybciej po dostarczeniu.",
        details: [
            {
                type: 'text',
                content: "**Wytyczne Przechowywania:**"
            },
            {
                type: 'list',
                content: [
                    "**Temperatura pokojowa:** Maksymalnie 4 godziny (idealne dla imprez)",
                    "**W lodówce (0-5°C):** Maksymalnie 24 godziny, ale jakość się pogarsza po 4-6 godzinach",
                    "**Nigdy nie zamrażaj:** Świeże sushi nie powinno być zamrażane (ryż będzie suchy, nori będzie twarde)"
                ]
            },
            {
                type: 'text',
                content: "**Praktyczne Porady:**"
            },
            {
                type: 'list',
                content: [
                    "Przechowuj w chłodnym, suchym miejscu poza bezpośrednim słońcem",
                    "Nie otwieraj pudełka aż do chwili serwowania",
                    "Jeśli musisz przechowywać, umieść w szczelnym pojemniku w lodówce",
                    "Sushi z surową rybą: zjedz w ciągu 24 godzin dla bezpieczeństwa"
                ]
            }
        ]
    },
    {
        id: "faq-6",
        question: "Co jest zawarte w zamówieniu catering sushi?",
        answer: "Każde zamówienie catering sushi zawiera wszystko, czego potrzebujesz.",
        details: [
            {
                type: 'text',
                content: "**Standardowo Zawarte:**"
            },
            {
                type: 'list',
                content: [
                    "✓ Świeżo przygotowane sushi",
                    "✓ Pałeczki (jednorazowe bambusowe)",
                    "✓ Sosy rybne (Tamari i tradycyjny soy sauce)",
                    "✓ Wasabi (zielona pasta chrzanowa)",
                    "✓ Marynowany imbir (gari ginger)",
                    "✓ Papierowe serwetki",
                    "✓ Piękne, profesjonalne pudełka prezentacyjne"
                ]
            },
            {
                type: 'text',
                content: "**Dostępne Dodatki (na życzenie):**"
            },
            {
                type: 'list',
                content: [
                    "Profesjonalne sushi talerze i naczynia",
                    "Osobne porcje talerzy dla gości",
                    "Dekoracyjne tacki i serwetki premium",
                    "Specjalne sosy (spicy mayo, eel sauce, ponzu)",
                    "Ozdoby i zdobienia tematyczne"
                ]
            }
        ]
    },
    {
        id: "faq-7",
        question: "Czy oferujecie usługę Live Sushi Chef?",
        answer: "**TAK!** Dla specjalnych okazji oferujemy usługę Live Sushi Chef na Twojej imprezie.",
        details: [
            {
                type: 'text',
                content: "**Co Szef Kuchni Robi:**"
            },
            {
                type: 'list',
                content: [
                    "Przygotowuje sushi na żywo przed Twoimi gośćmi",
                    "Tworzy interaktywne doświadczenie kulinarne",
                    "Dostosowuje menu na bieżąco na podstawie preferencji gości",
                    "Podaje ultra-świeże sushi prosto z warsztatów",
                    "Dzieli się wiedzą i tradycją japońską"
                ]
            },
            {
                type: 'text',
                content: "**Wymagania:**"
            },
            {
                type: 'list',
                content: [
                    "**Minimalna liczba gości:** 15-20 osób",
                    "**Minimalny czas:** 2 godziny usługi",
                    "**Przygotowanie:** Wymaga co najmniej 7-10 dni noty"
                ]
            },
            {
                type: 'text',
                content: "**Wycena:** Cena rozpoczyna się od 125-150 PLN za godzinę za szefa. Koszt posiłków obliczany osobno."
            }
        ]
    },
    {
        id: "faq-8",
        question: "Jakie są ceny catering sushi?",
        answer: "Oferujemy elastyczne ceny dostosowane do Twojego budżetu.",
        details: [
            {
                type: 'table',
                content: {
                    headers: ['Pakiet', 'Cena na Osobę', 'Zawiera'],
                    rows: [
                        ['Podstawowy', '35-45 PLN', 'Cooked rolls, mieszane kawałki'],
                        ['Standardowy', '45-60 PLN', 'Nigiri, maki rolls, specjalności'],
                        ['Premium', '60-80+ PLN', 'Sashimi premium, specjalne kombinacje'],
                        ['Live Chef', '125-150 PLN/h', 'Przygotowanie na żywo + menu']
                    ]
                }
            },
            {
                type: 'text',
                content: "**Warunki:**"
            },
            {
                type: 'list',
                content: [
                    "**Minimalne zamówienie:** Zazwyczaj 10 osób",
                    "**Depozyt wymagany:** 40-50% przy rezerwacji",
                    "**Płatność:** Saldo przed lub w momencie dostawy",
                    "**Brak ukrytych opłat:** Co zobaczysz to zapłacisz",
                    "**Rabaty dla dużych zleceń:** Dostępne dla 50+ gości"
                ]
            },
            {
                type: 'text',
                content: "**Dodatkowe Koszty:** Dostawa bezpłatna powyżej 500 PLN, w innym wypadku 30-50 PLN."
            }
        ]
    },
    {
        id: "faq-9",
        question: "Czy dostarczacie catering na terenie Warszawy?",
        answer: "**TAK!** Dostarczamy catering sushi na terenie Warszawy i okolic.",
        details: [
            {
                type: 'text',
                content: "**Obszar Dostawy:**"
            },
            {
                type: 'list',
                content: [
                    "**Warszawa:** Wszystkie dzielnice (Centrum, Praga, Wawer, Piaseczno, itd.)",
                    "**Podwarszawskie:** Piaseczno, Konstancin-Jeziorna, Milanówek, Otwock, Józefów"
                ]
            },
            {
                type: 'text',
                content: "**Opcje Dostawy:**"
            },
            {
                type: 'list',
                content: [
                    "**Bezpłatna dostawa:** Dla zamówień powyżej 500 PLN",
                    "**Opłata za dostawę:** 30-50 PLN dla mniejszych zamówień",
                    "**Odbiór z restauracji:** 24/7 dla zamówień zaplanowanych z góry"
                ]
            },
            {
                type: 'text',
                content: "**Terminy Dostaw:** Standardowe okno 2-3 godziny po rezerwacji. Dostawa w konkretnym czasie dostępna za opłatą rezerwacji."
            }
        ]
    },
    {
        id: "faq-10",
        question: "Jak rezerwuję catering sushi? Jaki jest proces zamawiania?",
        answer: "Rezerwacja catering sushi w Fugu Sushi jest łatwa i bezproblemowa.",
        details: [
            {
                type: 'text',
                content: "**Proces Rezerwacji:**"
            },
            {
                type: 'list',
                content: [
                    "**Krok 1: Skontaktuj Się z Nami** - Telefon: +48 510 219 510, Email: catering@fugusushi.pl",
                    "**Krok 2: Podaj Szczegóły** - Data i godzina, liczba gości, preferencje smakowe, alergii",
                    "**Krok 3: Otrzymaj Wycenę** - Zindywidualizowana wycena w ciągu 24 godzin",
                    "**Krok 4: Potwierdź Rezerwację** - Depozyt 40-50% wymagany do potwierdzenia",
                    "**Krok 5: Finalne Potwierdzenie** - 48h przed - ostateczne potwierdzenie",
                    "**Krok 6: Dostawa i Setup** - Dostawa w terminie uzgodnionym"
                ]
            },
            {
                type: 'text',
                content: "**Wymagania:** Minimum 48 godzin wcześniej dla standardowych zamówień, 7-10 dni wcześniej dla dużych lub specjalnych żądań."
            }
        ]
    }
];
