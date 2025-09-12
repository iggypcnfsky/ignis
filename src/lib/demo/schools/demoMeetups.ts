export type Meetup = {
  id: string;
  title: string;
  date: string;
  time: string;
  isLive?: boolean;
  isOnline?: boolean;
  participants: number;
  problemsCount: number;
  ideasCount: number;
  duration: string;
  problemIds: string[];
  ideaIds: string[];
  description?: string;
  location?: string;
  whatsapp?: string;
  organizer: string;
};

export const demoMeetups: Meetup[] = [
  {
    id: "m1",
    title: "Spotkanie samorządu uczniowskiego",
    date: "Dzisiaj",
    time: "12 sierpnia o 17:00",
    isLive: true,
    isOnline: false,
    participants: 8,
    problemsCount: 2,
    ideasCount: 3,
    duration: "60min",
    problemIds: ["p1", "p2"],
    ideaIds: ["idea-1", "idea-4", "idea-5"],
    description: "Omawiamy problemy z fontanną i jedzeniem w stołówce. Przedstawimy nasze pomysły dyrekcji i zaplanujemy kolejne kroki.",
    organizer: "Anna Kowalska",
  },
  {
    id: "m2",
    title: "Online - grupa wsparcia",
    date: "Jutro",
    time: "15:30",
    isLive: false,
    isOnline: true,
    participants: 12,
    problemsCount: 1,
    ideasCount: 2,
    duration: "45min",
    problemIds: ["p7"],
    ideaIds: ["idea-15", "idea-16"],
    description: "Spotkanie grupy wsparcia dla uczniów ze stresem. Bezpieczna przestrzeń do rozmowy o problemach.",
    organizer: "Michał Nowak",
  },
  {
    id: "m3",
    title: "Akcja sprzątania placu zabaw",
    date: "25 sierpnia",
    time: "10:00",
    isLive: false,
    isOnline: false,
    participants: 15,
    problemsCount: 2,
    ideasCount: 2,
    duration: "120min",
    problemIds: ["p3", "p5"],
    ideaIds: ["idea-7", "idea-8"],
    description: "Wspólna akcja malowania i sprzątania placu zabaw. Przynosimy farby i narzędzia. Rodzice mile widziani!",
    organizer: "Karolina Wiśniewska",
  },
  {
    id: "m4",
    title: "Rozmowa o zasadach telefonów",
    date: "2 września",
    time: "14:00",
    isLive: false,
    isOnline: false,
    participants: 6,
    problemsCount: 1,
    ideasCount: 2,
    duration: "30min",
    problemIds: ["p8"],
    ideaIds: ["idea-17", "idea-18"],
    description: "Spotkanie z przedstawicielami nauczycieli o ustaleniu uczciwe zasad używania telefonów.",
    organizer: "Jakub Zieliński",
  },
  {
    id: "m5",
    title: "Petycja o lepszy transport",
    date: "10 września", 
    time: "16:00",
    isLive: false,
    isOnline: false,
    participants: 20,
    problemsCount: 1,
    ideasCount: 2,
    duration: "60min",
    problemIds: ["p9"],
    ideaIds: ["idea-19", "idea-20"],
    description: "Zbieramy podpisy do petycji o więcej autobusów. Planujemy też grupę rowerową do szkoły.",
    organizer: "Martyna Lewandowska",
  },
  {
    id: "m6",
    title: "Warsztaty przeciwko przemocy szkolnej",
    date: "15 września",
    time: "13:00", 
    isLive: false,
    isOnline: false,
    participants: 35,
    problemsCount: 1,
    ideasCount: 3,
    duration: "90min",
    problemIds: ["p10"],
    ideaIds: ["idea-21", "idea-24", "idea-25"],
    description: "Warsztat z psychologiem szkolnym o przeciwdziałaniu przemocy. Dyskusja o bezpiecznych sposobach zgłaszania i programie mentoringowym.",
    organizer: "Dr. Agnieszka Kowalczyk, psycholog szkolny",
    location: "Aula szkolna",
  },
];

// Helper function to get meetups for a specific problem
export function getMeetupsForProblem(problemId: string): Meetup[] {
  return demoMeetups.filter(meetup =>
    meetup.problemIds.includes(problemId)
  );
}

// Helper function to get all meetups
export function getAllMeetups(): Meetup[] {
  return demoMeetups;
}
