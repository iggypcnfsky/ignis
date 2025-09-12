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
    id: "cm1",
    title: "Public Transportation Town Hall",
    date: "Today",
    time: "7:00 PM",
    isLive: true,
    isOnline: false,
    participants: 45,
    problemsCount: 1,
    ideasCount: 3,
    duration: "120min",
    problemIds: ["c1"],
    ideaIds: ["c-idea-1", "c-idea-2", "c-idea-3"],
    description: "Community meeting to discuss bus delays and potential solutions including real-time tracking and express routes.",
    organizer: "City Transportation Department",
    location: "City Hall Auditorium",
  },
  {
    id: "cm2",
    title: "Park Cleanup Volunteer Day",
    date: "This Saturday",
    time: "9:00 AM",
    isLive: false,
    isOnline: false,
    participants: 32,
    problemsCount: 1,
    ideasCount: 2,
    duration: "180min",
    problemIds: ["c2"],
    ideaIds: ["c-idea-4", "c-idea-5"],
    description: "Community volunteer day to clean and maintain Central Park. Tools and refreshments provided.",
    organizer: "Parks & Recreation Committee",
    location: "Central Park Main Entrance",
  },
  {
    id: "cm3",
    title: "Housing Affordability Forum",
    date: "September 18",
    time: "6:30 PM",
    isLive: false,
    isOnline: true,
    participants: 67,
    problemsCount: 1,
    ideasCount: 3,
    duration: "90min",
    problemIds: ["c5"],
    ideaIds: ["c-idea-13", "c-idea-14", "c-idea-15"],
    description: "Online forum to discuss housing crisis solutions including inclusionary zoning and first-time buyer programs.",
    organizer: "Housing Advisory Committee",
  },
  {
    id: "cm4",
    title: "Downtown Revitalization Workshop",
    date: "September 25",
    time: "2:00 PM",
    isLive: false,
    isOnline: false,
    participants: 28,
    problemsCount: 1,
    ideasCount: 3,
    duration: "150min",
    problemIds: ["c6"],
    ideaIds: ["c-idea-16", "c-idea-17", "c-idea-18"],
    description: "Creative workshop to brainstorm ideas for revitalizing downtown area with local business owners and residents.",
    organizer: "Downtown Business Association",
    location: "Community Center",
  },
  {
    id: "cm5",
    title: "Zero Waste Initiative Kickoff",
    date: "October 2",
    time: "5:00 PM",
    isLive: false,
    isOnline: false,
    participants: 38,
    problemsCount: 1,
    ideasCount: 3,
    duration: "75min",
    problemIds: ["c3"],
    ideaIds: ["c-idea-7", "c-idea-8", "c-idea-9"],
    description: "Launch meeting for city-wide zero waste initiative including recycling expansion and smart waste management.",
    organizer: "Environmental Committee",
    location: "Library Meeting Room",
  },
  {
    id: "cm6",
    title: "Community Safety Forum",
    date: "October 8",
    time: "7:30 PM",
    isLive: false,
    isOnline: false,
    participants: 55,
    problemsCount: 1,
    ideasCount: 3,
    duration: "105min",
    problemIds: ["c8"],
    ideaIds: ["c-idea-21", "c-idea-22", "c-idea-23"],
    description: "Community discussion on safety concerns and solutions including neighborhood watch programs and improved lighting.",
    organizer: "Community Safety Coalition",
    location: "High School Auditorium",
  },
  {
    id: "cm7",
    title: "Road Infrastructure Planning Meeting",
    date: "October 12",
    time: "6:00 PM",
    isLive: false,
    isOnline: false,
    participants: 42,
    problemsCount: 1,
    ideasCount: 3,
    duration: "120min",
    problemIds: ["c4"],
    ideaIds: ["c-idea-10", "c-idea-11", "c-idea-12"],
    description: "Public meeting to discuss road repair priorities, smart traffic systems, and infrastructure improvements across the city.",
    organizer: "Public Works Department",
    location: "City Council Chambers",
  },
  {
    id: "cm8",
    title: "Digital Government Services Workshop",
    date: "October 15",
    time: "4:00 PM",
    isLive: false,
    isOnline: true,
    participants: 31,
    problemsCount: 1,
    ideasCount: 2,
    duration: "60min",
    problemIds: ["c7"],
    ideaIds: ["c-idea-19", "c-idea-20"],
    description: "Online workshop to discuss modernizing city services with user-friendly digital platforms and mobile apps.",
    organizer: "IT Services Department",
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
