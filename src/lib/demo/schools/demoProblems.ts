export type Problem = {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  question: string;
};

export const demoProblems: Problem[] = [
  {
    id: "p1",
    title: "Zepsuta fontanna",
    description: "Yo, ta fontanna przy sali 204 znowu się zepsuła 😤 Leje się woda na podłogę i wszyscy się ślizgają. Moja koleżanka wczoraj się przewróciła i bolała ją noga... To naprawdę niebezpieczne! 💧😬",
    imagePath: "/demo-schools/woda.png",
    question: "Czy powinniśmy poprosić szkołę o naprawę zepsutych fontann?",
  },
  {
    id: "p2",
    title: "Opcje jedzenia w stołówce",
    description: "Serio, co to za jedzenie w tej stołówce?! 🤢 Każdego dnia te same frytki, pizza i kotlety schabowe które wyglądają jak guma... Chcę coś normalnego zjeść, może jakieś sałatki czy kanapki? Moja mama mówi że to niezdrowe co tutaj serwują 🍕😭",
    imagePath: "/demo-schools/frytki.png",
    question: "Czy powinniśmy poprosić o zdrowsze opcje obiadowe w stołówce?",
  },
  {
    id: "p3",
    title: "Niebezpieczny plac zabaw",
    description: "OMG nasz plac zabaw to jakaś tragedia 😱 Te huśtawki są całe zardzewiałe, farba się łuszczy i wygląda jakby miały się rozpaść... Młodsze dzieci się tam bawią a to naprawdę niebezpieczne! Ktoś może się skaleczyć 🩹⚠️",
    imagePath: "/demo-schools/betonowo.png",
    question: "Czy powinniśmy prowadzić kampanię na rzecz bezpieczniejszego sprzętu na placu zabaw?",
  },
  {
    id: "p4",
    title: "Za dużo prac domowych",
    description: "Guys, ja już nie mogę... 😩 Każdy dzień to jakieś zadania z matmy, polskiego, angielskiego, historii... Siedzę do 23:00 nad książkami i rano jestem zombie! Nie mam czasu na nic - ani na sport, ani na znajomych. To nie jest normalne! 📚💀",
    imagePath: "/demo-schools/stres.png",
    question: "Czy powinniśmy poprosić nauczycieli o zmniejszenie prac domowych i skupienie się na projektach?",
  },
  {
    id: "p5",
    title: "Potrzeba recyklingu",
    description: "Ludzie, to jest cringe jak nasza szkoła wygląda! 🗑️ Wszędzie walają się butelki po wodzie, puszki, papier... A kosze są przepełnione! Widziałam jak pani sprzątaczka wyrzuca wszystko do jednego worka - plastik z papierem! We're killing the planet! 🌍😢",
    imagePath: "/demo-schools/recykling.png",
    question: "Czy powinniśmy rozpocząć program recyklingu w naszej szkole?",
  },
  {
    id: "p6",
    title: "Hałaśliwe korytarze",
    description: "Okej, czy tylko ja mam problem z tym hałasem?! 😵 Na przerwach to jest jakiś chaos - wszyscy krzyczą, śmieją się, grają muzykę... A ja próbuję się przygotować do następnej lekcji i nie mogę się skupić! Potrzebuję jakiegoś cichego miejsca 🤫📖",
    imagePath: "/demo-schools/betonowo2.png",
    question: "Czy powinniśmy stworzyć ciche przestrzenie do nauki dla uczniów potrzebujących skupienia?",
  },
  {
    id: "p7",
    title: "Zdrowie psychiczne uczniów",
    description: "Nie wiem czy to tylko ja, ale ostatnio czuję się mega przytłoczona... 😰 Klasówki, matura, rodzice pytają o oceny, presja że trzeba wybrać studia... Widzę że inni też się stresują ale nikt o tym nie mówi. Może powinniśmy się wspierać? 💚🤗",
    imagePath: "/demo-schools/stres.png",
    question: "Czy powinniśmy stworzyć grupę wsparcia rówieśniczego dla zestresowanych uczniów?",
  },
  {
    id: "p8",
    title: "Używanie telefonów na zajęciach",
    description: "Okej, wiem że telefony to problem ale... 📱 Czasami dostajemy ważną wiadomość od rodziców albo trzeba coś sprawdzić do projektu! A nauczyciele od razu zabierają telefon za samo wyjęcie z kieszeni. Maybe moglibyśmy ustalić jakieś fair zasady? 🤔💭",
    imagePath: "/demo-schools/telefon.png",
    question: "Czy powinniśmy wspólnie ustalić uczciwe zasady dotyczące używania telefonów na zajęciach?",
  },
  {
    id: "p9",
    title: "Transport szkolny",
    description: "Guys, dojazd do szkoły to koszmar! 🚌💦 Na deszczu stoimy jak sardynki na przystanku, autobus przepełniony, a jak chcesz przyjechać rowerem to nie ma gdzie go bezpiecznie zostawić... Już mi ukradli jeden rower z tego 'stojaka' 😭🚲",
    imagePath: "/demo-schools/deszcz.png",
    question: "Czy powinniśmy poprosić o więcej autobusów lub bezpieczniejsze stojaki na rowery?",
  },
  {
    id: "p10",
    title: "Przemoc w korytarzach",
    description: "To jest naprawdę poważne... 😔 Widziałam jak starsi uczniowie dokuczają młodszym przy szafkach, zabierają im rzeczy, popychają... Niektórzy się boją przyjść do szkoły. Nikt nie powinien czuć się tak unsafe w miejscu gdzie ma się uczyć! 💔😡",
    imagePath: "/demo-schools/szafki.png",
    question: "Czy powinniśmy zorganizować warsztaty przeciwko przemocy?",
  },
];
