// Raport WCAG 2.2 AA – dane. Aktualizuj tutaj: status, data, notatki. Strona docs/raport-wcag.html renderuje je automatycznie.
// status: "otwarte" | "do-weryfikacji" | "poprawione" | "uwaga"
window.BN_WCAG = {
  standard: 'WCAG 2.2, poziom AA',
  audits: [
    { date: '2026-11-23', scope: 'Prototyp HTML v0.8: 14 podstron × Light/Dark × 1440 i 375 px.', method: 'axe-core 4.12 (WCAG 2.0–2.2 A/AA + dobre praktyki), tools/a11y.py (nagłówki, nazwy, ID, kontrast, kolejność fokusu na 70 krokach Tab), pomiar celów dotykowych, lang, tytułów i przewijania poziomego. Kontrast tekstu na zdjęciach nie był powtarzany (zob. uwagi).' },
    { date: '2026-10-22', scope: 'Makiety Figma (Noxtua Landing Page): strona główna PL Desktop/Mobile Light/Dark, otwarte menu, podstrony Desktop/Mobile ze stanami formularzy i 404 – 30 ekranów, 1276 tekstów; tokeny i komponenty biblioteki.', method: 'Pomiar w Figmie: rzeczywisty kolor tekstu i tła ze zmiennych w trybie ekranu, kontrast WCAG; rozmiary celów dotykowych; stany Focus w komponentach; kontrast tokenów obramowań i fokusu.' },
    { date: '2026-10-27', scope: 'Tekst na zdjęciach (W3, W5): prototyp 1440 i 375 px – karty „Co wyróżnia”, 3 slajdy hero, nagłówek i pasek nad zdjęciem, hero 5 podstron, CTA i stopka.', method: 'Zrzut ekranu z ukrytym tekstem → kontrast koloru tekstu z każdym pikselem tła pod nim (prototyp/tools/kontrast_zdjecia.py). Wynik: minimum, 5. percentyl i udział pikseli poniżej progu.' },
    { date: '2026-10-27', scope: 'Prototyp HTML v0.6 po poprawkach Ani: strona główna, Research, Analiza, Drafting, System modeli, Zamów dostęp, OWU, Newsletter × Light/Dark.', method: 'Ten sam skrypt w przeglądarce (tools/a11y.py): nagłówki, nazwy dostępne, alt, ID, kontrast. Bez nowych błędów; zgłoszenia kontrastu dotyczą tekstu na zdjęciach (W5).' },
    { date: '2026-10-22', scope: 'Prototyp HTML: 13 stron × Light/Dark × 1440 i 375 px.', method: 'Skrypt w przeglądarce (ten sam co tools/a11y.py): alt, nazwy dostępne linków i przycisków, kolejność nagłówków, liczba H1, duplikaty ID, kontrast tekstu. Ręczna weryfikacja zgłoszeń przy tekście na zdjęciach.' }
  ],
  findings: [
    {
      id: 'W1', criterion: '1.4.11', name: 'Kontrast elementów nietekstowych', level: 'AA', status: 'poprawione', where: ['Biblioteka', 'Makiety', 'Prototyp'],
      title: 'Obramowania pól formularzy i checkboxów za słabe',
      problem: 'Token border/strong miał 2,22:1 (Light) i 1,85:1 (Dark) do tła strony, a na karcie formularza 2,52:1 / 1,64:1. Wypełnienie pola prawie nie odróżnia się od karty, więc obramowanie to jedyna wskazówka, gdzie jest pole.',
      fix: 'border/strong → dark-plum/60 #796f7a (kierunek A): 4,14:1 Light, 3,36:1 Dark; kierunek B → plum/60: 3,58:1 / 3,88:1. Zmienione w bibliotece i w prototypie (tokens.css).',
      code: '--border-strong: var(--p-dark-plum-60); obowiązuje dla .input, select.input, .check input, .captcha. Wymóg: ≥ 3:1 do --bg-canvas, --bg-elevated i --bg-subtle.',
      fixedOn: '2026-10-22', note: 'Biblioteka opublikowana, ekrany Landing Page zaktualizowane.'
    },
    {
      id: 'W2', criterion: '2.4.7', name: 'Widoczny fokus', level: 'AA', status: 'poprawione', where: ['Biblioteka', 'Prototyp'],
      title: 'Brak stanów fokusu w części komponentów',
      problem: 'Link card, Bento tile, Carousel controls i Contact widget nie miały wariantu Focus – deweloper nie wiedział, jak ma wyglądać fokus z klawiatury.',
      fix: 'Dodane warianty: Link card State=Focus, Bento tile State=Focus, Carousel controls Fokus=Pauza / Wskaźnik, Contact widget State=Focus. Wzór jak w Menu item: pierścień focus/ring 2 px.',
      code: 'Prototyp ma globalne :focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2–3px }. Kafel Bento przycina zawartość – fokus rysowany wewnątrz krawędzi (outline-offset: -2px) albo na linku kafla.',
      fixedOn: '2026-10-22'
    },
    {
      id: 'W3', criterion: '1.4.3', name: 'Kontrast (minimalny)', level: 'AA', status: 'poprawione', where: ['Biblioteka', 'Makiety', 'Prototyp'],
      title: 'Tekst na zdjęciach w kartach „Co wyróżnia Beck-Noxtua?”',
      problem: 'Pomiar pikseli (27.10, prototyp 1440 i 375 px): numer karty „01” (12 px, przezroczystość 0,7) na jasnej posadzce zdjęcia z kolumnadą miał 4,35–4,45:1 na desktopie i 2,8–3,4:1 na telefonie (wymóg 4,5:1). Tytuły (8–15:1) i opisy po najechaniu (9–12:1) były bezpieczne.',
      fix: 'Numer karty w pełnym kolorze; na urządzeniach bez hover przyciemnienie kart widoczne od razu (opis jest tam zawsze widoczny). Po poprawce numery 6,9–13:1 (desktop) i ok. 7,2:1 (telefon). W bibliotece (Highlights section) gradient pod tekstem wzmocniony: środek 0,25 → 0,45.',
      code: '.tcard .num{opacity:1}; @media (hover:none){.tcard .shade{opacity:1}}. Przy wymianie zdjęć kart zmierz kontrast na najjaśniejszym fragmencie pod tekstem.',
      fixedOn: '2026-10-27', note: 'Biblioteka opublikowana, ekrany zaktualizowane (105 kart).'
    },,
    {
      id: 'W4', criterion: '2.5.8', name: 'Rozmiar celu (minimalny)', level: 'AA', status: 'poprawione', where: ['Biblioteka', 'Makiety', 'Prototyp'],
      title: 'Checkbox ma 22 px wysokości',
      problem: 'Wymagane 24 × 24 px. Przechodzi dzięki wyjątkowi na odstępy (12–16 px między zgodami), ale jest na granicy. Linki tekstowe (20 px) mieszczą się w wyjątku.',
      fix: 'Pole checkboxa ma teraz 24 × 24 px (było 20 px) we wszystkich 6 wariantach w bibliotece, znacznik 16 px, pierścień fokusu 32 px; w prototypie pole 24 px (było 18 px). Biblioteka opublikowana, makiety zaktualizowane.',
      code: '.check input { width: 24px; height: 24px } – cała etykieta klikalna (label > input).',
      fixedOn: '2026-10-22'
    },
    {
      id: 'W5', criterion: '1.4.3', name: 'Kontrast (minimalny)', level: 'AA', status: 'poprawione', where: ['Biblioteka', 'Makiety', 'Prototyp'],
      title: 'Tekst na zdjęciach: hero, nagłówek nad zdjęciem, stopka',
      problem: 'Pomiar pikseli (27.10, prototyp 1440 i 375 px, 3 slajdy hero, 5 hero podstron, stopka): na telefonie opis i nagłówek slajdu „System modeli” leżały na jasnym zdjęciu (sowa) – 1,7–2,1:1, 31% tła poniżej progu; na desktopie koniec opisu tego slajdu 3,25:1; przełącznik „Polski” w pasku nad jasnym blatem 4,4:1; nagłówki hero podstron Drafting i System modeli miejscami 2,7–2,9:1 (wymóg 3:1). Menu, przyciski, stopka i CTA – bez problemów (≥ 4,75:1).',
      fix: 'Hero strony głównej: ciemniejsza część poziomego gradientu do 55% szerokości; na telefonie pionowe przyciemnienie całego pola tekstu (0,35 → 0,78 → 0,9). Pasek nad menu: tekst w pełnym kolorze. Hero podstron: przyciemnienie 0,45 → 0,55. Po poprawkach wszystkie zmierzone teksty ≥ 4,5:1 (zwykłe) i ≥ 3,7:1 (duże nagłówki). Te same wartości w bibliotece (Hero, Header).',
      code: '.hero::after – rgba(20,10,21,.65) 55%, .15 90%; @media (max-width:767px) linear-gradient(0deg, .9 0%, .78 75%, .35 100%); .meta-row .wrap{color:#efeeea}; .subhero::after{background:rgba(20,10,21,.55)}. Nie zmniejszać tych wartości; przy nowym zdjęciu w hero zmierz kontrast (np. Colour Contrast Analyser) na najjaśniejszym fragmencie pod tekstem.',
      fixedOn: '2026-10-27', note: 'Pomiar: zrzut tła z ukrytym tekstem, kontrast koloru tekstu z każdym pikselem pod nim (minimum, 5. percentyl, udział poniżej progu). Ekran „Strony prototypu” w rogu pomijany. Biblioteka opublikowana, ekrany zaktualizowane (hero: 43 desktop/tablet, 9 mobile, 60 podstron).'
    },,
    {
      id: 'W6', criterion: '4.1.2 / 1.3.1', name: 'Nazwa, rola, wartość / Informacje i relacje', level: 'A', status: 'poprawione', where: ['Biblioteka', 'Wdrożenie'],
      title: 'Semantyka do przekazania deweloperom',
      problem: 'Figma nie przechowuje semantyki: poziomów nagłówków, nazw przycisków z samą ikoną, regionów aria-live. Prototyp ma je poprawnie (1 H1 na stronę, nagłówki bez przeskoków, nazwy dostępne – audyt bez błędów), ale makiety tego nie dokumentują.',
      fix: 'Opisy 52 komponentów w bibliotece mają sekcję „Semantyka (WCAG)”: elementy HTML, poziomy nagłówków, aria-label przycisków z samą ikoną, aria-expanded / aria-pressed / aria-current, role="alert" / role="status", obsługa fokusu. Deweloper widzi ją w Dev Mode przy zaznaczeniu instancji.',
      fixedOn: '2026-10-22',
      note: 'Przy wdrożeniu warto zweryfikować całość czytnikiem ekranu (VoiceOver / NVDA) – opisy to wytyczne, nie test.',
      code: 'Przyciski ikonowe: widget kontaktu („Otwórz kontakt”), strzałki karuzeli, pauza („Wstrzymaj karuzelę”), przełącznik motywu. Potwierdzenia: fokus na H1 po załadowaniu + role="status". Błędy formularza: role="alert" na podsumowaniu, aria-invalid i aria-describedby na polach.'
    },
    {
      id: 'W7', criterion: '2.2.2', name: 'Pauza, zatrzymanie, ukrycie', level: 'A', status: 'poprawione', where: ['Makiety', 'Prototyp'],
      title: 'Automatyczna karuzela w hero',
      problem: 'Hero przewija slajdy automatycznie – wymagany przycisk pauzy.',
      fix: 'Pauza jest w komponencie Carousel controls i w prototypie; zatrzymanie także przy fokusie w hero i przy prefers-reduced-motion.',
      code: '#pauseBtn, hero.addEventListener("focusin", …), RM = prefers-reduced-motion – zachować przy wdrożeniu.'
    },
    {
      id: 'U1', criterion: '1.4.3', name: 'Kontrast (minimalny)', level: 'AA', status: 'poprawione', where: ['Biblioteka', 'Makiety', 'Prototyp'],
      title: 'Przycisk w stanie „Wysyłanie…” miał kontrast 2,28:1',
      problem: 'Stan Loading przyciemniał cały przycisk do 40% przezroczystości: tło wychodziło szare (#a49da4), a jasny tekst prawie się z nim zlewał. Elementy wyłączone są zwolnione z wymogu, ale ten stan przekazuje informację (trwa wysyłanie).',
      fix: 'Stan Loading ma pełne kolory: tło action/primary-bg-hover, tekst i ikona action/primary-text – 8,5:1 (Light) i 11,8:1 (Dark). Zmienione w bibliotece (Button, Primary L i M) i w prototypie.',
      code: '.btn-primary[aria-busy="true"] { background: var(--action-primary-bg-hover); color: var(--action-primary-text); opacity: 1 } – bez opacity; kliknięcia blokuje disabled + aria-busy="true".',
      fixedOn: '2026-10-22', note: 'Biblioteka opublikowana, makiety zaktualizowane.'
    },
    {
      id: 'W8', criterion: '2.5.8', name: 'Rozmiar celu (minimalny)', level: 'AA', status: 'poprawione', where: ['Prototyp'],
      title: 'Przyciski slajdów w hero na mobile miały 40×2 px',
      problem: 'Poniżej 768 px podpisy slajdów są ukryte i klikalny element zostaje samym paskiem postępu (2 px wysokości) – cel dotykowy 40×2 px.',
      fix: 'Przycisk ma padding-block 11 px, więc pole klikalne to 40×24 px; sam pasek zostaje cienki. Linki w stopce prawnej dostały padding-block 4 px (16 → 24 px).',
      code: '.slides-nav button { width: 40px; padding-block: 11px } (max-width: 767px); .foot-bottom a, .foot-bottom button { padding-block: 4px }',
      fixedOn: '2026-11-23', note: 'Do rozważenia przy wdrożeniu: 44 px dla przycisków slajdów (zalecenie, nie wymóg AA).'
    },
    {
      id: 'W9', criterion: '2.4.4 / 4.1.2', name: 'Cel linku / Nazwa, rola, wartość', level: 'A', status: 'poprawione', where: ['Prototyp'],
      title: 'Linki „Ustawienia cookies” i „Dostępność” w stopce prowadziły donikąd',
      problem: 'Oba elementy były linkami z href="#": nic nie robiły, a w prototypie ze ścieżkami po hashu mogły zresetować widok.',
      fix: 'Zamienione na przyciski z aria-disabled="true" i dopiskiem „(wkrótce)” dla czytników – tak jak EN w menu języka. Przy wdrożeniu: cookies → przycisk otwierający ustawienia zgód, Dostępność → link do deklaracji dostępności.',
      code: '<button type="button" aria-disabled="true">Ustawienia cookies<span class="sr-only"> (wkrótce)</span></button>',
      fixedOn: '2026-11-23', note: 'Deklaracja dostępności (wymóg europejskiej dyrektywy o dostępności) wymaga osobnej treści od klienta.'
    },
    {
      id: 'W10', criterion: '1.3.1', name: 'Informacje i relacje', level: 'A', status: 'poprawione', where: ['Prototyp'],
      title: 'Panel czatu: nagłówek h4 bez nadrzędnych',
      problem: '„Masz pytania?” było h4 w panelu poza strukturą strony, więc nagłówki przeskakiwały z h2 do h4. Blok CTA nie leżał w żadnym punkcie orientacyjnym (axe: region).',
      fix: 'Nagłówek panelu to h3 (wygląd bez zmian – klasa .h4); blok CTA ma role="region" z aria-labelledby.',
      fixedOn: '2026-11-23'
    }
  ],
  passed: [
    ['1.4.3', 'Wszystkie zwykłe teksty mają ≥ 4,5:1 w Light i Dark (makiety i prototyp), w tym tekst pomocniczy text/muted: 5,4:1 Light, 7,1:1 Dark.'],
    ['1.4.4', 'Brak tekstu poniżej 12 px.'],
    ['1.4.1', 'Błędy formularzy pokazane ikoną, tekstem i kolorem; formularz Zamów dostęp ma podsumowanie błędów.'],
    ['1.4.11', 'Pierścień fokusu 4,45–7,18:1; obramowanie pola z błędem 5,65–6,84:1.'],
    ['3.3.2', 'Każde pole ma widoczną etykietę; gwiazdka pola wymaganego jest jej częścią, formularz objaśnia „* pola wymagane”.'],
    ['1.3.1 / 2.4.6', 'Prototyp: jeden H1 na stronę, nagłówki bez przeskoków, alt na zdjęciach, nazwy dostępne linków i przycisków, brak duplikatów ID – na 13 stronach, Light/Dark, Desktop/Mobile.'],
    ['2.4.7', 'Prototyp: globalny :focus-visible z kolorem focus/ring.'],
    ['2.1.1 / 4.1.2', 'Nawigacja v0.7: menu języka obsługiwane klawiaturą (strzałki, Home/End, Esc wraca na przycisk), aria-expanded, role menu / menuitemradio; EN niedostępne przez aria-disabled (fokus możliwy, „wkrótce” dla czytników). Przełącznik motywu z aria-pressed i nazwą „Włącz tryb …”. Kontrast w pasku i menu nad jasnym zdjęciem 6–7,5:1.'],
    ['1.4.3 / 1.4.1', 'Etykiety (Badge) po zmianie wyglądu w v0.6 (wersaliki, wypełnienie bez obramowania): tekst 12,5:1 (Standard na tle bg/subtle, Dark) – nie wyglądają już jak przyciski, a poziom modelu jest też w nazwie (Standard / Frontier), nie tylko w kolorze.'],
    ['1.3.1', 'Strony produktowe (v0.6): po przeniesieniu nagłówka do hero – jeden H1, bez przeskoków; na System modeli tytuły kart modeli to H2.'],
    ['2.3.3 / 2.2.2', 'Animacje respektują prefers-reduced-motion; karuzela ma pauzę.']
  ],
  other: [
    'Nazwy ekranów zgodne z trybem: wszystkie 35 ekranów strony głównej mają w nazwie ten sam motyw (Light / Dark), który mają ustawiony w Figmie (sprawdzone 28.10 – wcześniej 4 ekrany Dark miały w nazwie „Light”).',
    'Automatyczny test kontrastu (tools/a11y.py) nadal zgłasza tekst na zdjęciach i w kontenerach z wymuszonym motywem (hero, nagłówek nad zdjęciem, kafle Bento, karty modeli) – nie widzi pikseli zdjęcia. Te miejsca są mierzone osobno na pikselach (tools/kontrast_zdjecia.py, W3 i W5) – wszystkie powyżej progu.'
  ]
};
