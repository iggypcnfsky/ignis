export type Idea = {
  id: string;
  problemId: string;
  title: string;
  description: string;
  votesCount: number;
};

export const demoIdeas: Idea[] = [
  // Ideas for Broken Water Fountain (p1)
  {
    id: "idea-1",
    problemId: "p1",
    title: "Petycja do dyrekcji",
    description: "Napiszmy oficjalną petycję do dyrekcji szkoły z podpisami wszystkich uczniów. Ja mogę ją napisać i zebrać podpisy podczas przerw. Moja siostra robiła to w swojej szkole i zadziałało!",
    votesCount: 23,
  },
  {
    id: "idea-2",
    problemId: "p1",
    title: "Zbieranie funduszy na naprawę",
    description: "Co jeśli zrobimy kiermasz ciast i napojów? Moja klasa może się zorganizować, a pieniądze przekażemy na naprawę fontanny. Pokazalibyśmy, że nam zależy i że sami chcemy pomóc.",
    votesCount: 15,
  },
  {
    id: "idea-3",
    problemId: "p1",
    title: "Kontakt z mediami lokalnymi",
    description: "Mój tata pracuje w lokalnej gazecie. Mogę go poprosić żeby napisał artykuł o problemach w naszej szkole. Czasem publicity pomaga szybciej rozwiązać problemy niż oficjalne pisma.",
    votesCount: 8,
  },
  
  // Ideas for Cafeteria Food Options (p2)
  {
    id: "idea-4",
    problemId: "p2",
    title: "Samorząd uczniowski - propozycje menu",
    description: "Jestem w samorządzie i mogę przedstawić nasze propozycje zdrowszych opcji. Zrobimy ankietę wśród uczniów co chcieliby jeść, a potem spotkamy się z firmą cateringową.",
    votesCount: 31,
  },
  {
    id: "idea-5",
    problemId: "p2",
    title: "Dzień zdrowego jedzenia",
    description: "Zaproponujmy jeden dzień w tygodniu jako 'dzień zdrowego jedzenia' - sałatki, kanapki z pełnoziarnistym pieczywem, owoce. Jeśli się sprawdzi, można rozszerzyć na więcej dni.",
    votesCount: 19,
  },
  {
    id: "idea-6",
    problemId: "p2",
    title: "Konkurencja między szkołami",
    description: "Sprawdźmy co mają inne szkoły w okolicy i pokażmy dyrekcji że możemy mieć lepiej. Moja kuzynka z innej szkoły mówi że oni mają super opcje - można się wzorować.",
    votesCount: 12,
  },

  // Ideas for Unsafe Playground (p3)
  {
    id: "idea-7",
    problemId: "p3",
    title: "Zgłoszenie do sanepidu",
    description: "Zrobimy zdjęcia niebezpiecznego sprzętu i zgłosimy to do sanepidu. To poważna sprawa bezpieczeństwa i oni mają obowiązek zareagować. Moja mama wie jak to zrobić.",
    votesCount: 27,
  },
  {
    id: "idea-8",
    problemId: "p3",
    title: "Akcja malowania przez rodziców",
    description: "Zorganizujmy weekend malowania dla rodziców i uczniów. Farba antykorozyjna to nie wielki koszt, a będzie bezpieczniej i ładniej. Mój ojciec ma doświadczenie w malowaniu.",
    votesCount: 16,
  },

  // Ideas for Too Much Homework (p4)
  {
    id: "idea-9",
    problemId: "p4",
    title: "Kalendarz zadań domowych",
    description: "Stwórzmy wspólny kalendarz online gdzie nauczyciele wpisują zadania. Dzięki temu będą widzieć ile już zadaliśmy danego dnia i może rozłożą to lepiej w czasie.",
    votesCount: 42,
  },
  {
    id: "idea-10",
    problemId: "p4",
    title: "Rozmowa z wychowawcą",
    description: "Porozmawiajmy szczerze z naszym wychowawcą o tym jak się czujemy. Może on pomoże nam porozumieć się z innymi nauczycielami. Czasem dorośli nie wiedzą jak bardzo jesteśmy przeciążeni.",
    votesCount: 34,
  },

  // Ideas for Recycling Program (p5)
  {
    id: "idea-11",
    problemId: "p5",
    title: "Kosze do segregacji w każdej klasie",
    description: "Kupmy kosze do segregacji z naszych pieniędzy klasowych i pokażmy że chcemy segregować. Jak zobaczy się że używamy, może szkoła kupi więcej na korytarze.",
    votesCount: 25,
  },
  {
    id: "idea-12",
    problemId: "p5",
    title: "Konkurs ekologiczny",
    description: "Zróbmy konkurs między klasami - która zbierze najwięcej makulatury i plastiku w miesiącu. Nagroda może być symboliczna ale motywacja będzie duża!",
    votesCount: 18,
  },

  // Ideas for Loud Hallways (p6)
  {
    id: "idea-13",
    problemId: "p6",
    title: "Biblioteka jako strefa ciszy",
    description: "Przekonajmy bibliotekarki żeby biblioteka była prawdziwą strefą ciszy - bez rozmów, tylko nauka. Tam można by się schronić przed hałasem z korytarzy.",
    votesCount: 29,
  },
  {
    id: "idea-14",
    problemId: "p6",
    title: "Ciche sale podczas przerw",
    description: "Może niektóre sale mogłyby być otwarte podczas przerw dla tych co chcą ciszy? Nie wszystkich stać na słuchawki z redukcją szumów, a czasem trzeba się przygotować do klasówki.",
    votesCount: 21,
  },

  // Ideas for Student Mental Health (p7)
  {
    id: "idea-15",
    problemId: "p7",
    title: "Grupa wsparcia prowadzona przez uczniów",
    description: "Stwórzmy nieformalną grupę wsparcia gdzie możemy rozmawiać o stresie i problemach. Bez dorosłych, między sobą. Spotkania raz w tygodniu po lekcjach w pustej sali.",
    votesCount: 37,
  },
  {
    id: "idea-16",
    problemId: "p7",
    title: "Anonimowa skrzynka problemów",
    description: "Zróbmy skrzynkę gdzie można anonimowo napisać o swoich problemach, a my jako grupa będziemy szukać rozwiązań i wspierać się nawzajem. Czasem łatwiej napisać niż powiedzieć.",
    votesCount: 24,
  },

  // Ideas for Phone Use in Class (p8)
  {
    id: "idea-17",
    problemId: "p8",
    title: "Wspólne ustalenie zasad z nauczycielami",
    description: "Zaproponujmy spotkanie uczniów z nauczycielami żeby razem ustalić uczciwe zasady. Może telefony w kieszeniach, ale można używać do nauki? Kompromis z obu stron.",
    votesCount: 33,
  },
  {
    id: "idea-18",
    problemId: "p8",
    title: "Przerwy na telefon",
    description: "Co jeśli byłyby oficjalne 5-minutowe przerwy na sprawdzenie telefonów podczas długich lekcji? Jak dzieci mają przerwy na zabawę, my możemy mieć na telefony.",
    votesCount: 26,
  },

  // Ideas for School Transport (p9)
  {
    id: "idea-19",
    problemId: "p9",
    title: "Petycja do gminy o więcej autobusów",
    description: "Zbierzmy podpisy rodziców i uczniów i złóżmy petycję w urzędzie gminy. To ich odpowiedzialność zapewnić transport do szkoły. Moja babcia pomagała już w takich sprawach.",
    votesCount: 28,
  },
  {
    id: "idea-20",
    problemId: "p9",
    title: "Grupa rowerowa do szkoły",
    description: "Stwórzmy grupę uczniów jeżdżących na rowerach - razem bezpieczniej. Możemy poprosić o wyznaczenie ścieżki rowerowej i lepsze stojaki. W grupie siła!",
    votesCount: 15,
  },

  // Ideas for Bullying in Hallways (p10)
  {
    id: "idea-21",
    problemId: "p10",
    title: "System buddy dla młodszych uczniów",
    description: "Starsi uczniowie mogą być 'buddy' dla młodszych - pokazywać im szkołę, chronić przed przemocanami. Ja chętnie bym się zgłosiła, pamiętam jak się bałam w pierwszej klasie.",
    votesCount: 35,
  },
  {
    id: "idea-22",
    problemId: "p10",
    title: "Anonimowe zgłaszanie przemocy",
    description: "Zróbmy anonimową skrzynkę lub formularz online do zgłaszania przemocy. Czasem boję się zgłosić bo się nie chce wdawać w problemy, ale anonimowo byłoby łatwiej.",
    votesCount: 31,
  },

  // Ideas for Violence in Corridors (p10)
  {
    id: "idea-21",
    problemId: "p10",
    title: "Warsztaty przeciwko przemocy",
    description: "Zorganizujmy warsztaty dla wszystkich klas o tym jak radzić sobie z przemocą. Moja ciocia jest psychologiem i mogłaby pomóc. Ważne żeby wszyscy wiedzieli co robić gdy widzą przemoc.",
    votesCount: 34,
  },
  {
    id: "idea-24", 
    problemId: "p10",
    title: "System zgłaszania anonimowego",
    description: "Potrzebujemy bezpiecznego sposobu zgłaszania przemocy. Może skrzynka anonimowa przy gabinecie psychologa? Albo formularz online? Niektórzy się boją zgłaszać bo myślą że będzie gorzej.",
    votesCount: 28,
  },
  {
    id: "idea-25",
    problemId: "p10", 
    title: "Program mentoringowy starsi-młodsi",
    description: "Co jeśli każdy starszy uczeń zostanie mentorem młodszego? Zamiast dokuczać, mogliby pomagać. W mojej poprzedniej szkole to działało - tworzyło pozytywne relacje między klasami.",
    votesCount: 19,
  },
];
