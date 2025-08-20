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
  // New fields that can be added in the wizard
  description?: string;
  location?: string;
  whatsapp?: string;
};

export const demoMeetups: Meetup[] = [
  {
    id: "m1",
    title: "Weekly meeting of concerned park goers",
    date: "Today",
    time: "12th of August at 5pm",
    isLive: true,
    isOnline: false,
    participants: 4,
    problemsCount: 2,
    ideasCount: 1,
    duration: "60min",
    problemIds: ["p1", "p2"],
    ideaIds: ["idea-1"],
    // Rich meetup with all details
    description: "Let's discuss solutions for the broken benches in our local park. We'll review community ideas and plan actionable steps.",
    location: "Central Park, near the lake entrance",
    whatsapp: "+1234567890",
  },
  {
    id: "m2",
    title: "Quick online sync",
    date: "Tomorrow",
    time: "2:00 PM",
    isLive: false,
    isOnline: true,
    participants: 3,
    problemsCount: 1,
    ideasCount: 2,
    duration: "30min",
    problemIds: ["p3", "p4"],
    ideaIds: ["idea-2"],
    // Online meetup with minimal details
    description: "Brief online meeting to coordinate next steps",
    location: "https://meet.google.com/abc-123",
  },
  {
    id: "m3",
    title: "Community brainstorming session",
    date: "20th August 2025",
    time: "6:00 PM",
    isLive: false,
    isOnline: false,
    participants: 8,
    problemsCount: 3,
    ideasCount: 0,
    duration: "90min",
    problemIds: ["p5", "p6"],
    ideaIds: [],
    // In-person meetup with description only
    description: "Open brainstorming session to generate ideas for addressing multiple community problems. No specific ideas selected yet - come contribute your thoughts!",
    location: "Community Center, Main Hall",
  },
  {
    id: "m4",
    title: "Simple meetup",
    date: "27th August 2025",
    time: "4:00 PM",
    isLive: false,
    isOnline: false,
    participants: 2,
    problemsCount: 1,
    ideasCount: 1,
    duration: "45min",
    problemIds: ["p1", "p3"],
    ideaIds: ["idea-4"],
    // Minimal meetup with just basic info
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
